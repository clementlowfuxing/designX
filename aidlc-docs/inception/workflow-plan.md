# Workflow Plan — myHLD Portal MVP

## Path: B (No Mockup)

Inception extended questions captured UI/UX intent. Construction builds frontend directly from requirements.

## Construction Stages

| Stage | Status | Notes |
|-------|--------|-------|
| Functional Design | **SKIP** | Inception requirements define the flow, UI shape, and output format |
| NFR Requirements | **SKIP** | Demo-only, no production NFRs |
| Infrastructure Design | **RUN** | AWS architecture: S3 + Lambda Function URL + Bedrock + DynamoDB |
| Code Generation | **RUN** | Build frontend/, backend/, deploy/ from inception artifacts |
| Construction Review | **RUN** | Room reviews code, UI, prompt, and deploy plan before deployment |
| Build and Test | **RUN** | deploy.sh + smoke test |

## Architecture

```
Browser
  │
  ▼
Amazon S3 (static site)
  │
  │  fetch() calls:
  ▼
AWS Lambda Function URL (AuthType: NONE, CORS enabled)
  │
  │  Lambda execution role calls:
  ▼
Amazon Bedrock (Converse API — Claude Haiku 4.5)
  │
  │  Lambda also reads/writes:
  ▼
Amazon DynamoDB (single table — HLD records)
```

## File Layout

```
frontend/
  index.html          ← Multi-step wizard UI, PETRONAS branded
  style.css           ← Full PETRONAS brand guidelines
  app.js              ← Wizard logic, fetch() to Lambda, Mermaid rendering
  data.js             ← Sample HLD data for front page, Security Field options
backend/
  lambda_function.py  ← Python 3.12, boto3, Bedrock Converse + DynamoDB
deploy/
  deploy.sh           ← AWS CLI provisioning script
  config.sh           ← Variables (bucket, function, role, region, table)
  README.md           ← Demo URL, model, cost, teardown
aidlc-docs/           ← Inception + construction artifacts
```

## Time Estimate

| Phase | Estimate |
|-------|----------|
| Infrastructure Design | 15 min |
| Code Generation | 1.5–2h |
| Construction Review | 15–30 min |
| Deployment | 1.5–2h |
| Buffer | 30 min |
