# myHLD Portal — Deployment Reference

## Live URLs

| Resource | URL |
|----------|-----|
| Frontend (CloudFront) | `https://d2abm5u1nsseqh.cloudfront.net` |
| API Gateway | `https://1baqekfcrh.execute-api.ap-southeast-1.amazonaws.com` |
| API Routes | `POST /generate` (HLD generation), `POST /chat` (Bedrock Assistant) |

## AWS Account & Profile

| Property | Value |
|----------|-------|
| Account | `949228373256` |
| Region | `ap-southeast-1` |
| AWS CLI Profile | `PTAWISB_IsbUsersPS-949228373256` |

## Prerequisites

1. AWS CLI v2 installed
2. SSO session active — if expired, refresh with:
   ```powershell
   aws sso login --profile PTAWISB_IsbUsersPS-949228373256
   ```
3. Verify identity before any deployment:
   ```powershell
   aws sts get-caller-identity --profile PTAWISB_IsbUsersPS-949228373256
   ```
   Expected: `"Account": "949228373256"`

---

## Deploy: Backend (Lambda)

Run after any change to `backend/lambda_function.py`:

```powershell
# 1. Package
Compress-Archive -Path backend/lambda_function.py -DestinationPath backend/lambda.zip -Force

# 2. Update Lambda code
aws lambda update-function-code `
  --function-name myhld-portal-backend `
  --zip-file fileb://backend/lambda.zip `
  --region ap-southeast-1 `
  --profile PTAWISB_IsbUsersPS-949228373256
```

---

## Deploy: API Gateway Route (one-time, per new route)

Only needed when adding a new route. The `/chat` route was added once using:

```powershell
# Get the existing Lambda integration ID
aws apigatewayv2 get-integrations `
  --api-id 1baqekfcrh `
  --region ap-southeast-1 `
  --profile PTAWISB_IsbUsersPS-949228373256 `
  --query "Items[0].IntegrationId" `
  --output text
# Returns: hvu154k

# Create the new route pointing to the same integration
aws apigatewayv2 create-route `
  --api-id 1baqekfcrh `
  --route-key "POST /chat" `
  --target "integrations/hvu154k" `
  --region ap-southeast-1 `
  --profile PTAWISB_IsbUsersPS-949228373256
```

Current routes on API `1baqekfcrh`:
- `POST /generate` — HLD architecture generation
- `POST /chat` — Bedrock Assistant chatbot

---

## Deploy: Frontend (S3 + CloudFront)

Run after any change to files in `frontend/`:

```powershell
# 1. Sync to S3
aws s3 sync ./frontend s3://myhld-portal-frontend-949228373256/ `
  --region ap-southeast-1 `
  --profile PTAWISB_IsbUsersPS-949228373256 `
  --delete

# 2. Invalidate CloudFront cache
aws cloudfront create-invalidation `
  --distribution-id E3Q04VWBORWUMU `
  --paths "/*" `
  --region ap-southeast-1 `
  --profile PTAWISB_IsbUsersPS-949228373256
```

Wait ~1 minute for the invalidation to complete before testing.

---

## Full Redeploy (backend + frontend)

```powershell
# Package and update Lambda
Compress-Archive -Path backend/lambda_function.py -DestinationPath backend/lambda.zip -Force
aws lambda update-function-code --function-name myhld-portal-backend --zip-file fileb://backend/lambda.zip --region ap-southeast-1 --profile PTAWISB_IsbUsersPS-949228373256

# Sync frontend and bust cache
aws s3 sync ./frontend s3://myhld-portal-frontend-949228373256/ --region ap-southeast-1 --profile PTAWISB_IsbUsersPS-949228373256 --delete
aws cloudfront create-invalidation --distribution-id E3Q04VWBORWUMU --paths "/*" --region ap-southeast-1 --profile PTAWISB_IsbUsersPS-949228373256
```

---

## What Was Deployed: Chatbot Feature

### What changed
- `frontend/index.html` — added Bedrock Assistant panel HTML and FAB toggle button
- `frontend/style.css` — added chatbot panel, message bubbles, typing indicator, chip and input bar styles
- `frontend/app.js` — added full chatbot logic: toggle, message send/receive, typing indicator, "Apply to Form" action, form context passing
- `backend/lambda_function.py` — added `POST /chat` route handler (`handle_chat`) that calls Bedrock with the user's message and current form state, returns a reply and optional field suggestion

### What was NOT changed
- API Gateway integration ID (`hvu154k`) — reused for the new `/chat` route
- IAM role, DynamoDB table, S3 bucket, CloudFront distribution — all unchanged

### Lessons learned
- Always include `--profile PTAWISB_IsbUsersPS-949228373256` on every AWS CLI command
- JSON policy documents must be passed as `file://path/to/file.json` on Windows — inline JSON strings fail due to shell escaping
- SSO token expires; refresh with `aws sso login --profile ...` before deploying
- The correct account is `949228373256` — not `780097021668`

---

## Architecture

```
Browser → CloudFront (E3Q04VWBORWUMU)
              │ OAC
              ▼
         S3 (myhld-portal-frontend-949228373256)

Browser → API Gateway (1baqekfcrh)
              ├── POST /generate → Lambda → Bedrock + DynamoDB
              └── POST /chat    → Lambda → Bedrock
```

## Cost Estimate (Weekly, demo usage)
- Lambda: ~$0.01
- DynamoDB: ~$0.01
- Bedrock: ~$1–3 (depends on demo frequency)
- S3 + CloudFront: ~$0.01
- Total: ~$1–4/week
