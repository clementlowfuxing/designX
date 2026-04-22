# Requirement Verification Questions — myHLD Portal MVP

Please fill in your answers after each `[Answer]:` tag. For multiple-choice, write the letter(s). For open-ended, write freely.

---

## 1. Target User & Demo Audience

**Q1.1:** Who is the primary user for this demo?

A) Solution Architect (the person authoring HLDs)
B) EA/ED/CS Reviewer (the person approving HLDs)
C) Both — show the authoring AND review flow
D) Leadership / management audience (demo the concept, not the workflow)
X) Other (describe below)

`[Answer]:`C and D

**Q1.2:** Who will be in the room when this is demoed? What should they walk away impressed by?

`[Answer]:`C and D

---

## 2. The One Slice — Which Flow to Demo

The SRS covers a lot of ground. For a single-session MVP, we need to pick ONE flow to make real. The rest stays scripted with sample data.

**Q2.1:** Which single flow is the "wow moment" for this demo?

A) **Diagram-based TOE extraction** — Upload an HLD diagram → AI interprets it → extracts components → maps to TOE catalogue → shows classification (FR-13 to FR-17)
B) **Auto Risk Flagging** — User fills in Security & Data fields → AI generates risk flags with explainable rationale (FR-24 to FR-27)
C) **AI Chatbot / FAQ** — User asks natural-language questions about approved HLDs and gets grounded answers (FR-34 to FR-39)
D) **Template-based TOE + auto diagram generation** — User fills structured templates → system generates architecture diagram (FR-18 to FR-20)
E) **HLD Request Registration + front page** — Show the full front-page form with status tracking and naming suggestions (FR-01 to FR-08)
X) Other combination (describe below)

`[Answer]:`A to D

**Q2.2:** If you picked more than one above, which ONE is the "real AI" moment powered by Bedrock? The others will use scripted/hardcoded sample data.

`[Answer]:`AI Assisted Agent to populate the design based on the input of requestor

---

## 3. Demo Walkthrough

**Q3.1:** Describe the ideal demo in 3–5 numbered steps. What does the presenter click, type, and show?

Example format:
1. Open the portal → see the front page with HLD status cards
2. Click "Create New HLD" → fill in the form
3. Upload a diagram → AI extracts TOE components (this is the real AI step)
4. Review the extracted TOE table with classifications
5. See risk flags generated

`[Answer]:` 
1. Open the portal and front page with list of HLD 
2. Develop HLD by inserting the information for application, data, cybersecurity in the guided prompt ways 
3. AI will draw the HLD diagram and matching against TOE classification 
4. See risk flags and confidence level generated and highlight any findings
5. Provide the recommendation from AI
6. Prompt the feedback from reviewer

---

## 4. Input & Output Shape

**Q4.1:** For the AI-powered step you chose in Q2.2, what does the user provide as input?

A) An uploaded architecture diagram (Visio/drawio/image)
B) Filled-in security & data management form fields (from the Security Field checklist)
C) A natural-language question typed into a chatbot
D) Structured template fields (application, data, security sections)
X) Other (describe below)

`[Answer]:`A to D

**Q4.2:** What does the user see as output from the AI step?

A) A table of extracted TOE components with classification labels (TOE Default / Available Not Preferred / Step-Out / Unknown)
B) A list of risk flags with severity (Critical/High/Medium/Low) and explainable rationale
C) A conversational answer with source references to approved HLDs
D) An auto-generated architecture diagram
X) Other (describe below)

`[Answer]:`A to D

---

## 5. Sample Scenario

**Q5.1:** Describe one realistic example scenario for the demo. What would a Solution Architect actually input, and what should they see back?

For example: "A Solution Architect uploads a diagram showing an SAP S/4HANA deployment on AWS with API Gateway, Lambda, and RDS. The system extracts these components and flags RDS as 'Available Not Preferred' because the TOE catalogue recommends DynamoDB for new workloads."

`[Answer]:`A solution architect would like to generate HLD diagram based on the input such as image, drawio, visio, prompt input in the AI agent, The system will populate the components from the listed input and system will cross check against TOE library. The system should flags any mismatch and provide the recommendation or alternative solution.

---

## 6. TOE Catalogue

**Q6.1:** Do you have an existing TOE catalogue (the list of enterprise-approved technologies with their classifications) that we can use as reference data?

A) Yes — I can provide it as a file (Excel/CSV/JSON)
B) Yes — but it's internal and I'll paste a representative sample
C) No — we'll use a mock/sample TOE catalogue for the demo
D) The AI should generate reasonable classifications based on general enterprise knowledge

`[Answer]:`D

---

## 7. Security Field Data

**Q7.1:** For the Security & Compliance section (from the Security Field document), should the demo:

A) Show the full checklist form with all categories (Connectivity, IAM, Endpoint, App Security, Data Encryption, Security Testing, Network Security) as interactive checkboxes
B) Show a simplified subset (e.g., just BIA + IAM + Data Encryption) to keep the demo focused
C) Pre-fill the security fields with sample data and focus the demo on the risk flagging output
X) Other (describe below)

`[Answer]:`full checklist

---

## 8. Page Structure & UI

**Q8.1:** What page structure works for the demo?

A) Single page with sections (scroll down through the flow)
B) Multi-step wizard with tabs/steps (Step 1: Register → Step 2: Author TOE → Step 3: Review)
C) Dashboard-style front page + detail page when you click into an HLD
D) Split view — form on left, results/preview on right
X) Other (describe below)

`[Answer]:`B

**Q8.2:** Confirm PETRONAS brand guidelines apply? (Emerald header, Museo Sans font, pill buttons, 10px card radius, etc.)

A) Yes — full PETRONAS branding
B) Yes — but simplified/lighter version is fine
C) No — use a neutral/generic look

`[Answer]:`A

---

## 9. Data & Persistence

**Q9.1:** Does the demo need to persist data (save HLD requests, retrieve them later)?

A) Yes — save to a database, show previously submitted HLDs on the front page
B) No — everything resets on refresh, use hardcoded sample data for the "existing HLDs" view
C) Partial — show hardcoded sample HLDs on the front page, but the new submission doesn't need to persist

`[Answer]:`A

---

## 10. Success Criteria

**Q10.1:** In one paragraph, describe what "success" looks like at the end of this session. What URL do you open, what do you show, and who says "that's exactly what I wanted"?

`[Answer]:`Auto generated HLD diagrams based on the best industry practice in TOE 

---

*Please fill in all answers and let me know when you're done. I'll review for any follow-ups, then we'll lock the requirements and move to construction.*
