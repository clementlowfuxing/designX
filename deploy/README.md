# myHLD Portal MVP — Deployment

## Architecture
- S3 static website (frontend)
- Lambda Function URL (backend, Python 3.12)
- Amazon Bedrock (Claude Haiku 4.5 via Converse API)
- DynamoDB (single table, HLD records)
- Region: ap-southeast-1 (Singapore)

## Deploy
```bash
cd deploy
bash deploy.sh
```

## Prerequisites
- AWS CLI v2 configured with profile `PTAWISB_IsbUsersPS-949228373256`
- Bedrock model access enabled for Claude Haiku 4.5 in ap-southeast-1
- Account permissions: S3, Lambda, IAM, DynamoDB, Bedrock

## Model
Claude Sonnet 4 — inference profile `apac.anthropic.claude-sonnet-4-20250514-v1:0`

## Cost Estimate (Weekly)
- Lambda: ~$0.01 (demo usage)
- DynamoDB: ~$0.01 (on-demand, minimal reads/writes)
- Bedrock: ~$0.50-2.00 (depends on demo frequency)
- S3: ~$0.01
- Total: ~$1-3/week for demo usage

## Teardown
Delete resources manually or create a teardown script reversing deploy.sh:
- Delete S3 bucket and contents
- Delete Lambda function and Function URL
- Delete IAM role and policies
- Delete DynamoDB table
