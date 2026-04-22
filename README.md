# myHLD Portal

AI-powered High-Level Design (HLD) authoring and governance portal for PETRONAS. Requestors fill a multi-step wizard covering registration, application/data, and cybersecurity fields. Amazon Bedrock generates an architecture diagram (Mermaid), integration summary, TOE classification, risk flags, and recommendations — all in a single AI call.

## Live URL

https://d2abm5u1nsseqh.cloudfront.net

## Architecture

```
Browser → CloudFront (E3Q04VWBORWUMU)
              │ OAC
              ▼
         S3 (myhld-portal-frontend-949228373256)

Browser → API Gateway (1baqekfcrh) → POST /generate
              │
              ▼
         Lambda (myhld-portal-backend, Python 3.12)
              │
              ├──► Amazon Bedrock (Converse API)
              └──► DynamoDB (myhld-portal-hld-records)
```

All resources in `ap-southeast-1` (Singapore).

## Repository Structure

```
frontend/               Static site served via CloudFront
  index.html            Multi-step wizard UI
  app.js                Application logic, prefill, AI call
  data.js               Mock data, reference dropdowns, security fields
  style.css             PETRONAS-branded styles
  apqc_capabilities.json  APQC PCF categories (13 L0, 72 L1)

backend/
  lambda_function.py    Lambda handler — builds prompt, calls Bedrock, saves to DynamoDB

deploy/
  deploy.sh             Full infrastructure provisioning (AWS CLI)
  config.sh             Environment variables (bucket, function, role, model)
  README.md             Deployment-specific notes
  *.json                IAM policies, CloudFront configs, CORS, OAC, test payloads

data/
  apqc_capabilities.json                  Extracted APQC process framework
  K014749_APQC...xlsx                     Source APQC PCF v7.4 spreadsheet

scripts/
  extract_apqc.py       Extracts APQC categories from the Excel source

aidlc-docs/             AIDLC inception artifacts
  inception/requirements/
    requirements.md     Approved requirements (flow, AI moment, scope)
    requirement-verification-questions.md
```

## Key Features

- **4-step wizard**: Registration → Application & Data → Cybersecurity → AI Results
- **Enhancement prefill**: Selecting "Enhancement HLD" + an existing application auto-fills all form fields from the most recent prior HLD, with visual indicators on prefilled values
- **HLD lineage**: Timeline of all prior HLD versions for a selected application
- **AI generation**: Single Bedrock call produces Mermaid diagram, integration table, TOE classification, risk flags with rationale, and recommendations
- **Dashboard**: Lists all HLD requests with status badges (Submitted / In-Review / Approved)
- **Detail view**: Click any HLD row to see full read-only details including AI outputs
- **APQC PCF**: Two-level cascading dropdown sourced from APQC Cross-Industry v7.4
- **DynamoDB persistence**: HLD records saved with all inputs and AI outputs

## Quick Deploy

Frontend only (after code changes):
```bash
aws s3 sync ./frontend s3://myhld-portal-frontend-949228373256/ --region ap-southeast-1 --delete
aws cloudfront create-invalidation --distribution-id E3Q04VWBORWUMU --paths "/*"
```

Backend only (after modifying `lambda_function.py`):
```bash
Compress-Archive -Path backend/lambda_function.py -DestinationPath backend/lambda.zip -Force
aws lambda update-function-code --function-name myhld-portal-backend --zip-file fileb://backend/lambda.zip --region ap-southeast-1
```

Full deploy:
```bash
bash deploy/deploy.sh
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/CSS/JS, Mermaid.js, Museo Sans (Adobe Typekit) |
| Hosting | S3 + CloudFront (OAC, private bucket) |
| API | API Gateway HTTP API |
| Backend | AWS Lambda (Python 3.12, boto3) |
| AI | Amazon Bedrock — Converse API |
| Database | DynamoDB (on-demand, single table) |
| Branding | PETRONAS Visual Identity System |

## Cost Estimate (Weekly, Demo Usage)

| Service | Estimate |
|---------|----------|
| Lambda | ~$0.01 |
| DynamoDB | ~$0.01 |
| Bedrock | ~$0.50–2.00 |
| S3 + CloudFront | ~$0.01 |
| **Total** | **~$1–3/week** |

## Not in Scope (MVP)

- Authentication / RBAC
- Diagram upload / image interpretation
- Formal approval workflow with state transitions
- Audit trail
- CI/CD pipeline
- Custom domain
