#!/bin/bash
set -euo pipefail

# myHLD Portal MVP — Deployment Script
# Provisions S3, Lambda, DynamoDB, and Bedrock access in us-east-1

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/config.sh"

echo "=== myHLD Portal MVP Deployment ==="
echo "Region: $AWS_REGION"
echo "Project: $PROJECT_NAME"

# Sanity check
echo ""
echo "--- Step 1: Verify AWS credentials ---"
aws sts get-caller-identity --region "$AWS_REGION"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text --region "$AWS_REGION")
export S3_BUCKET="${PROJECT_NAME}-frontend-${ACCOUNT_ID}"
echo "Account: $ACCOUNT_ID"
echo "S3 Bucket: $S3_BUCKET"

# DynamoDB Table
echo ""
echo "--- Step 2: Create DynamoDB table ---"
if aws dynamodb describe-table --table-name "$DYNAMODB_TABLE_NAME" --region "$AWS_REGION" 2>/dev/null; then
  echo "Table $DYNAMODB_TABLE_NAME already exists"
else
  aws dynamodb create-table \
    --table-name "$DYNAMODB_TABLE_NAME" \
    --attribute-definitions AttributeName=PK,AttributeType=S \
    --key-schema AttributeName=PK,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "$AWS_REGION"
  echo "Waiting for table to be active..."
  aws dynamodb wait table-exists --table-name "$DYNAMODB_TABLE_NAME" --region "$AWS_REGION"
  echo "Table created"
fi

# IAM Role
echo ""
echo "--- Step 3: Create IAM execution role ---"
TRUST_POLICY='{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "lambda.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}'

if aws iam get-role --role-name "$LAMBDA_ROLE_NAME" 2>/dev/null; then
  echo "Role $LAMBDA_ROLE_NAME already exists"
else
  aws iam create-role \
    --role-name "$LAMBDA_ROLE_NAME" \
    --assume-role-policy-document "$TRUST_POLICY"
  echo "Role created"
fi

ROLE_ARN=$(aws iam get-role --role-name "$LAMBDA_ROLE_NAME" --query 'Role.Arn' --output text)
echo "Role ARN: $ROLE_ARN"

# Attach policies
echo ""
echo "--- Step 4: Attach IAM policies ---"
aws iam attach-role-policy \
  --role-name "$LAMBDA_ROLE_NAME" \
  --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole" 2>/dev/null || true

INLINE_POLICY=$(cat <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "bedrock:InvokeModel",
      "Resource": [
        "arn:aws:bedrock:${AWS_REGION}::foundation-model/anthropic.claude-haiku-4-5-20251001-v1:0",
        "arn:aws:bedrock:${AWS_REGION}:${ACCOUNT_ID}:inference-profile/apac.anthropic.claude-sonnet-4-20250514-v1:0"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": "arn:aws:dynamodb:${AWS_REGION}:${ACCOUNT_ID}:table/${DYNAMODB_TABLE_NAME}"
    }
  ]
}
EOF
)

aws iam put-role-policy \
  --role-name "$LAMBDA_ROLE_NAME" \
  --policy-name "${PROJECT_NAME}-bedrock-dynamo" \
  --policy-document "$INLINE_POLICY"
echo "Policies attached"

# Wait for role propagation
echo "Waiting 10s for IAM role propagation..."
sleep 10

# Lambda Function
echo ""
echo "--- Step 5: Create/Update Lambda function ---"
cd "$SCRIPT_DIR/../backend"
zip -j lambda.zip lambda_function.py

if aws lambda get-function --function-name "$LAMBDA_FUNCTION_NAME" --region "$AWS_REGION" 2>/dev/null; then
  echo "Updating existing Lambda function..."
  aws lambda update-function-code \
    --function-name "$LAMBDA_FUNCTION_NAME" \
    --zip-file fileb://lambda.zip \
    --region "$AWS_REGION"
  aws lambda wait function-updated --function-name "$LAMBDA_FUNCTION_NAME" --region "$AWS_REGION"
  aws lambda update-function-configuration \
    --function-name "$LAMBDA_FUNCTION_NAME" \
    --timeout 60 \
    --memory-size 256 \
    --environment "Variables={BEDROCK_MODEL_ID=${BEDROCK_MODEL_ID},DYNAMODB_TABLE=${DYNAMODB_TABLE_NAME},AWS_REGION_NAME=${AWS_REGION}}" \
    --region "$AWS_REGION"
else
  aws lambda create-function \
    --function-name "$LAMBDA_FUNCTION_NAME" \
    --runtime python3.12 \
    --handler lambda_function.lambda_handler \
    --role "$ROLE_ARN" \
    --zip-file fileb://lambda.zip \
    --timeout 60 \
    --memory-size 256 \
    --environment "Variables={BEDROCK_MODEL_ID=${BEDROCK_MODEL_ID},DYNAMODB_TABLE=${DYNAMODB_TABLE_NAME},AWS_REGION_NAME=${AWS_REGION}}" \
    --region "$AWS_REGION"
  echo "Waiting for Lambda to be active..."
  aws lambda wait function-active --function-name "$LAMBDA_FUNCTION_NAME" --region "$AWS_REGION"
fi
echo "Lambda function ready"
rm -f lambda.zip

# Lambda Function URL
echo ""
echo "--- Step 6: Create Lambda Function URL ---"
FUNCTION_URL=$(aws lambda get-function-url-config --function-name "$LAMBDA_FUNCTION_NAME" --region "$AWS_REGION" --query 'FunctionUrl' --output text 2>/dev/null || echo "")

if [ -z "$FUNCTION_URL" ] || [ "$FUNCTION_URL" = "None" ]; then
  aws lambda create-function-url-config \
    --function-name "$LAMBDA_FUNCTION_NAME" \
    --auth-type NONE \
    --cors '{"AllowOrigins":["*"],"AllowMethods":["POST","OPTIONS"],"AllowHeaders":["Content-Type"],"MaxAge":3600}' \
    --region "$AWS_REGION"

  aws lambda add-permission \
    --function-name "$LAMBDA_FUNCTION_NAME" \
    --statement-id "FunctionURLAllowPublicAccess" \
    --action "lambda:InvokeFunctionUrl" \
    --principal "*" \
    --function-url-auth-type NONE \
    --region "$AWS_REGION" 2>/dev/null || true

  FUNCTION_URL=$(aws lambda get-function-url-config --function-name "$LAMBDA_FUNCTION_NAME" --region "$AWS_REGION" --query 'FunctionUrl' --output text)
else
  aws lambda update-function-url-config \
    --function-name "$LAMBDA_FUNCTION_NAME" \
    --auth-type NONE \
    --cors '{"AllowOrigins":["*"],"AllowMethods":["POST","OPTIONS"],"AllowHeaders":["Content-Type"],"MaxAge":3600}' \
    --region "$AWS_REGION"
fi
echo "Function URL: $FUNCTION_URL"

# Inject Lambda URL into frontend
echo ""
echo "--- Step 7: Inject Lambda URL into frontend ---"
cd "$SCRIPT_DIR/../frontend"
sed -i "s|LAMBDA_URL_PLACEHOLDER|${FUNCTION_URL}|g" app.js
echo "Lambda URL injected into app.js"

# S3 Bucket
echo ""
echo "--- Step 8: Create S3 bucket and upload frontend ---"
if aws s3api head-bucket --bucket "$S3_BUCKET" --region "$AWS_REGION" 2>/dev/null; then
  echo "Bucket $S3_BUCKET already exists"
else
  aws s3api create-bucket --bucket "$S3_BUCKET" --region "$AWS_REGION" --create-bucket-configuration LocationConstraint="$AWS_REGION"
fi

# Try public website hosting
echo "Attempting public static website hosting..."
aws s3api delete-public-access-block --bucket "$S3_BUCKET" --region "$AWS_REGION" 2>/dev/null || true

BUCKET_POLICY=$(cat <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::${S3_BUCKET}/*"
  }]
}
EOF
)

if aws s3api put-bucket-policy --bucket "$S3_BUCKET" --policy "$BUCKET_POLICY" --region "$AWS_REGION" 2>/dev/null; then
  aws s3 website "s3://${S3_BUCKET}" --index-document index.html --region "$AWS_REGION"
  aws s3 sync . "s3://${S3_BUCKET}/" --region "$AWS_REGION" --delete
  SITE_URL="http://${S3_BUCKET}.s3-website-${AWS_REGION}.amazonaws.com"
  echo ""
  echo "========================================="
  echo "  DEPLOYMENT COMPLETE"
  echo "========================================="
  echo "  Site URL:     $SITE_URL"
  echo "  Lambda URL:   $FUNCTION_URL"
  echo "  DynamoDB:     $DYNAMODB_TABLE_NAME"
  echo "  Model:        $BEDROCK_MODEL_ID"
  echo "  Region:       $AWS_REGION"
  echo "========================================="
else
  echo "Public bucket blocked by SCP. Falling back to CloudFront + OAC..."
  echo "TODO: CloudFront fallback not yet implemented. Please check account SCPs."
  aws s3 sync . "s3://${S3_BUCKET}/" --region "$AWS_REGION" --delete
  echo "Files uploaded. Manual CloudFront setup required."
fi
