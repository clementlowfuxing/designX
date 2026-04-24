# myHLD Portal — Architecture Diagram

```mermaid
flowchart LR
    subgraph User["👤 User"]
        Browser["Browser"]
    end

    subgraph AWS["AWS Cloud — ap-southeast-1 (Singapore)<br/>Account: 949228373256"]
        subgraph Frontend["Frontend Delivery"]
            CF["☁️ CloudFront<br/>E3Q04VWBORWUMU"]
            S3["📦 S3 Bucket<br/>myhld-portal-frontend-949228373256"]
        end

        subgraph API["API Layer"]
            APIGW["🔗 API Gateway<br/>1baqekfcrh<br/>POST /generate<br/>POST /chat"]
        end

        subgraph Compute["Compute"]
            Lambda["⚡ Lambda<br/>myhld-portal-backend<br/>Python 3.12 | 256MB | 120s"]
        end

        subgraph AI["AI / ML"]
            Bedrock["🧠 Amazon Bedrock<br/>Nova Pro v1<br/>Converse API"]
        end

        subgraph DB["Database"]
            DynamoDB["🗄️ DynamoDB<br/>myhld-portal-hld-records<br/>PK: HLD#requestId"]
        end

        subgraph Security["Security"]
            IAM["🔐 IAM Role<br/>myhld-portal-lambda-role"]
        end

        subgraph Monitoring["Monitoring"]
            CW["📊 CloudWatch Logs"]
        end
    end

    Browser -->|"HTTPS<br/>Static Assets"| CF
    CF -->|"OAC<br/>(Origin Access Control)"| S3

    Browser -->|"HTTPS<br/>POST /generate<br/>POST /chat"| APIGW
    APIGW -->|"Lambda Integration<br/>hvu154k"| Lambda

    Lambda -->|"Converse API<br/>(bedrock-runtime)"| Bedrock
    Lambda -->|"PutItem / Scan"| DynamoDB
    Lambda -.->|"Logs"| CW

    IAM -.->|"Execution Role<br/>bedrock:InvokeModel<br/>dynamodb:CRUD"| Lambda

    style CF fill:#00A19C,color:#fff,stroke:#00615e
    style S3 fill:#e6f6f5,color:#3D3935,stroke:#00A19C
    style APIGW fill:#763F98,color:#fff,stroke:#432C5F
    style Lambda fill:#F9A330,color:#3D3935,stroke:#e08a00
    style Bedrock fill:#20419A,color:#fff,stroke:#162d6b
    style DynamoDB fill:#A6CA42,color:#3D3935,stroke:#7d9a2e
    style IAM fill:#f02500,color:#fff,stroke:#c01e00
    style CW fill:#51BCBC,color:#3D3935,stroke:#3d9999
```

## Flow Summary

| Step | From | To | Protocol | Purpose |
|------|------|----|----------|---------|
| 1 | Browser | CloudFront | HTTPS | Load static frontend (HTML, CSS, JS) |
| 2 | CloudFront | S3 | OAC | Fetch files from private bucket |
| 3 | Browser | API Gateway | HTTPS POST | Send form data or chat message |
| 4 | API Gateway | Lambda | Integration | Route to backend handler |
| 5 | Lambda | Bedrock | Converse API | Generate HLD architecture / chat response |
| 6 | Lambda | DynamoDB | PutItem | Persist HLD records |
| 7 | Lambda | CloudWatch | Logs | Execution logging |

## Two API Routes

| Route | Purpose | Bedrock Usage |
|-------|---------|---------------|
| `POST /generate` | Full HLD generation — Mermaid diagram, TOE table, risk flags, recommendations | Single call, maxTokens: 3000 |
| `POST /chat` | Chatbot assistant — contextual Q&A with form-aware suggestions | Per message, maxTokens: 400 |
