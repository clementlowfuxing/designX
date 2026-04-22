# System Requirements Specification (SRS)

myHLD -- TOE Authoring, Governance, Versioning, Front-Page Enhancements and AI Knowledge Support (v5)

# 3. Functional Requirements

This section consolidates Functional Requirements (FR-01 to FR-39) covering portal behaviour, HLD request registration, TOE authoring, governance controls, and AI-assisted knowledge support.

## 3.1 Portal Foundation & Status Visibility

FR-01: The system shall be implemented as a web-based portal provisioned within PETRONAS for internal use.

FR-02: The system shall display HLD request status on the front page with the following values: Submitted, In-Review, and Approved.

## 3.2 HLD Request Registration (Front Page)

FR-03: The system shall allow the Solution Architect to create an HLD request by entering the following details on the front page:

  -------------------------------------------------------------------------------------------------------------------------------------------
  Field                   Type                    Allowed Values
  ----------------------- ----------------------- -------------------------------------------------------------------------------------------
  HLD Title               Free text               ---

  HLD Description         Free text               ---

  HLD Type                Dropdown                ERP Application; Infrastructure; Non-ERP Application

  Landscape Type          Dropdown                Enterprise Cloud; On-Premise; SaaS

  Business Division       Dropdown                Corporate; Downstream; Gentari; PT & HSSE; Gas & Maritime; Upstream; Virtus IP; PDSB; MPM

  Workload Type           Dropdown                New Development; Enhancement
  -------------------------------------------------------------------------------------------------------------------------------------------

FR-04: For all free-text fields, the system shall provide non-blocking naming and formatting suggestions to promote standardisation of HLD naming and descriptions.

## 3.3 Workload Type--Driven Versioning Control

FR-05: If Workload Type is New Development, the system shall treat the created HLD request as a parent request and assign a new unique parent request ID.

FR-06: If Workload Type is Enhancement and Roll out, the system shall display a searchable field to allow the Solution Architect to find and select an existing approved parent HLD for tagging and versioning control.

FR-07: For Enhancement or Roll Out workload types, selection of a parent HLD shall be mandatory prior to submission, and the system shall establish a parent--child relationship between the selected parent and the new request.

## 3.4 Navigation & Multi-Step Flow Control

FR-08: After completing the HLD request front-page form (FR-03), the system shall guide the user to a second column/tabbed section to continue the HLD submission process starting from FR-09 onwards.

## 3.5 TOE Authoring Entry & Method Selection

FR-09: The system shall support multiple TOE component authoring pathways to enable Solution Architects to populate TOE components regardless of solution maturity.

FR-10: The system shall support diagram-based (AI-assisted) and template-based (manual, guided) TOE authoring pathways.

FR-11: The system shall allow TOE population without a manually uploaded HLD diagram using structured templates.

FR-12: For template-based TOE authoring, the system shall require selection of deployment model (SaaS, PaaS, IaaS).

## 3.6 Diagram-Based TOE Extraction & Analysis

FR-13: The system shall allow Solution Architects to upload an HLD architecture diagram in Visio (.vsdx), drawio or image format.

FR-14: The system shall interpret the uploaded HLD diagram to identify architectural elements such as components, groupings, and integrations.

FR-15: The system shall map interpreted architectural elements into a structured internal representation for TOE analysis.

FR-16: The system shall extract architectural components identified in the uploaded HLD diagram and populate them into the corresponding TOE component tables.

FR-17: The system shall analyse and evaluate the extracted components against the enterprise-approved TOE catalogue, identify the appropriate TOE classification (TOE Default, Available Not Preferred, Step-Out), and label unmatched components as Unknown / Not Available in TOE.

## 3.7 Template-Based Architecture Diagram Generation

FR-18: For template-based TOE authoring, after the Solution Architect completes the required information across Application, Data, and Security sections, the system shall automatically generate a high-level architecture diagram representing the submitted design.

FR-19: The auto-generated architecture diagram shall represent, at minimum, application components, data components and interactions, security components and boundaries, and logical relationships based on the provided inputs.

FR-20: The system shall store the auto-generated architecture diagram as part of the HLD artefact and make it available to reviewers; the Solution Architect shall be able to edit the generated diagram prior to submission.

## 3.8 Data Management & Cybersecurity (Common to All TOE Authoring Paths)

FR-21: For both diagram-based and template-based TOE authoring, the system shall require the Solution Architect to explicitly complete and confirm Data Management and Cybersecurity information prior to submission and approval.

FR-22: The system shall require Cybersecurity and Compliance information including Business Impact Assessment (Confidentiality, Integrity, Availability, Overall), HA/DR requirements where applicable, and declared security architecture controls across IAM, endpoint security, application security, and network security. This information shall be referred to Document "Security List"

FR-23: The system shall require Data Management information including data classification and privacy obligations, data-in-motion and data-at-rest protection, data integration approach, backup/archival/retention, and data loss prevention controls.

## 3.9 Auto Risk Flagging (Rules-Based, Explainable)

FR-24: Based on the Data Management and Cybersecurity information provided, the system shall automatically generate predefined risk flags to highlight potential security, data, availability, and governance risks prior to review and approval.

FR-25: The system shall categorise auto-generated risk flags at minimum into: Security Risk, Data Risk, Availability/Resilience Risk, and Governance Risk.

FR-26: For each auto-generated risk flag, the system shall display an explainable rationale describing which input triggered the flag and why it was raised.

FR-27: For submissions with High or Critical risk flags, the system shall require reviewers to explicitly acknowledge the risks as part of the approval process.

## 3.10 TOE Governance & Approval Controls

FR-28: Before allowing HLD approval, the system shall perform an automated TOE gap and alignment assessment against the submitted design.

FR-29: The system shall highlight gaps, deviations (including Available Not Preferred and Step-Out), and risk flags for reviewer visibility.

FR-30: The system shall require reviewers to explicitly acknowledge identified gaps, deviations, and risks before approving an HLD; the system shall not auto-block approval solely based on these findings.

## 3.11 Application Traceability & Version Lineage

FR-31: The system shall trace and validate the application name against existing approved and in-progress HLD records to prevent creation of duplicate unlinked HLD requests.

FR-32: If an application name matches an existing approved HLD, the system shall require the new HLD submission to be tagged as a child of the existing parent HLD, or require explicit justification to treat it as a new application.

FR-33: The system shall display clear application lineage, including parent--child relationships and associated HLD identifiers, to EA, ED, and CS reviewers during review and approval.

## 3.12 AI-Assisted Knowledge & FAQ Support

FR-34: The system shall provide an AI-assisted conversational agent (chatbot) within the myHLD portal to support users in querying Frequently Asked Questions (FAQ) and information related to approved HLDs.

FR-35: The AI agent shall allow users to search and retrieve information from approved HLD records using natural-language queries, including application name, HLD title, business division, landscape type, and workload type.

FR-36: The AI agent shall be integrated with existing myHLD FAQ and guidance content to provide consistent and authoritative responses.

FR-37: For responses related to approved HLDs or official guidance, the AI agent shall ensure responses are grounded on authoritative myHLD content and shall provide source references where applicable.

FR-38: The AI agent shall respect myHLD access controls and shall only return information the user is authorised to view; draft, rejected, or restricted HLDs shall not be exposed.

FR-39: The AI agent shall operate in a read-only advisory capacity and shall not modify, submit, approve, or bypass any myHLD governance processes.

# 4. Non-Functional Requirements

## 4.1 Performance Requirements

NFR-PERF-01: The system shall support concurrent users without performance degradation.

NFR-PERF-02: Diagram processing, diagram generation, and TOE analysis shall complete within acceptable enterprise response times.

## 4.2 Security Requirements

NFR-SEC-01: The system shall enforce role-based access control for authors and reviewers.

NFR-SEC-02: The system shall protect uploaded diagrams, generated diagrams, and submitted TOE/security/data information according to enterprise security policies.

## 4.3 Audit & Traceability Requirements

NFR-AUD-01: The system shall maintain a full audit trail of TOE authoring, analysis, risk flag generation, reviewer acknowledgement, and approval activities.

NFR-AUD-02: Audit logs shall include reviewer acknowledgements and approval/rejection decisions and shall be retained with the HLD artefact.

## 4.4 Usability Requirements

NFR-USE-01: The system shall present statuses, required fields, gaps, deviations, and risk flags in a clear and intuitive manner suitable for EA/ED/CS review.

NFR-USE-02: The absence of a manually uploaded diagram shall not block submission where template-based authoring is selected; the system shall provide appropriate guidance and fallback paths.

## 4.5 Governance & Resilience Requirements

NFR-GOV-01: Failure of AI-assisted analysis shall not block manual or template-based TOE authoring and submission.

NFR-GOV-02: The system shall preserve human accountability by ensuring all final architecture and approval decisions remain with authorised users.
