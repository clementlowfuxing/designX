"""myHLD Portal MVP — Lambda Backend
Handles AI generation via Bedrock Converse API and DynamoDB persistence.
"""
import json
import os
import uuid
import logging
from datetime import datetime

import boto3

logger = logging.getLogger()
logger.setLevel(logging.INFO)

bedrock = boto3.client("bedrock-runtime", region_name=os.environ.get("AWS_REGION", "us-east-1"))
dynamodb = boto3.resource("dynamodb", region_name=os.environ.get("AWS_REGION", "us-east-1"))
table = dynamodb.Table(os.environ.get("DYNAMODB_TABLE", "myhld-portal-hld-records"))

MODEL_ID = os.environ.get("BEDROCK_MODEL_ID", "apac.anthropic.claude-3-5-sonnet-20241022-v2:0")

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
}


def lambda_handler(event, context):
    """Main handler for API Gateway HTTP API (payload format 2.0)."""
    method = event.get("requestContext", {}).get("http", {}).get("method", "")
    path = event.get("rawPath", event.get("requestContext", {}).get("http", {}).get("path", ""))

    if method == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    try:
        body = json.loads(event.get("body", "{}"))

        if path.endswith("/chat"):
            result = handle_chat(body)
        else:
            result = generate_hld(body)
            save_hld(body, result)

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps(result),
        }
    except Exception as e:
        logger.error(f"Error: {e}", exc_info=True)
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"error": str(e)}),
        }


def build_prompt(form_data):
    """Build the Bedrock prompt from form data."""
    reg = form_data.get("registration", {})
    app_data = form_data.get("applicationData", {})
    cyber = form_data.get("cybersecurity", {})
    bia = cyber.get("bia", {})

    prompt = f"""You are an enterprise architecture AI assistant for PETRONAS. Based on the following HLD (High-Level Design) submission, generate a comprehensive architecture analysis.

## HLD Registration
- Category: {reg.get('category', 'N/A')}
- Application: {reg.get('application', 'N/A')}
- Title: {reg.get('title', 'N/A')}
- Description: {reg.get('description', 'N/A')}
- HLD Type: {reg.get('hldType', 'N/A')}
- Landscape: {reg.get('landscape', 'N/A')}
- Division: {reg.get('division', 'N/A')}
- Business Capability: {reg.get('capabilityCategory', '')} / {reg.get('capabilitySubprocess', '')}

## Application Components
{app_data.get('components', 'Not specified')}

## System Integrations
{app_data.get('integrations', 'Not specified')}

## Data Management
- Classification: {app_data.get('dataClassification', 'N/A')}
- Data-in-motion: {', '.join(app_data.get('dataInMotion', [])) or 'N/A'}
- Data-at-rest: {', '.join(app_data.get('dataAtRest', [])) or 'N/A'}
- Integration: {', '.join(app_data.get('dataIntegration', [])) or 'N/A'}
- Retention: {app_data.get('dataRetention', 'N/A')}
- Privacy: {', '.join(app_data.get('dataPrivacy', [])) or 'N/A'}
- DLP: {', '.join(app_data.get('dataLossPrevention', [])) or 'N/A'}

## Cybersecurity
- BIA: Confidentiality={bia.get('confidentiality','N/A')}, Integrity={bia.get('integrity','N/A')}, Availability={bia.get('availability','N/A')}, Overall={bia.get('overall','N/A')}
- HA: {', '.join(cyber.get('ha', [])) or 'N/A'}
- DR: {', '.join(cyber.get('dr', [])) or 'N/A'}
- Connectivity: {', '.join(cyber.get('connectivity', [])) or 'N/A'}
- IAM Authentication: {', '.join(cyber.get('iam', {}).get('authenticationApproach', [])) or 'N/A'}
- IAM Access Control: {', '.join(cyber.get('iam', {}).get('accessControl', [])) or 'N/A'}
- IAM SSO: {', '.join(cyber.get('iam', {}).get('sso', [])) or 'N/A'}
- Key Management: {', '.join(cyber.get('iam', {}).get('keyManagement', [])) or 'N/A'}
- Client/Server Auth: {', '.join(cyber.get('iam', {}).get('clientServerAuth', [])) or 'N/A'}
- Cloud Access: {', '.join(cyber.get('iam', {}).get('cloudAccess', [])) or 'N/A'}
- Auth Implementation: {', '.join(cyber.get('iam', {}).get('authImplementation', [])) or 'N/A'}
- Endpoint Hardening: {', '.join(cyber.get('endpoint', {}).get('hardenedEndpoint', [])) or 'N/A'}
- Endpoint Protection: {', '.join(cyber.get('endpoint', {}).get('endpointProtection', [])) or 'N/A'}
- App Development: {', '.join(cyber.get('applicationSecurity', {}).get('appDevelopment', [])) or 'N/A'}
- App Facing: {', '.join(cyber.get('applicationSecurity', {}).get('appFacing', [])) or 'N/A'}
- Perimeter Security: {', '.join(cyber.get('networkSecurity', {}).get('perimeterSecurity', [])) or 'N/A'}
- Network Connectivity: {', '.join(cyber.get('networkSecurity', {}).get('networkConnectivity', [])) or 'N/A'}
- PAM: {', '.join(cyber.get('networkSecurity', {}).get('pam', [])) or 'N/A'}

## Instructions

Generate a JSON response with exactly these keys:

1. **mermaidDiagram**: A valid Mermaid flowchart (using `graph TB` syntax) showing:
   - All application components as nodes
   - Integration flows between systems with protocol labels on the edges (e.g., HTTPS, SFTP, API)
   - Security boundaries as subgraphs (e.g., DMZ, Internal Network, Cloud)
   - Data stores and their encryption approach
   - All impacted/connected upstream and downstream systems
   - Use descriptive node IDs (no spaces). Use `-->|label|` for edge labels.

2. **integrations**: Array of objects with keys: source, target, protocol, type, direction (inbound/outbound/bidirectional)

3. **toeClassification**: Array of objects with keys: component, category (Application/Data/Security/Network/Infrastructure), classification (one of: "TOE Default", "Available Not Preferred", "Step-Out", "Unknown"), notes
   - Use general enterprise knowledge for PETRONAS-scale O&G company
   - "TOE Default" = standard enterprise-approved technology
   - "Available Not Preferred" = available but being phased out or not recommended for new workloads
   - "Step-Out" = non-standard, requires justification
   - "Unknown" = cannot determine classification

4. **riskFlags**: Array of objects with keys: severity (Critical/High/Medium/Low), title, rationale, confidence (0-100)
   - Flag security gaps, data risks, availability/resilience risks, governance risks
   - Each rationale must explain which specific input triggered the flag

5. **recommendations**: Array of objects with keys: title, text
   - Provide actionable recommendations and alternative solutions for flagged items

Return ONLY valid JSON. No markdown code fences. No explanation text outside the JSON."""

    return prompt


def generate_hld(form_data):
    """Call Bedrock Converse API to generate HLD analysis."""
    prompt = build_prompt(form_data)

    response = bedrock.converse(
        modelId=MODEL_ID,
        messages=[{"role": "user", "content": [{"text": prompt}]}],
        inferenceConfig={"maxTokens": 3000, "temperature": 0.3},
    )

    raw_text = response["output"]["message"]["content"][0]["text"]
    logger.info(f"Bedrock response length: {len(raw_text)}")

    # Parse JSON from response — handle potential markdown fences
    text = raw_text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1] if "\n" in text else text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()

    result = json.loads(text)
    return result


def save_hld(form_data, ai_result):
    """Save HLD record to DynamoDB."""
    try:
        request_id = f"HLD-{datetime.utcnow().strftime('%Y')}-{uuid.uuid4().hex[:6].upper()}"
        reg = form_data.get("registration", {})
        item = {
            "PK": f"HLD#{request_id}",
            "requestId": request_id,
            "title": reg.get("title", ""),
            "application": reg.get("application", ""),
            "category": reg.get("category", ""),
            "hldType": reg.get("hldType", ""),
            "landscape": reg.get("landscape", ""),
            "division": reg.get("division", ""),
            "status": "Submitted",
            "createdAt": datetime.utcnow().isoformat(),
            "formData": json.dumps(form_data),
            "aiResult": json.dumps(ai_result),
        }
        table.put_item(Item=item)
        logger.info(f"Saved HLD: {request_id}")
    except Exception as e:
        logger.error(f"DynamoDB save failed: {e}")
        # Non-blocking — don't fail the response if save fails


def handle_chat(body):
    """Handle a chatbot message with form context awareness."""
    message = body.get("message", "")
    current_step = body.get("currentStep", 1)
    form_context = body.get("formContext", {})

    reg = form_context.get("registration", {})
    app_data = form_context.get("applicationData", {})
    cyber = form_context.get("cybersecurity", {})

    step_labels = {1: "Registration", 2: "Application & Data", 3: "Cybersecurity & Compliance", 4: "AI Results"}
    step_name = step_labels.get(current_step, "Registration")

    # Summarise what's filled so far for context
    filled_summary = f"""
Current wizard step: {step_name}

Registration so far:
- Category: {reg.get('category') or 'not set'}
- Application: {reg.get('application') or 'not set'}
- Title: {reg.get('title') or 'not set'}
- HLD Type: {reg.get('hldType') or 'not set'}
- Landscape: {reg.get('landscape') or 'not set'}
- Division: {reg.get('division') or 'not set'}

Application & Data so far:
- Components: {app_data.get('components') or 'not set'}
- Integrations: {app_data.get('integrations') or 'not set'}
- Data Classification: {app_data.get('dataClassification') or 'not set'}

Cybersecurity so far:
- BIA Overall: {cyber.get('bia', {}).get('overall') or 'not set'}
- Connectivity: {', '.join(cyber.get('connectivity', [])) or 'not set'}
"""

    prompt = f"""You are the Bedrock Assistant embedded in the myHLD Portal — an enterprise HLD (High-Level Design) authoring tool for PETRONAS.

The user is currently on the wizard step: {step_name}.

Here is the current state of their form:
{filled_summary}

The user asks: "{message}"

Your job is to:
1. Answer their question helpfully and concisely in the context of enterprise architecture and PETRONAS HLD governance.
2. If your answer includes a specific value that could be applied to a form field, identify the best target field and value.

Respond with a JSON object with these keys:
- "reply": Your response text (max 3 sentences, plain text, you may use <strong> tags for emphasis)
- "suggestion": (optional) The specific suggested value to apply to a form field, or null
- "applyTarget": (optional) The HTML element ID of the form field to apply to. Valid IDs: hld-title, hld-description, hld-type, hld-landscape, hld-division, app-components, app-integrations, data-classification, data-retention, bia-confidentiality, bia-integrity, bia-availability, bia-overall. Use null if no field applies.
- "applyValue": (optional) The exact value to set on the field (must match a valid option for dropdowns), or null

Return ONLY valid JSON. No markdown fences."""

    response = bedrock.converse(
        modelId=MODEL_ID,
        messages=[{"role": "user", "content": [{"text": prompt}]}],
        inferenceConfig={"maxTokens": 400, "temperature": 0.4},
    )

    raw = response["output"]["message"]["content"][0]["text"].strip()
    if raw.startswith("```"):
        raw = raw.split("\n", 1)[1] if "\n" in raw else raw[3:]
        if raw.endswith("```"):
            raw = raw[:-3]
        raw = raw.strip()

    result = json.loads(raw)
    return result
