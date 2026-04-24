# Requirements — myHLD Portal MVP

## Intent Summary

- **Type:** New project
- **Scope:** Single-slice MVP of the myHLD portal (HLD Authoring, Governance & AI Knowledge Support)
- **Complexity:** High — multi-step wizard, AI-generated architecture diagrams, TOE classification, risk flagging, persistence, full PETRONAS branding

## The One Flow (Demo Walkthrough)

1. **Front Page / Dashboard** — Open the portal, see a list of existing HLD requests with status (Submitted, In-Review, Approved). Persisted in DynamoDB. Each HLD row is clickable — clicking opens a read-only detail view showing all registration fields, application/data inputs, cybersecurity selections, and (if available) the AI-generated outputs (diagram, TOE table, risk flags, recommendations) from that HLD (FR-NEW-02).
2. **Create New HLD** — Click "Create New HLD" → multi-step wizard begins:
   - **Step 1: HLD Registration** — Enter:
     - HLD Title, HLD Description (free text)
     - **HLD Category** dropdown: "New Application HLD" or "Enhancement HLD" (per FR-05/FR-06)
     - **Application** dropdown: Select from a mock application list (e.g., "SAP S/4HANA", "PETRONAS eProcurement", "myHR Portal", "Fleet Management System", etc. — mock data provided in `data.js`). For "Enhancement HLD", this is mandatory and triggers display of **Historical HLD Lineage** — a timeline/list of all previous HLD versions linked to the selected application, showing parent-child relationships, status, and approval dates (per FR-31 to FR-33). For "New Application HLD", the application dropdown allows selecting an existing app (to check for duplicates per FR-31) or entering a new application name.
     - **Enhancement Prefill (FR-NEW-01):** When the HLD Category is "Enhancement HLD" and an application is selected, the system automatically prefills all relevant form fields (across Step 1, Step 2, and Step 3) using data from the most recent approved/submitted HLD for that application. Prefilled fields are visually indicated (e.g., highlighted border or subtle background tint) so the requestor can clearly see what was carried forward. The requestor must validate and confirm or modify the suggested values before proceeding. This applies to: HLD Type, Landscape Type, Business Division, Business Capability, Application Components, Integrations, Data Classification, all Data Encryption selections, all Cybersecurity & Compliance selections (BIA ratings, HA/DR, Connectivity, IAM, Endpoint, Application Security, Security Testing, Network Security).
     - HLD Type dropdown: ERP Application / Infrastructure / Non-ERP Application
     - Landscape Type dropdown: Enterprise Cloud / On-Premise / SaaS
     - Business Division dropdown: Corporate / Downstream / Gentari / PT & HSSE / Gas & Maritime / Upstream / Virtus IP / PDSB / MPM
     - **Business Capability** (cascading two-level dropdown: Level 0 = 13 APQC PCF categories, Level 1 = 72 sub-processes — loaded from `data/apqc_capabilities.json` sourced from APQC PCF Cross-Industry v7.4)
     - AI provides non-blocking naming suggestions (FR-04).
   - **Step 2: Application & Data** — Fill in structured template fields for application components, data management (classification, encryption, integration, retention, DLP per FR-23). Fields are prefilled from prior HLD when Enhancement category is selected (FR-NEW-01).
   - **Step 3: Cybersecurity & Compliance** — Full Security Field checklist: BIA ratings, HA/DR, Connectivity, IAM, Endpoint Security, Application Security, Data Encryption, Security Testing, Network Security (per FR-22 and Security Field reference doc). Fields are prefilled from prior HLD when Enhancement category is selected (FR-NEW-01).
3. **AI Generates Architecture** — On submission, Bedrock processes all inputs and returns:
   - A **Mermaid HLD diagram** representing the high-level architecture including:
     - Application components and their groupings
     - **Integration flows between systems** with protocol labels (e.g., HTTPS, SFTP, API, ETL, Middleware)
     - **List of impacted/connected systems** (upstream and downstream dependencies)
     - Data flows and storage components
     - Security boundaries and controls
     - Logical relationships based on the provided inputs
   - Rendered client-side via mermaid.js (FR-18, FR-19)
   - An **Integration Summary Table** listing: Source System → Target System → Protocol → Integration Type → Direction (inbound/outbound/bidirectional)
   - A **TOE component table** with classification labels (TOE Default / Available Not Preferred / Step-Out / Unknown) based on general enterprise knowledge (FR-16, FR-17)
   - **Risk flags** with severity (Critical/High/Medium/Low), confidence level, and explainable rationale describing which input triggered the flag (FR-24, FR-25, FR-26)
   - **AI recommendations** — alternative solutions or remediation suggestions for flagged items
4. **Review & Feedback** — Reviewer sees the generated diagram, TOE table, risk flags, and recommendations. Can acknowledge risks (FR-27, FR-30).
5. **Save** — HLD request is persisted to DynamoDB with all inputs and AI-generated outputs.

## The AI Moment

Two real Bedrock interactions:

1. **Form submission → AI-generated architecture design.** The user fills structured form fields across three steps (registration, application/data, cybersecurity). Bedrock processes all inputs in a single call and returns a Mermaid diagram, TOE classification table, risk flags with rationale, and recommendations.
2. **Chatbot panel → contextual AI assistance.** While filling the wizard, the user can ask the Bedrock Assistant questions in a persistent side panel. The assistant has context of the current form state and can suggest field values, explain security requirements, or answer architecture questions. Responses may include an "Apply to Form" action that pre-fills the relevant field directly. This is the second real Bedrock call — triggered per user message.

## UI/UX Shape

- **Page structure:** Three-column layout:
  - Left sidebar — navigation (Overview, HLD Generator, File Vault, Security Audit, History) with active state in emerald, plus a "New Analysis" pill button at the bottom
  - Centre main area — multi-step wizard (Registration → Application → Security) with step progress indicator at the top; form cards below
  - Right panel — persistent Bedrock Assistant chatbot (fixed width ~300px), always visible while the wizard is open

- **Input method:** Structured form fields only — dropdowns, checkboxes, free-text where appropriate. No diagram upload. AI-prefilled fields show an "AI POPULATED" badge (emerald pill) on the field border.

- **Chatbot panel (Bedrock Assistant):**
  - Header: "Bedrock Assistant" with status indicator ("ONLINE & ANALYZING"), close (×) button
  - Message thread: alternating user messages (emerald bubble, right-aligned) and AI responses (white card, left-aligned)
  - AI response cards may include:
    - A labelled "AI SUGGESTION" header with a spark/AI icon
    - Bold key terms within the response body
    - An "Apply to Form" action button (pill, emerald outline) that writes the suggestion directly into the relevant wizard field
  - Quick-action chips above the input bar (e.g., "Compliance check?", "Cost estimate?") — tapping pre-fills the input
  - Input bar at the bottom: text field ("Ask Bedrock a question…"), attachment icon, send button (emerald filled circle with arrow icon)
  - The assistant is context-aware: it knows which wizard step is active and which fields are currently filled

- **Output format (post-submission):**
  - Mermaid HLD diagram rendered via mermaid.js — includes components, integration flows with protocol labels, impacted systems, data flows, security boundaries
  - Integration summary table (source system | target system | protocol | integration type | direction)
  - Structured TOE table (component | category | classification | notes)
  - Risk flags as cards with severity badge, rationale text, and confidence percentage
  - Recommendations as actionable text blocks

- **Branding:** Full PETRONAS brand guidelines — emerald header with white logo, Museo Sans font, pill buttons (100px radius), 10px card radius, emerald focus rings, all per steering doc.

## Model Selection

**Claude Haiku 4.5** (`global.anthropic.claude-haiku-4-5-20251001-v1:0`) — reasoning quality matters for architecture analysis, TOE classification, and risk assessment. Using global inference profile for ap-southeast-1 (Singapore) deployment.

## Persistence

- **DynamoDB** — single table design
  - PK: `HLD#{requestId}`
  - Stores: registration fields, application/data inputs, security inputs, AI-generated outputs (Mermaid diagram, TOE table, risk flags, recommendations), status, timestamps
- Front page reads from DynamoDB to display HLD list with status

## Out of Scope (This Session)

- Diagram upload / image interpretation (FR-13 to FR-15) — template-based only
- User authentication / RBAC (FR-38, NFR-SEC-01) — unauthenticated demo URL
- Parent-child HLD versioning (FR-05 to FR-07) — hardcoded sample lineage
- Application traceability / duplicate detection (FR-31 to FR-33) — lineage display only, no automated duplicate blocking
- Audit trail (NFR-AUD-01, NFR-AUD-02)
- Editable generated diagrams (FR-20) — view-only for MVP
- Approval workflow state machine — reviewers can view and acknowledge, but no formal state transitions
- Multi-region, CI/CD, custom domain

## Open Questions Deferred to Follow-Up

- Authentication (Cognito / Entra ID SSO)
- Real TOE catalogue integration (currently AI uses general enterprise knowledge)
- Diagram upload with multimodal AI interpretation
- Formal approval workflow with state transitions
- Audit logging
- Parent-child HLD versioning logic
