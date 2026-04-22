# myHLD Portal — Deployment & Infrastructure Reference

All resources are in `ap-southeast-1` (Singapore) under AWS account `949228373256`.

## Live URLs

| Resource | URL |
|----------|-----|
| Frontend (CloudFront) | `https://d2abm5u1nsseqh.cloudfront.net` |
| API Gateway | `https://1baqekfcrh.execute-api.ap-southeast-1.amazonaws.com` |
| API Route | `POST https://1baqekfcrh.execute-api.ap-southeast-1.amazonaws.com/generate` |

## Architecture

```
Browser → CloudFront (E3Q04VWBORWUMU)
              │ OAC (EH8F953AH40FA)
              ▼
         S3 (myhld-portal-frontend-949228373256)
              
Browser → API Gateway (1baqekfcrh) → POST /generate
              │
              ▼
         Lambda (myhld-portal-backend)
              │
              ├──► Bedrock (apac.amazon.nova-pro-v1:0)
              └──► DynamoDB (myhld-portal-hld-records)
```

## CloudFront Distribution

| Property | Value |
|----------|-------|
| Distribution ID | `E3Q04VWBORWUMU` |
| Domain | `d2abm5u1nsseqh.cloudfront.net` |
| Origin | `myhld-portal-frontend-949228373256.s3.ap-southeast-1.amazonaws.com` |
| Origin Access Control | `EH8F953AH40FA` |
| Origin ID | `myhld-s3-origin` |
| Default Root Object | `index.html` |
| Viewer Protocol | `redirect-to-https` |
| Price Class | `PriceClass_All` |
| Status | Deployed |

Cache invalidation after frontend updates:
```bash
aws cloudfront create-invalidation --distribution-id E3Q04VWBORWUMU --paths "/*"
```

## S3 Bucket (Frontend)

| Property | Value |
|----------|-------|
| Bucket | `myhld-portal-frontend-949228373256` |
| Region | `ap-southeast-1` |
| Access | Private (CloudFront OAC only, public access blocked) |

Files served: `index.html`, `app.js`, `data.js`, `style.css`, `apqc_capabilities.json`

Sync command:
```bash
aws s3 sync ./frontend s3://myhld-portal-frontend-949228373256/ --region ap-southeast-1 --delete
```

## API Gateway (HTTP API)

| Property | Value |
|----------|-------|
| API ID | `1baqekfcrh` |
| Name | `myhld-portal-api` |
| Protocol | HTTP |
| Endpoint | `https://1baqekfcrh.execute-api.ap-southeast-1.amazonaws.com` |
| Stage | `$default` (auto-deploy) |
| Route | `POST /generate` → Lambda integration `hvu154k` |
| CORS | Origins: `*`, Methods: `POST, OPTIONS`, Headers: `content-type`, MaxAge: 3600 |

## Lambda Function

| Property | Value |
|----------|-------|
| Function Name | `myhld-portal-backend` |
| ARN | `arn:aws:lambda:ap-southeast-1:949228373256:function:myhld-portal-backend` |
| Runtime | `python3.12` |
| Handler | `lambda_function.lambda_handler` |
| Memory | 256 MB |
| Timeout | 120s |
| Role | `arn:aws:iam::949228373256:role/myhld-portal-lambda-role` |

Environment variables:
- `BEDROCK_MODEL_ID` = `apac.amazon.nova-pro-v1:0`
- `DYNAMODB_TABLE` = `myhld-portal-hld-records`
- `AWS_REGION_NAME` = `ap-southeast-1`

Update Lambda code:
```bash
Compress-Archive -Path backend/lambda_function.py -DestinationPath backend/lambda.zip -Force
aws lambda update-function-code --function-name myhld-portal-backend --zip-file fileb://backend/lambda.zip --region ap-southeast-1
```

## DynamoDB Table

| Property | Value |
|----------|-------|
| Table Name | `myhld-portal-hld-records` |
| ARN | `arn:aws:dynamodb:ap-southeast-1:949228373256:table/myhld-portal-hld-records` |
| Billing Mode | PAY_PER_REQUEST (on-demand) |
| Partition Key | `PK` (String) — format: `HLD#{requestId}` |
| Status | ACTIVE |

## IAM Role

| Property | Value |
|----------|-------|
| Role Name | `myhld-portal-lambda-role` |
| ARN | `arn:aws:iam::949228373256:role/myhld-portal-lambda-role` |
| Trust | `lambda.amazonaws.com` |
| Managed Policy | `AWSLambdaBasicExecutionRole` |
| Inline Policy | `myhld-portal-bedrock-dynamo` — grants `bedrock:InvokeModel` + DynamoDB CRUD |

## Bedrock Model

| Property | Value |
|----------|-------|
| Model ID | `apac.amazon.nova-pro-v1:0` |
| API | Converse API (`bedrock-runtime.converse()`) |
| Region | `ap-southeast-1` |
| Inference | On-demand |

## Quick Deploy (frontend only)

After making frontend changes, run these two commands:
```bash
aws s3 sync ./frontend s3://myhld-portal-frontend-949228373256/ --region ap-southeast-1 --delete
aws cloudfront create-invalidation --distribution-id E3Q04VWBORWUMU --paths "/*"
```

## Quick Deploy (backend only)

After modifying `backend/lambda_function.py`:
```bash
Compress-Archive -Path backend/lambda_function.py -DestinationPath backend/lambda.zip -Force
aws lambda update-function-code --function-name myhld-portal-backend --zip-file fileb://backend/lambda.zip --region ap-southeast-1
```

## Full Deploy

Run the deploy script:
```bash
bash deploy/deploy.sh
```

Config variables are in `deploy/config.sh`.
