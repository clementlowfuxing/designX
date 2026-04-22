---
inclusion: always
description: Compressed AIDLC workflow for shipping a deployed, Bedrock-powered MVP on AWS in a single session. Follows the upstream AI-DLC three-phase shape (inception, construction, operations) adapted for a 6-hour ceiling.
---

# Compressed AIDLC — From Idea to Deployed Bedrock MVP in One Session

This workspace runs a compressed AIDLC session based on [awslabs/aidlc-workflows](https://github.com/awslabs/aidlc-workflows). The output is a URL, not a localhost prototype — a static site on S3, a Lambda Function URL, and a real Bedrock call, all deployed by the end of the session.

The session supports two entry points: **with a prior mockup** or **from scratch** (no mockup). When no mockup exists, inception runs deeper to fully capture UI/UX intent, user flow, and output shape — then construction builds the frontend directly from those inception artifacts. No intermediate mockup step.

The room is mostly product and business people. Kiro facilitates inception, implements construction, and owns deployment.

## Time Budget

| Phase | Budget |
|---|---|
| Inception | 1.5–2h |
| Construction | 1–2h |
| Construction Review | 15–30m |
| Deployment | 1.5–2h (protected) |
| Buffer | 30m |

Announce remaining time at each phase transition. If inception runs long, force a decision — an imperfect scope that deploys beats a perfect scope that doesn't.

## Session Opening

Before anything else, in this exact order:

1. **One-line session framing.** "We're running a compressed AIDLC — inception, construction, deployment, all today. Target is a deployed URL."
2. **Check for a mockup.** Look for an existing `mockup/` folder (or similar: `index.html` + `app.js` + `data.js` trio).
3. **If mockup exists (Path A):** Read it, form a view, summarize it back to the room in 2–3 sentences, then start inception.
4. **If no mockup exists (Path B):** Acknowledge it. Tell the room: "No mockup — inception will go deeper to nail down exactly what this looks like, then construction builds it directly." Proceed to inception with the extended question set (see below).
5. **No AWS talk yet.** Do not ask about credentials, models, or architecture — those belong in construction.

## Inception Phase (1.5–2h) — Pure Product Work

Follows the upstream AIDLC inception stages: **Workspace Detection → Requirements Analysis → Workflow Planning**. User Stories, Application Design, and Units Generation are skipped by default — this is a single-slice MVP, not a multi-unit system.

All inception artifacts go in `aidlc-docs/` (upstream AIDLC convention).

### Facilitation rules

- **All questions at once in a file.** Do NOT ask questions one at a time in chat. Instead, output ALL clarifying questions into `aidlc-docs/inception/requirements/requirement-verification-questions.md` in a single pass. The user fills in answers in the file and tells you when done. This is faster and lets the room discuss offline.
- **User-value language**, not technical language. "Who walks away impressed, and what did they see?" not "What API contract do we need?"
- **Reflect long answers** back in one sentence and confirm. Do not paraphrase silently.
- **Name disagreements** out loud. Ask which version wins. Do not average opinions.
- **Push back on scope.** If the room lists more than three must-haves, ask which one the demo lives or dies on.
- **No AWS talk.** If someone asks about Bedrock models, Lambda, or regions during inception, say "we'll decide that in construction" and move on.

### Requirements Analysis (always runs)

Adapt depth to complexity. Most MVP sessions are **standard depth**. When no mockup exists, use the **extended question set** to capture UI/UX intent that a mockup would otherwise communicate.

1. **Intent analysis.** Classify the request: request type (new project / enhancement), scope, complexity. Log in `aidlc-docs/audit.md`.
2. **Clarifying questions — all at once in a file.** Create `aidlc-docs/inception/requirements/requirement-verification-questions.md` with ALL structured questions in a single file. Use A/B/C/D options where possible, always include an "X) Other (describe below)" option, and use `[Answer]:` tags for the user to fill in. Tell the user the file is ready and ask them to fill it in. Do NOT drip-feed questions one at a time in chat.

   **Core questions (always include — with or without mockup):**
   - Target user (specific persona, not "a business user")
   - The single flow the demo must show (3–5 numbered steps)
   - Which one step becomes the "real AI" moment (the rest stays scripted)
   - What inputs that AI step takes and what output the user sees
   - Success demo: what the presenter shows at the end, in one paragraph

   **Extended questions (include when no mockup exists — these replace what the mockup would tell us):**
   - **Page structure:** Single page or multi-step wizard? Scrolling form or card-based layout?
   - **Input method:** Free-text description, structured form fields, guided questionnaire, or a mix?
   - **Output format:** Prose paragraph, structured scorecard/table, visual chart, or a combination?
   - **Tone and audience:** Executive summary style, technical deep-dive, or actionable checklist?
   - **Key data points:** What specific inputs does the user provide? List the fields/questions they answer.
   - **Result sections:** What sections should the output contain? (e.g., recommendation, reasoning, cost comparison, next steps)
   - **Sample scenario:** Describe one realistic example — what the user types in and what they expect to see back.
   - **Visual reference:** Any existing tools, dashboards, or websites that feel like the right vibe? (even outside PETRONAS)
   - **Branding:** Confirm PETRONAS brand guidelines apply (emerald header, Museo Sans, pill buttons, 10px card radius).

3. **Gate.** Wait for the user to say the file is filled in. Read the answers, analyze for ambiguities. If anything is unclear, ask follow-up questions (these can be in chat since they're targeted). Proceed when resolved or the user says proceed.
4. **Requirements doc.** Write `aidlc-docs/inception/requirements/requirements.md`, under one page, with:
   - Intent summary (type, scope, complexity)
   - The one flow (numbered steps)
   - The AI moment (in user terms — not model names yet)
   - UI/UX shape (Path B only — summarize the page structure, input method, output format, result sections, and key data points agreed during questions)
   - Success demo paragraph
   - Out of scope (explicit list of everything cut)
   - Open questions deferred to follow-up (auth goes here by default)
5. **Approval.** Present the completion message per upstream format. Wait for explicit approval.

### Product-scope refusals (inception only)

During inception, refuse these at the product level and note them under "open questions":

| Request | Alternative |
|---|---|
| "Add login" | Deferred. Demo URL is internal-only. |
| "Multiple AI-powered interactions" | Pick one. Second slice is a follow-up session. |
| "Native mobile app" | Responsive web. |
| "Multi-page flow with navigation" | Single page unless the flow genuinely requires more. |

AWS-shape refusals (EC2, containers, RDS, Cognito, IaC frameworks, etc.) come later, in construction. Keep inception focused on what the user sees.

### Workflow Planning (always runs)

After requirements approval, pick which construction stages will run. The plan differs based on whether a mockup exists.

**Path A — Mockup exists:**

- Functional Design: **skip** (mockup already defines the flow)
- NFR Requirements: **skip** (demo-only, no production NFRs)
- Infrastructure Design: **run** (the AWS architecture gets locked here)
- Code Generation: **run**
- Construction Review: **run** (room reviews all code and the deploy plan before anything goes live)
- Build and Test: **run** (deploy script + smoke test)

**Path B — No mockup:**

- Functional Design: **skip** (inception extended questions already define the flow, UI shape, and output format)
- NFR Requirements: **skip** (demo-only, no production NFRs)
- Infrastructure Design: **run**
- Code Generation: **run** (Kiro builds `frontend/` directly from inception artifacts — no intermediate mockup)
- Construction Review: **run** (this is where the room sees the UI for the first time and gives feedback)
- Build and Test: **run**

Present the plan. Wait for approval. Move to construction.

### Source material rules

- When a mockup exists (Path A), the `mockup/` folder is **read-only**. Do not edit it. MVP code lives in `frontend/`, `backend/`, `deploy/`.
- When no mockup exists (Path B), there is no `mockup/` folder. The `aidlc-docs/inception/requirements/requirements.md` is the source of truth for what to build. MVP code lives directly in `frontend/`, `backend/`, `deploy/`.

## Construction Phase (1–2h) — AWS Enters Here

Now AWS becomes real. Construction runs the upstream per-unit stages; for a single-slice MVP there's only one unit.

### Step 1: AWS prerequisites check

First thing in construction, before writing any code:

- Confirm AWS CLI v2 is configured: `aws sts get-caller-identity`
- Confirm sandbox account has: S3, Lambda, IAM role create, Bedrock invoke, CloudFront (if needed), DynamoDB (if in scope)
- Lock region to **`us-east-1`** everywhere (CLI flags, Lambda env, shell env)
- If Anthropic models will be used, confirm the one-time usage form has been submitted (`aws bedrock put-use-case-for-model-access`)

If credentials aren't ready, this is a blocker. Resolve before proceeding.

### Step 2: Design review

**Path A (mockup exists):** Read the mockup's `index.html`, `app.js`, `data.js` and present to the room:
- What the user journey is (2–3 sentences)
- Where the scripted "fake AI" lives in `data.js`
- The recommended slice to swap for a real Bedrock call
- Confirmation that everything else stays scripted

**Path B (no mockup):** Review `aidlc-docs/inception/requirements/requirements.md` and present to the room:
- The user flow (from requirements)
- The UI structure Kiro will build (page layout, input fields, output sections — derived from the extended inception questions)
- Which step becomes the real Bedrock call
- What stays scripted with hardcoded data

Get confirmation. If the room picks a different slice or wants UI changes, accept it and update the requirements doc.

### Step 3: Infrastructure Design — the only allowed architecture

```
Browser
  │
  ▼
Amazon S3 (static site; private + CloudFront OAC)
  │
  │  fetch() to:
  ▼
AWS Lambda Function URL (AuthType: IAM, CORS enabled)
  │
  │  Lambda execution role calls:
  ▼
Amazon Bedrock (Converse API)
```

**Hard constraints — refuse if asked otherwise:**

| Request | Refusal | Alternative |
|---|---|---|
| EC2 / ECS / EKS / Fargate / any container | No. | Lambda Function URL. |
| Cognito (User Pool or Identity Pool) | Deferred to follow-up. | Unauthenticated demo URL. |
| RDS / Aurora | No. | DynamoDB only if persistence is genuinely demo-visible. |
| New VPC | No. | Lambda outside VPC (unless sandbox SCPs force one). |
| CDK / SAM / Terraform / Pulumi | No bootstrap overhead. | Raw AWS CLI in a bash script. |
| CI/CD pipeline | No. | Deploy from laptop. |
| Custom domain + ACM cert | No. | Auto-generated S3/CloudFront URL. |
| Multi-region | No. | `us-east-1` only. |
| Bedrock Knowledge Bases / Agents / Guardrails / Flows | Blows the budget. | Stuff context directly in the prompt. |
| Fine-tuning | No. | Prompt engineering + on-demand. |
| Streaming Bedrock responses | No. | Return full response. |
| External AI API (OpenAI, Gemini, etc.) | No. | Bedrock only. |

**S3 hosting decision:** try S3 public static website first. If Block Public Access or SSE-KMS blocks it, pivot to CloudFront + OAC (OAI doesn't support SSE-KMS). Don't debate before trying.

**DynamoDB:** only include if persistence is visibly demonstrated, uses a single table, and genuinely can't be faked.

### Step 4: Model selection (Bedrock)

Lock `us-east-1` and Converse API. On-demand only.

Default picking order:

1. **Amazon Nova Lite** (`amazon.nova-lite-v1:0`) — the default. Zero-friction for summarization, classification, short answers.
2. **Amazon Nova Micro** (`amazon.nova-micro-v1:0`) — cheaper/faster for tiny tasks (yes/no, tagging).
3. **Amazon Nova Pro** (`amazon.nova-pro-v1:0`) — when Lite output feels weak.
4. **Claude Haiku 4.5** — inference profile `us.anthropic.claude-haiku-4-5-20251001-v1:0`. Use when reasoning quality matters more than latency.
5. **Claude Sonnet 4.5** — inference profile `us.anthropic.claude-sonnet-4-5-20250929-v1:0`. Only when reasoning IS the wow factor.

**Never** Opus, Titan, or legacy Claude 3.x. Claude 4.x must go through the `us.` inference profile ID, not the raw foundation model ID.

State the chosen model and a one-line reason out loud. Record in the requirements doc.

### Step 5: Code Generation

**Path A (mockup exists):** Project layout at the workspace root (the mockup stays untouched):

```
mockup/                     ← read-only, reference only
frontend/
  index.html                ← copied from mockup, minimally modified
  style.css                 ← copied
  app.js                    ← swap the one slice for fetch() to Lambda URL
  data.js                   ← unchanged or trimmed
backend/
  lambda_function.py        ← Python 3.12, boto3 (no deps to package)
deploy/
  deploy.sh                 ← provisions everything with aws CLI
  config.sh                 ← variables
  README.md                 ← demo URL, model, cost, teardown note
aidlc-docs/                 ← inception + construction artifacts
```

**Path B (no mockup):** Kiro builds the frontend from scratch using inception artifacts as the spec:

```
frontend/
  index.html                ← built from inception requirements (UI shape, sections, layout)
  style.css                 ← PETRONAS brand guidelines applied
  app.js                    ← one slice calls fetch() to Lambda URL, rest uses data.js
  data.js                   ← scripted sample data for non-AI sections
backend/
  lambda_function.py        ← Python 3.12, boto3 (no deps to package)
deploy/
  deploy.sh                 ← provisions everything with aws CLI
  config.sh                 ← variables
  README.md                 ← demo URL, model, cost, teardown note
aidlc-docs/                 ← inception + construction artifacts
```

For Path B, the frontend is built to match the UI/UX shape documented in `requirements.md`: page structure, input fields, output sections, tone, and branding — all decided during inception.

**Frontend:** keep the visual design unchanged (PETRONAS brand stays per brand-guidelines steering). Only the one slice changes from scripted to `fetch()`. Substitute `LAMBDA_URL` into `app.js` via `sed` after the Lambda is deployed.

**Backend:** Lambda parses the JSON body, builds the prompt, calls `bedrock-runtime.converse(...)`, returns text (or parsed JSON) with CORS headers.

**Error handling is minimal, not enterprise:** Lambda catches Bedrock errors, logs to CloudWatch, returns a friendly 200. Frontend shows a visible inline notice on fetch errors — no silent failures, no retries, no tracing.

Everything not explicitly the one slice stays scripted from `data.js`. Resist the urge to wire a second slice.

### Step 6: Construction Review — Gate Before Deployment

Before moving to deployment, pause and walk the room through what was built. This is the last chance to catch issues before real AWS resources get created.

**Present to the room (do not skip):**

1. **File-by-file walkthrough.** For each file in `frontend/`, `backend/`, and `deploy/`, summarize in plain language:
   - What the file does
   - What changed vs. the mockup (Path A) or how it implements the inception requirements (Path B)
   - Any decisions baked in (model choice, prompt wording, error messages)
2. **UI walkthrough (Path B especially).** Since the room hasn't seen the UI before, open `frontend/index.html` in a browser and walk through the full flow. This is the first time the room sees the actual interface — get feedback and iterate if needed before proceeding.
2. **The prompt.** Read the exact Bedrock prompt from `lambda_function.py` out loud. This is the single most important thing the room should validate — it shapes what the user sees.
3. **The deploy plan.** Walk through `deploy.sh` step by step: what AWS resources it creates, what permissions it grants, what URLs it produces.
4. **Diff from requirements.** Confirm that what was built matches `aidlc-docs/inception/requirements/requirements.md`. Call out any deviations explicitly.
5. **Known gaps.** List anything that's intentionally stubbed, scripted, or missing.

**Gate rule:** Wait for explicit approval before proceeding to deployment. If the room wants changes, make them now — it's cheaper to edit code than to redeploy.

**Time check:** Announce remaining time. If less than 2h remain, flag that deployment is time-boxed and suggest prioritizing must-fix items only.

## Deployment Phase (2h) — Protected Block

Raw AWS CLI, idempotent bash. Start this on time even if construction isn't fully finished.

`deploy/deploy.sh` steps:

1. Source `config.sh` (bucket name, function name, role name, region `us-east-1`).
2. `aws sts get-caller-identity` sanity check.
3. Create IAM execution role, trust policy for `lambda.amazonaws.com`.
4. Attach inline policy with `bedrock:InvokeModel` on:
   - The foundation model ARN
   - **And** the inference profile ARN (required for Claude 4.x — missing either throws `AccessDeniedException`)
   - There is no `bedrock:Converse` IAM action; Converse goes through `InvokeModel`.
5. Attach managed `AWSLambdaBasicExecutionRole`. Add DynamoDB perms scoped to the table if applicable.
6. `zip lambda.zip lambda_function.py`, create the Lambda (`python3.12`, the role, env vars for `MODEL_ID`).
7. Create Function URL: `AuthType NONE`, CORS allowing the site origin (or `*` for first deploy).
8. Capture the Function URL, `sed` it into `frontend/app.js`.
9. Create S3 bucket. Try public static-website first; pivot to CloudFront + OAC if Block Public Access or SSE-KMS forces it.
10. `aws s3 sync ./frontend s3://<bucket>/`.
11. If CloudFront: poll until `Deployed`, print URL.
12. Smoke test: curl the URL, exercise the AI slice in browser, confirm a real Bedrock call in CloudWatch logs (not mock).

### Common failures and the fix

- **Public bucket blocked.** Pivot to CloudFront + OAC. Don't fight SCPs.
- **Bedrock AccessDenied on Claude.** IAM `Resource` must list both foundation model ARN and inference profile ARN.
- **Anthropic "use case required".** Run `aws bedrock put-use-case-for-model-access` and retry.
- **CORS error in browser.** Update Function URL CORS via `aws lambda update-function-url-config`.
- **CloudFront 403 from S3 origin.** Reattach the OAC bucket policy.
- **Cold start feels slow.** Do one warm-up invoke before the demo.

If a failure isn't on this list and isn't fixed in ~15 min, fall back to the simpler variant (public S3, Nova instead of Claude, drop CloudFront). Shipping beats perfecting.

### Definition of done

- A URL anyone in the room can open.
- The AI slice calls Bedrock for real (verified in CloudWatch).
- `aidlc-docs/inception/requirements/requirements.md` matches what was built.
- `deploy/deploy.sh` + `config.sh` reproduce the deployment on a clean account.
- `deploy/README.md`: demo URL, model chosen, real vs. scripted, known limits, rough weekly cost.

## Follow-Ups (Not in This Session)

**Auth**, in order of simplicity when requirements come in later:
1. Shared API key in Lambda (header check) — simplest gate.
2. CloudFront signed URLs / signed cookies — edge gating.
3. Lambda Function URL `AWS_IAM` + Cognito Identity Pool — requires both `lambda:InvokeFunctionUrl` and `lambda:InvokeFunction` on the caller role (as of Oct 2025).
4. Cognito User Pool + hosted UI — the real answer for production, ~1h extra.

**Teardown.** Not automated. Before closing, remind the room that S3, CloudFront, Lambda, and DynamoDB keep accruing cost. Suggest a `deploy/teardown.sh` that reverses `deploy.sh`. Do not run it automatically — the URL needs to stay alive for follow-ups.

## One-Line Summary

Ship a deployed, single-slice Bedrock MVP in under 6 hours: inception produces `aidlc-docs/inception/requirements/requirements.md` (with extended UI/UX questions when no mockup exists), construction builds `frontend/` + `backend/` + `deploy/` directly from inception artifacts (no intermediate mockup), a construction review gate lets the room validate code, UI, and prompt before anything deploys, then deployment runs `deploy.sh` and returns a live URL. One real AI slice, everything else scripted, `us-east-1` only, no EC2, no auth, no IaC frameworks.
