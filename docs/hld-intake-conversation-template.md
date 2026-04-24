# HLD Intake — Conversation Template

Use this template when chatting with the Bedrock Assistant in **HLD Intake** mode. Copy, fill in the blanks, and paste into the chat. You can send it all at once or break it into 2–3 messages.

The template covers all 30+ form fields across the 3 wizard steps. The AI will extract every value and prefill the form for you.

---

## Template (fill in the `[...]` placeholders)

### Message 1 — Registration & Application

```
I'm creating a [New Application HLD / Enhancement HLD] for [application name].
The HLD title is "[your HLD title]".
Description: [brief description of what this HLD covers].
It's a [ERP Application / Infrastructure / Non-ERP Application] on [Enterprise Cloud / On-Premise / SaaS],
for the [Corporate / Downstream / Gentari / PT & HSSE / Gas & Maritime / Upstream / Virtus IP / PDSB / MPM] division.

The application components are: [list components, e.g., Web Frontend, REST API, Database, Message Queue].
It integrates with: [list integrations with protocols, e.g., SAP via RFC, Azure AD via SAML 2.0, Salesforce via REST API].
```

### Message 2 — Data Management

```
Data classification is [Public / Internal / Confidential / Restricted].
For data-in-motion encryption we use [TLS 1.2 / TLS 1.3 / AES-256 / SHA-2 Hashing].
For data-at-rest encryption we use [Database encryption - TDE with AES-256 / Server-side encryption - AES-256].
Data integration approach is [API / ETL / Middleware].
Data retention period is [1 - 2 Years / 1 - 3 Years / 5 Years / 7 Years].
Data privacy compliance: [GDPR / ISO/IEC 27701 / PDPA].
Data loss prevention measures: [Data Classification / Detection Mechanism / Policy Declaration / Violation Remediation].
```

### Message 3 — Cybersecurity & Compliance

```
BIA ratings: Confidentiality is [Severe / Major / Moderate / Insignificant],
Integrity is [Severe / Major / Moderate / Insignificant],
Availability is [Severe / Major / Moderate / Insignificant],
Overall is [Severe / Major / Moderate / Insignificant].

HA strategy: [Secondary Server (Cloud and/or On-Premise) / Availability Zone (Cloud only) / Not Applicable].
DR strategy: [Replication Across (Cloud only) / Off-Site Replication (On-Prem Data Centre within 25km) / Not Applicable].

Connectivity protocols: [HTTP / HTTPS / SFTP / RSTP (Video) / SIP (Voice) / SSH / DNS (External) / DNS (Internal)].

Authentication approach: [SAML / OpenID 2.0 / OAuth 2.0 / WS-Federation].
Access control: [Role Based / Attribute Based / Context Based / Policy Based].
SSO: [Microsoft Entra ID / Custom Tailored / AWS LDAP / RADIUS / Azure B2B / Microsoft AD].
Key management: [Azure Key Vault / AWS KMS / Local Config].
Cross-domain identity: [SCIM 2.0].
Client/server auth: [JWT / Basic / Session].
Cloud access method: [API / SAS / Connection String / User/Password / Web Console].
Authorization approach: [User Access Matrix (Internal Users) / Security matrices restrict user access / Admin panel restricts user access].
Auth implementation: [Azure AD Authentication (Cloud AD) / Microsoft AD authentication (On-Prem AD) / User Access Matrix (Internal Users) / User Access Matrix (External Users) / Multi-factor Authentication (MFA) / Third-party Authentication (Consumer)].

Hardened endpoints: [Server / Laptop / Mobile Devices / Barcode Scanner / Workstation / Network Devices / IoT Devices / Kiosk / Bartec].
Endpoint protection: [MDE / McAfee / Intune].
Cybersecurity oversight: [Monitoring System / Notification alert and response].

Application development: [In-house / COTS / 3rd Party].
Secure app development: [DevSecOps / Security Assurance / Secure Communication / Security Configuration].
Application facing: [Internal Users / External Users (mandatory WAF) / Non-Human].

VAWA testing: [Quarterly / Pre and Post-production / Every 6 months].
DevSecOps testing: [VAPT / WSPT (API Penetration Testing) / WAPT (Web Application Penetration Testing)].

Perimeter security: [Firewall - Next Generation Firewall / IPS - Intrusion Prevention System / WAF - Web Application Firewall].
Network DLP: [Edge DLP - Data Loss Prevention].
Network connectivity: [PETRONET / WiFi (WPA3) / 5G / Local ISP / Secure VPN / Network Segmentation / IPSec / 4G / SDWAN].
PAM: [CyberArk / Xage / Jump Server].
```

---

## Example — Filled Template (Single Message)

This is a realistic example you can paste directly into the HLD Intake chat:

```
I'm creating a New Application HLD for Upstream Production Dashboard.
The HLD title is "Upstream Production Dashboard — Real-time Monitoring".
Description: Real-time production monitoring dashboard for upstream oil & gas operations with IoT sensor integration.
It's a Non-ERP Application on Enterprise Cloud, for the Upstream division.

The application components are: React Web Dashboard, Node.js API Gateway, IoT Data Ingestion Service, TimescaleDB, Redis Cache, Notification Service.
It integrates with: SAP PM via RFC, IoT Hub via MQTT/HTTPS, Azure AD via SAML 2.0, Email Service via SMTP.

Data classification is Confidential.
For data-in-motion encryption we use TLS 1.3 and AES-256.
For data-at-rest encryption we use Server-side encryption - AES-256.
Data integration approach is API and Middleware.
Data retention period is 7 Years.
Data privacy compliance: PDPA.
Data loss prevention measures: Data Classification, Detection Mechanism, and Policy Declaration.

BIA ratings: Confidentiality is Major, Integrity is Severe, Availability is Severe, Overall is Severe.
HA strategy: Availability Zone (Cloud only).
DR strategy: Replication Across (Cloud only).

Connectivity protocols: HTTPS, SSH, DNS (Internal).
Authentication approach: SAML and OAuth 2.0.
Access control: Role Based and Attribute Based.
SSO: Microsoft Entra ID.
Key management: AWS KMS.
Cross-domain identity: SCIM 2.0.
Client/server auth: JWT.
Cloud access method: API and Web Console.
Authorization: User Access Matrix (Internal Users).
Auth implementation: Azure AD Authentication (Cloud AD) and Multi-factor Authentication (MFA).

Hardened endpoints: Server, Laptop, IoT Devices.
Endpoint protection: MDE.
Cybersecurity oversight: Monitoring System and Notification alert and response.

Application development: In-house.
Secure app development: DevSecOps, Security Assurance, Secure Communication, Security Configuration.
Application facing: Internal Users.

VAWA testing: Quarterly.
DevSecOps testing: VAPT and WAPT (Web Application Penetration Testing).

Perimeter security: Firewall - Next Generation Firewall and WAF - Web Application Firewall.
Network DLP: Edge DLP - Data Loss Prevention.
Network connectivity: PETRONET and Secure VPN.
PAM: CyberArk.
```

---

## Field Reference (all 30+ fields)

| # | Step | Field | Type | Valid Options |
|---|------|-------|------|---------------|
| 1 | Registration | HLD Category | dropdown | New Application HLD, Enhancement HLD |
| 2 | Registration | Application | text | any application name |
| 3 | Registration | HLD Title | text | free text |
| 4 | Registration | HLD Description | text | free text |
| 5 | Registration | HLD Type | dropdown | ERP Application, Infrastructure, Non-ERP Application |
| 6 | Registration | Landscape Type | dropdown | Enterprise Cloud, On-Premise, SaaS |
| 7 | Registration | Business Division | dropdown | Corporate, Downstream, Gentari, PT & HSSE, Gas & Maritime, Upstream, Virtus IP, PDSB, MPM |
| 8 | App & Data | Application Components | text | free text (comma-separated) |
| 9 | App & Data | System Integrations | text | free text (describe with protocols) |
| 10 | App & Data | Data Classification | dropdown | Public, Internal, Confidential, Restricted |
| 11 | App & Data | Data-in-motion | multi-select | TLS 1.2, TLS 1.3, AES-256, SHA-2 Hashing |
| 12 | App & Data | Data-at-rest | multi-select | Database encryption - TDE with AES-256, Server-side encryption - AES-256 |
| 13 | App & Data | Data Integration | multi-select | API, ETL, Middleware |
| 14 | App & Data | Data Retention | dropdown | 1 - 2 Years, 1 - 3 Years, 5 Years, 7 Years |
| 15 | App & Data | Data Privacy | multi-select | GDPR, ISO/IEC 27701, PDPA |
| 16 | App & Data | Data Loss Prevention | multi-select | Data Classification, Detection Mechanism, Policy Declaration, Violation Remediation |
| 17 | Cybersecurity | BIA Confidentiality | dropdown | Severe, Major, Moderate, Insignificant |
| 18 | Cybersecurity | BIA Integrity | dropdown | Severe, Major, Moderate, Insignificant |
| 19 | Cybersecurity | BIA Availability | dropdown | Severe, Major, Moderate, Insignificant |
| 20 | Cybersecurity | BIA Overall | dropdown | Severe, Major, Moderate, Insignificant |
| 21 | Cybersecurity | HA | multi-select | Secondary Server (Cloud and/or On-Premise), Availability Zone (Cloud only), Not Applicable |
| 22 | Cybersecurity | DR | multi-select | Replication Across (Cloud only), Off-Site Replication (On-Prem Data Centre within 25km), Not Applicable |
| 23 | Cybersecurity | Connectivity | multi-select | HTTP, HTTPS, SFTP, RSTP (Video), SIP (Voice), SSH, DNS (External), DNS (Internal) |
| 24 | Cybersecurity | Authentication Approach | multi-select | SAML, OpenID 2.0, OAuth 2.0, WS-Federation |
| 25 | Cybersecurity | Access Control | multi-select | Role Based, Attribute Based, Context Based, Policy Based |
| 26 | Cybersecurity | SSO | multi-select | Microsoft Entra ID, Custom Tailored, AWS LDAP, RADIUS, Azure B2B, Microsoft AD |
| 27 | Cybersecurity | Key Management | multi-select | Azure Key Vault, AWS KMS, Local Config |
| 28 | Cybersecurity | Cross Domain Identity | multi-select | SCIM 2.0 |
| 29 | Cybersecurity | Client/Server Auth | multi-select | JWT, Basic, Session |
| 30 | Cybersecurity | Cloud Access Method | multi-select | API, SAS, Connection String, User/Password, Web Console |
| 31 | Cybersecurity | Authorization | multi-select | User Access Matrix (Internal Users), Security matrices restrict user access, Admin panel restricts user access |
| 32 | Cybersecurity | Auth Implementation | multi-select | Azure AD Authentication (Cloud AD), Microsoft AD authentication (On-Prem AD), User Access Matrix (Internal Users), User Access Matrix (External Users), Multi-factor Authentication (MFA), Third-party Authentication (Consumer) |
| 33 | Cybersecurity | Hardened Endpoint | multi-select | Server, Laptop, Mobile Devices, Barcode Scanner, Workstation, Network Devices, IoT Devices, Kiosk, Bartec |
| 34 | Cybersecurity | Endpoint Protection | multi-select | MDE, McAfee, Intune |
| 35 | Cybersecurity | Cybersecurity Oversight | multi-select | Monitoring System, Notification alert and response |
| 36 | Cybersecurity | App Development | multi-select | In-house, COTS, 3rd Party |
| 37 | Cybersecurity | Secure App Dev | multi-select | DevSecOps, Security Assurance, Secure Communication, Security Configuration |
| 38 | Cybersecurity | App Facing | multi-select | Internal Users, External Users (mandatory WAF), Non-Human |
| 39 | Cybersecurity | VAWA Testing | multi-select | Quarterly, Pre and Post-production, Every 6 months |
| 40 | Cybersecurity | DevSecOps Testing | multi-select | VAPT, WSPT (API Penetration Testing), WAPT (Web Application Penetration Testing) |
| 41 | Cybersecurity | Perimeter Security | multi-select | Firewall - Next Generation Firewall, IPS - Intrusion Prevention System, WAF - Web Application Firewall |
| 42 | Cybersecurity | Network DLP | multi-select | Edge DLP - Data Loss Prevention |
| 43 | Cybersecurity | Network Connectivity | multi-select | PETRONET, WiFi (WPA3), 5G, Local ISP, Secure VPN, Network Segmentation, IPSec, 4G, SDWAN |
| 44 | Cybersecurity | PAM | multi-select | CyberArk, Xage, Jump Server |
