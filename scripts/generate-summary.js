const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, PageNumber, PageBreak, LevelFormat, TabStopType, TabStopPosition
} = require("docx");

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const emerald = "00A19C";
const deepGrey = "3D3935";
const headerShading = { fill: emerald, type: ShadingType.CLEAR };
const altShading = { fill: "F2F4F6", type: ShadingType.CLEAR };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function headerCell(text, width) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA }, shading: headerShading, margins: cellMargins,
    children: [new Paragraph({ children: [new TextRun({ text, bold: true, color: "FFFFFF", font: "Arial", size: 20 })] })]
  });
}
function cell(text, width, shading) {
  const opts = { borders, width: { size: width, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20 })] })] };
  if (shading) opts.shading = shading;
  return new TableCell(opts);
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: emerald },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: deepGrey },
        paragraph: { spacing: { before: 240, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Arial", color: "555555" },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [
            new TextRun({ text: "PETRONAS myHLD Portal", font: "Arial", size: 16, color: emerald, bold: true }),
            new TextRun({ text: "\tAIDLC Session Summary", font: "Arial", size: 16, color: "999999" }),
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: emerald, space: 4 } },
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", font: "Arial", size: 16, color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "999999" }),
          ]
        })]
      })
    },
    children: [
      // ── Title Page ──
      new Paragraph({ spacing: { before: 2400 }, children: [] }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "myHLD Portal", font: "Arial", size: 52, bold: true, color: emerald })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({ text: "HLD Authoring, Governance & AI Knowledge Support", font: "Arial", size: 28, color: deepGrey })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
        children: [new TextRun({ text: "AIDLC Session Summary", font: "Arial", size: 24, color: "777777" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Date: 22 April 2026", font: "Arial", size: 22, color: "555555" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Region: ap-southeast-1 (Singapore)", font: "Arial", size: 22, color: "555555" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "AWS Account: 949228373256", font: "Arial", size: 22, color: "555555" })]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ── 1. Session Overview ──
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Session Overview")] }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "This document summarizes a compressed AIDLC (AI-assisted Development Lifecycle) session that took the myHLD portal from requirements through to a deployed, working MVP in a single session. The session followed the AIDLC framework: Inception (requirements gathering and scope decisions), Construction (code generation), and Deployment (AWS provisioning).", font: "Arial", size: 22 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "The myHLD portal enables PETRONAS Solution Architects to author High-Level Design (HLD) documents through a guided wizard, with AI-powered architecture diagram generation, TOE (Technology Operating Environment) classification, automated risk flagging, and reviewer feedback workflows.", font: "Arial", size: 22 })]
      }),

      // ── 2. Inception Phase ──
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Inception Phase")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Source Documents")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "myHLD_TOE_SRS_v5.docx", font: "Arial", size: 22, bold: true }), new TextRun({ text: " \u2014 System Requirements Specification with 39 functional requirements (FR-01 to FR-39) and non-functional requirements", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Security Field 1.docx", font: "Arial", size: 22, bold: true }), new TextRun({ text: " \u2014 Reference checklist for cybersecurity controls (BIA, IAM, Endpoint, Application Security, Data Encryption, Network Security)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 }, children: [new TextRun({ text: "APQC PCF Cross-Industry v7.4", font: "Arial", size: 22, bold: true }), new TextRun({ text: " \u2014 13 top-level business capability categories and 72 Level 1 sub-processes for the Business Capability dropdown", font: "Arial", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Key Scope Decisions")] }),
      new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: "The following decisions were made during inception to scope the MVP:", font: "Arial", size: 22 })] }),

      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [3000, 6026],
        rows: [
          new TableRow({ children: [headerCell("Decision", 3000), headerCell("Outcome", 6026)] }),
          new TableRow({ children: [cell("Demo Slice", 3000), cell("Template-based input \u2192 AI generates Mermaid architecture diagram + TOE classification + risk flags + recommendations", 6026)] }),
          new TableRow({ children: [cell("Diagram Format", 3000, altShading), cell("Mermaid.js rendered client-side (option B from inception questions)", 6026, altShading)] }),
          new TableRow({ children: [cell("Input Method", 3000), cell("Structured form fields only (no diagram upload for MVP)", 6026)] }),
          new TableRow({ children: [cell("Persistence", 3000, altShading), cell("Yes \u2014 DynamoDB single table for HLD records", 6026, altShading)] }),
          new TableRow({ children: [cell("HLD Category", 3000), cell("New Application HLD or Enhancement HLD dropdown with application selector and historical lineage display", 6026)] }),
          new TableRow({ children: [cell("Business Capability", 3000, altShading), cell("Cascading APQC PCF dropdown (13 categories \u2192 72 sub-processes)", 6026, altShading)] }),
          new TableRow({ children: [cell("Security Checklist", 3000), cell("Full Security Field checklist (all categories from reference doc)", 6026)] }),
          new TableRow({ children: [cell("Branding", 3000, altShading), cell("Full PETRONAS brand guidelines (emerald header, Museo Sans, pill buttons, 10px card radius)", 6026, altShading)] }),
          new TableRow({ children: [cell("Page Structure", 3000), cell("Multi-step wizard: Registration \u2192 Application & Data \u2192 Cybersecurity \u2192 AI Results", 6026)] }),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.3 Out of Scope")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Diagram upload / image interpretation (FR-13 to FR-15)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "User authentication / RBAC (deferred to follow-up)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Parent-child HLD versioning logic", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "AI Chatbot / FAQ (FR-34 to FR-39)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Application traceability / duplicate detection", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Audit trail, formal approval workflow, multi-region, CI/CD", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 }, children: [new TextRun({ text: "Editable generated diagrams (view-only for MVP)", font: "Arial", size: 22 })] }),

      // ── 3. Construction Phase ──
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Construction Phase")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.1 Demo Flow (5 Steps)")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Front Page / Dashboard", font: "Arial", size: 22, bold: true }), new TextRun({ text: " \u2014 View existing HLD requests with status cards (Submitted, In-Review, Approved) and a searchable table. Data persisted in DynamoDB.", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Create New HLD (Step 1: Registration)", font: "Arial", size: 22, bold: true }), new TextRun({ text: " \u2014 HLD Category (New/Enhancement), Application selector with historical lineage, Title, Description, HLD Type, Landscape, Division, APQC Business Capability.", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Application & Data (Step 2)", font: "Arial", size: 22, bold: true }), new TextRun({ text: " \u2014 Application components, system integrations, data classification, encryption (in-motion/at-rest), integration approach, retention, privacy, DLP.", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Cybersecurity (Step 3)", font: "Arial", size: 22, bold: true }), new TextRun({ text: " \u2014 Full Security Field checklist: BIA ratings, HA/DR, Connectivity, IAM (9 sub-sections), Endpoint Security, Application Security, Security Testing, Network Security.", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 200 }, children: [new TextRun({ text: "AI Results (Step 4)", font: "Arial", size: 22, bold: true }), new TextRun({ text: " \u2014 AI-generated Mermaid architecture diagram, integration summary table, TOE classification table, risk flags with severity and confidence, AI recommendations, and reviewer feedback section.", font: "Arial", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.2 AI Output Components")] }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [2500, 6526],
        rows: [
          new TableRow({ children: [headerCell("Component", 2500), headerCell("Description", 6526)] }),
          new TableRow({ children: [cell("Mermaid Diagram", 2500), cell("Flowchart with application components, integration flows with protocol labels (HTTPS, RFC, JDBC, API), security boundary subgraphs, data stores with encryption annotations", 6526)] }),
          new TableRow({ children: [cell("Integration Table", 2500, altShading), cell("Source System \u2192 Target System with Protocol, Integration Type, and Direction (inbound/outbound/bidirectional)", 6526, altShading)] }),
          new TableRow({ children: [cell("TOE Classification", 2500), cell("Each component classified as TOE Default, Available Not Preferred, Step-Out, or Unknown with explanatory notes", 6526)] }),
          new TableRow({ children: [cell("Risk Flags", 2500, altShading), cell("Severity (Critical/High/Medium/Low), confidence percentage, title, and explainable rationale linking to specific inputs", 6526, altShading)] }),
          new TableRow({ children: [cell("Recommendations", 2500), cell("Actionable suggestions for each flagged risk with alternative solutions", 6526)] }),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3.3 Project File Structure")] }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [3500, 5526],
        rows: [
          new TableRow({ children: [headerCell("File", 3500), headerCell("Purpose", 5526)] }),
          new TableRow({ children: [cell("frontend/index.html", 3500), cell("Multi-step wizard UI with PETRONAS branding, emerald header with SVG logo", 5526)] }),
          new TableRow({ children: [cell("frontend/style.css", 3500, altShading), cell("Full PETRONAS brand CSS: colors, typography, pill buttons, card radius, status badges, risk flag cards", 5526, altShading)] }),
          new TableRow({ children: [cell("frontend/app.js", 3500), cell("Wizard logic, form collection, API Gateway fetch, Mermaid rendering, result tables", 5526)] }),
          new TableRow({ children: [cell("frontend/data.js", 3500, altShading), cell("Mock applications, HLD history, dashboard data, Security Field checklist options", 5526, altShading)] }),
          new TableRow({ children: [cell("frontend/apqc_capabilities.json", 3500), cell("13 APQC categories + 72 Level 1 sub-processes", 5526)] }),
          new TableRow({ children: [cell("backend/lambda_function.py", 3500, altShading), cell("Lambda handler: builds prompt, calls Bedrock Converse API, parses JSON, saves to DynamoDB", 5526, altShading)] }),
          new TableRow({ children: [cell("deploy/deploy.sh", 3500), cell("AWS CLI provisioning: DynamoDB, IAM, Lambda, Function URL, S3, CloudFront", 5526)] }),
          new TableRow({ children: [cell("deploy/config.sh", 3500, altShading), cell("Centralized deployment variables (region, bucket, function name, model ID)", 5526, altShading)] }),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── 4. Deployment Phase ──
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Deployment Phase")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Architecture")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "All resources deployed in ap-southeast-1 (Singapore) under AWS account 949228373256.", font: "Arial", size: 22 })] }),

      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [2800, 6226],
        rows: [
          new TableRow({ children: [headerCell("Resource", 2800), headerCell("Details", 6226)] }),
          new TableRow({ children: [cell("CloudFront", 2800), cell("Distribution E3Q04VWBORWUMU \u2014 d2abm5u1nsseqh.cloudfront.net (HTTPS, redirect-to-https, TLS 1.2)", 6226)] }),
          new TableRow({ children: [cell("S3 Bucket", 2800, altShading), cell("myhld-portal-frontend-949228373256 \u2014 Private, CloudFront OAC only (EH8F953AH40FA)", 6226, altShading)] }),
          new TableRow({ children: [cell("API Gateway", 2800), cell("HTTP API 1baqekfcrh \u2014 POST /generate route with Lambda integration", 6226)] }),
          new TableRow({ children: [cell("Lambda", 2800, altShading), cell("myhld-portal-backend \u2014 Python 3.12, 256MB, 120s timeout", 6226, altShading)] }),
          new TableRow({ children: [cell("DynamoDB", 2800), cell("myhld-portal-hld-records \u2014 PAY_PER_REQUEST, PK: HLD#{requestId}", 6226)] }),
          new TableRow({ children: [cell("Bedrock Model", 2800, altShading), cell("Amazon Nova Pro (apac.amazon.nova-pro-v1:0) via Converse API", 6226, altShading)] }),
          new TableRow({ children: [cell("IAM Role", 2800), cell("myhld-portal-lambda-role \u2014 Bedrock InvokeModel + DynamoDB CRUD + CloudWatch Logs", 6226)] }),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Deployment Timeline")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "AWS credentials verified (SSO profile PTAWISB_IsbUsersPS-949228373256)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "DynamoDB table created (PAY_PER_REQUEST)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "IAM execution role created with Bedrock + DynamoDB permissions", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Lambda function deployed (Python 3.12, 256MB, 120s timeout)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Lambda Function URL created, then replaced with API Gateway HTTP API", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "S3 bucket created, frontend uploaded", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "CloudFront distribution created with OAC, S3 bucket locked to private", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 200 }, children: [new TextRun({ text: "End-to-end testing via Playwright MCP (Edge browser) \u2014 full wizard flow verified with live Bedrock response", font: "Arial", size: 22 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Model Selection Journey")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "The model was changed multiple times during the session: started with Claude Haiku 4.5 (us-east-1), switched to global inference profile for Singapore, then to APAC Claude Sonnet 4 (marketplace subscription required \u2014 blocked), and finally settled on Amazon Nova Pro (apac.amazon.nova-pro-v1:0) which worked without marketplace friction.", font: "Arial", size: 22 })] }),

      // ── 5. Test Results ──
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Test Results")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "End-to-end testing was performed using Playwright MCP with Microsoft Edge. The full wizard flow was automated: dashboard verification, form filling across all 3 steps, AI generation trigger, and result validation.", font: "Arial", size: 22 })] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Test Scenario: SAP S/4HANA Cloud Analytics Platform")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Dashboard: 8 HLD records displayed with correct status counts (2 Submitted, 2 In-Review, 4 Approved)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Step 1: All dropdowns populated (HLD Category, Applications, APQC categories with cascading sub-processes)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Step 2: Data management fields with checkbox groups rendered correctly", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun({ text: "Step 3: Full Security Field checklist rendered (BIA, Connectivity, IAM 9 sections, Endpoint, App Security, Testing, Network)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 200 }, children: [new TextRun({ text: "Step 4: AI returned Mermaid diagram (rendered as SVG), 4 integration flows, 7 TOE classifications (all TOE Default), 3 risk flags (High: TLS 1.2, Medium: HA/DR, Medium: Auth), and 3 recommendations", font: "Arial", size: 22 })] }),

      // ── 6. Live URLs ──
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. Live URLs")] }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [2500, 6526],
        rows: [
          new TableRow({ children: [headerCell("Resource", 2500), headerCell("URL", 6526)] }),
          new TableRow({ children: [cell("Frontend", 2500), cell("https://d2abm5u1nsseqh.cloudfront.net", 6526)] }),
          new TableRow({ children: [cell("API Gateway", 2500, altShading), cell("https://1baqekfcrh.execute-api.ap-southeast-1.amazonaws.com/generate", 6526, altShading)] }),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── 7. Cost Estimate ──
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. Weekly Cost Estimate")] }),
      new Table({
        width: { size: 9026, type: WidthType.DXA },
        columnWidths: [3000, 3013, 3013],
        rows: [
          new TableRow({ children: [headerCell("Service", 3000), headerCell("Usage", 3013), headerCell("Est. Cost", 3013)] }),
          new TableRow({ children: [cell("Lambda", 3000), cell("Demo usage (~50 invocations/week)", 3013), cell("~$0.01", 3013)] }),
          new TableRow({ children: [cell("DynamoDB", 3000, altShading), cell("On-demand, minimal reads/writes", 3013, altShading), cell("~$0.01", 3013, altShading)] }),
          new TableRow({ children: [cell("Bedrock (Nova Pro)", 3000), cell("~50 calls/week", 3013), cell("~$0.50\u2013$2.00", 3013)] }),
          new TableRow({ children: [cell("S3 + CloudFront", 3000, altShading), cell("Static hosting", 3013, altShading), cell("~$0.05", 3013, altShading)] }),
          new TableRow({ children: [cell("API Gateway", 3000), cell("HTTP API", 3013), cell("~$0.01", 3013)] }),
          new TableRow({ children: [cell("Total", 3000, { fill: emerald, type: ShadingType.CLEAR }),
            new TableCell({ borders, width: { size: 3013, type: WidthType.DXA }, shading: { fill: emerald, type: ShadingType.CLEAR }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "", font: "Arial", size: 20, color: "FFFFFF", bold: true })] })] }),
            new TableCell({ borders, width: { size: 3013, type: WidthType.DXA }, shading: { fill: emerald, type: ShadingType.CLEAR }, margins: cellMargins, children: [new Paragraph({ children: [new TextRun({ text: "~$1\u2013$3/week", font: "Arial", size: 20, color: "FFFFFF", bold: true })] })] }),
          ] }),
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // ── 8. Follow-Up Items ──
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. Follow-Up Items")] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Authentication: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Implement Cognito / Entra ID SSO for user access control", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Diagram Upload: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Add multimodal AI interpretation of uploaded Visio/drawio/image diagrams (FR-13 to FR-15)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "TOE Catalogue: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Integrate real PETRONAS TOE catalogue (currently using AI general knowledge)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "AI Chatbot: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Implement FAQ and HLD search chatbot (FR-34 to FR-39)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Approval Workflow: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Formal state machine for Submitted \u2192 In-Review \u2192 Approved with role-based transitions", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Model Upgrade: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Enable Anthropic marketplace subscription for Claude Sonnet 4 (stronger reasoning for architecture analysis)", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Audit Trail: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Implement full audit logging for TOE authoring, risk acknowledgement, and approval activities", font: "Arial", size: 22 })] }),
      new Paragraph({ numbering: { reference: "numbers", level: 0 }, children: [new TextRun({ text: "Teardown Script: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Create deploy/teardown.sh to reverse all provisioned resources", font: "Arial", size: 22 })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("myHLD-AIDLC-Session-Summary.docx", buffer);
  console.log("Document created: myHLD-AIDLC-Session-Summary.docx");
});
