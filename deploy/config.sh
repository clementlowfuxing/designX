#!/bin/bash
# myHLD Portal MVP — Deployment Configuration
# All resources in us-east-1

export AWS_PROFILE="PTAWISB_IsbUsersPS-949228373256"
export AWS_REGION="ap-southeast-1"
export PROJECT_NAME="myhld-portal"
export S3_BUCKET="${PROJECT_NAME}-frontend-$(aws sts get-caller-identity --profile $AWS_PROFILE --query Account --output text 2>/dev/null)"
export LAMBDA_FUNCTION_NAME="${PROJECT_NAME}-backend"
export LAMBDA_ROLE_NAME="${PROJECT_NAME}-lambda-role"
export DYNAMODB_TABLE_NAME="${PROJECT_NAME}-hld-records"
export BEDROCK_MODEL_ID="apac.anthropic.claude-3-5-sonnet-20241022-v2:0"
