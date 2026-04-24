#!/bin/bash
# Add POST /chat route to the existing API Gateway
# Run this once after deploying the chat feature

source deploy/config.sh

API_ID="1baqekfcrh"
LAMBDA_ARN="arn:aws:lambda:ap-southeast-1:949228373256:function:myhld-portal-backend"

echo "=== Adding POST /chat route to API Gateway ==="

# Get the existing integration ID (reuse the same Lambda integration)
INTEGRATION_ID=$(aws apigatewayv2 get-routes --api-id $API_ID --region $AWS_REGION \
  --query "Items[?RouteKey=='POST /generate'].Target" --output text | sed 's|integrations/||')

echo "Existing integration ID: $INTEGRATION_ID"

# Create the new route pointing to the same Lambda integration
aws apigatewayv2 create-route \
  --api-id $API_ID \
  --route-key "POST /chat" \
  --target "integrations/$INTEGRATION_ID" \
  --region $AWS_REGION

echo "=== POST /chat route created ==="
echo "Chat endpoint: https://$API_ID.execute-api.$AWS_REGION.amazonaws.com/chat"
