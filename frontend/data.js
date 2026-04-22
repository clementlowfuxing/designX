// myHLD Portal MVP — Mock Data & Reference Data

const MOCK_APPLICATIONS = [
  { id: "APP-001", name: "SAP S/4HANA", division: "Corporate", landscape: "Enterprise Cloud" },
  { id: "APP-002", name: "PETRONAS eProcurement", division: "Downstream", landscape: "SaaS" },
  { id: "APP-003", name: "myHR Portal", division: "Corporate", landscape: "Enterprise Cloud" },
  { id: "APP-004", name: "Fleet Management System", division: "Gas & Maritime", landscape: "On-Premise" },
  { id: "APP-005", name: "PETRONAS Trading System", division: "Downstream", landscape: "Enterprise Cloud" },
  { id: "APP-006", name: "Upstream Production Dashboard", division: "Upstream", landscape: "Enterprise Cloud" },
  { id: "APP-007", name: "Gentari EV Charging Platform", division: "Gentari", landscape: "SaaS" },
  { id: "APP-008", name: "HSE Incident Reporting", division: "PT & HSSE", landscape: "Enterprise Cloud" },
  { id: "APP-009", name: "MPM Asset Tracker", division: "MPM", landscape: "On-Premise" },
  { id: "APP-010", name: "Virtus IP Management", division: "Virtus IP", landscape: "SaaS" }
];

const MOCK_HLD_HISTORY = {
  "APP-001": [
    { id: "HLD-2023-001", title: "SAP S/4HANA Migration to AWS", status: "Approved", date: "2023-06-15", type: "New Application HLD", version: "v1.0" },
    { id: "HLD-2024-012", title: "SAP S/4HANA — Fiori Launchpad Enhancement", status: "Approved", date: "2024-03-20", type: "Enhancement HLD", version: "v1.1", parentId: "HLD-2023-001" },
    { id: "HLD-2024-045", title: "SAP S/4HANA — BTP Integration", status: "In-Review", date: "2024-11-10", type: "Enhancement HLD", version: "v1.2", parentId: "HLD-2023-001" }
  ],
  "APP-002": [
    { id: "HLD-2022-008", title: "eProcurement SaaS Onboarding", status: "Approved", date: "2022-09-01", type: "New Application HLD", version: "v1.0" },
    { id: "HLD-2024-030", title: "eProcurement — Supplier Portal Enhancement", status: "Approved", date: "2024-07-15", type: "Enhancement HLD", version: "v1.1", parentId: "HLD-2022-008" }
  ],
  "APP-003": [
    { id: "HLD-2023-015", title: "myHR Portal Cloud Migration", status: "Approved", date: "2023-08-22", type: "New Application HLD", version: "v1.0" }
  ],
  "APP-004": [
    { id: "HLD-2021-003", title: "Fleet Management On-Prem Deployment", status: "Approved", date: "2021-04-10", type: "New Application HLD", version: "v1.0" },
    { id: "HLD-2023-028", title: "Fleet Management — GPS Tracking Module", status: "Approved", date: "2023-10-05", type: "Enhancement HLD", version: "v1.1", parentId: "HLD-2021-003" },
    { id: "HLD-2024-050", title: "Fleet Management — Cloud Migration", status: "Submitted", date: "2025-01-20", type: "Enhancement HLD", version: "v1.2", parentId: "HLD-2021-003" }
  ],
  "APP-005": [
    { id: "HLD-2024-002", title: "Trading System Re-architecture", status: "Approved", date: "2024-02-14", type: "New Application HLD", version: "v1.0" }
  ],
  "APP-006": [
    { id: "HLD-2023-040", title: "Upstream Production Dashboard", status: "Approved", date: "2023-12-01", type: "New Application HLD", version: "v1.0" }
  ],
  "APP-007": [
    { id: "HLD-2024-018", title: "Gentari EV Charging Platform", status: "Approved", date: "2024-05-30", type: "New Application HLD", version: "v1.0" }
  ],
  "APP-008": [
    { id: "HLD-2022-020", title: "HSE Incident Reporting System", status: "Approved", date: "2022-11-15", type: "New Application HLD", version: "v1.0" }
  ],
  "APP-009": [
    { id: "HLD-2020-005", title: "MPM Asset Tracker Deployment", status: "Approved", date: "2020-07-20", type: "New Application HLD", version: "v1.0" }
  ],
  "APP-010": [
    { id: "HLD-2024-035", title: "Virtus IP Management Portal", status: "In-Review", date: "2024-09-12", type: "New Application HLD", version: "v1.0" }
  ]
};

const MOCK_DASHBOARD_HLDS = [
  { id: "HLD-2025-001", title: "SAP S/4HANA — Advanced Analytics Module", app: "SAP S/4HANA", division: "Corporate", status: "Submitted", date: "2025-04-10", author: "Ahmad Razif" },
  { id: "HLD-2024-050", title: "Fleet Management — Cloud Migration", app: "Fleet Management System", division: "Gas & Maritime", status: "Submitted", date: "2025-01-20", author: "Nurul Aisyah" },
  { id: "HLD-2024-045", title: "SAP S/4HANA — BTP Integration", app: "SAP S/4HANA", division: "Corporate", status: "In-Review", date: "2024-11-10", author: "Lee Wei Ming" },
  { id: "HLD-2024-035", title: "Virtus IP Management Portal", app: "Virtus IP Management", division: "Virtus IP", status: "In-Review", date: "2024-09-12", author: "Siti Aminah" },
  { id: "HLD-2024-030", title: "eProcurement — Supplier Portal Enhancement", app: "PETRONAS eProcurement", division: "Downstream", status: "Approved", date: "2024-07-15", author: "Raj Kumar" },
  { id: "HLD-2024-018", title: "Gentari EV Charging Platform", app: "Gentari EV Charging Platform", division: "Gentari", status: "Approved", date: "2024-05-30", author: "Tan Mei Ling" },
  { id: "HLD-2024-012", title: "SAP S/4HANA — Fiori Launchpad Enhancement", app: "SAP S/4HANA", division: "Corporate", status: "Approved", date: "2024-03-20", author: "Faizal Hakim" },
  { id: "HLD-2024-002", title: "Trading System Re-architecture", app: "PETRONAS Trading System", division: "Downstream", status: "Approved", date: "2024-02-14", author: "Wong Jia Hao" }
];

const HLD_CATEGORIES = ["New Application HLD", "Enhancement HLD"];

const HLD_TYPES = ["ERP Application", "Infrastructure", "Non-ERP Application"];

const LANDSCAPE_TYPES = ["Enterprise Cloud", "On-Premise", "SaaS"];

const BUSINESS_DIVISIONS = [
  "Corporate", "Downstream", "Gentari", "PT & HSSE",
  "Gas & Maritime", "Upstream", "Virtus IP", "PDSB", "MPM"
];

const BIA_RATINGS = ["Severe", "Major", "Moderate", "Insignificant"];

const SECURITY_FIELDS = {
  connectivity: {
    label: "Connectivity Protocols",
    options: ["HTTP", "HTTPS", "SFTP", "RSTP (Video)", "SIP (Voice)", "SSH", "DNS (External)", "DNS (Internal)"]
  },
  iam: {
    label: "Identity and Access Management (IAM)",
    sections: {
      authenticationApproach: { label: "Authentication Approach", options: ["SAML", "OpenID 2.0", "OAuth 2.0", "WS-Federation"] },
      accessControl: { label: "Access Control", options: ["Role Based", "Attribute Based", "Context Based", "Policy Based"] },
      sso: { label: "Single Sign-On (SSO)", options: ["Microsoft Entra ID", "Custom Tailored", "AWS LDAP", "RADIUS", "Azure B2B", "Microsoft AD"] },
      keyManagement: { label: "Key / Password Management", options: ["Azure Key Vault", "AWS KMS", "Local Config"] },
      crossDomain: { label: "Cross Domain Identity Protocol", options: ["SCIM 2.0"] },
      clientServerAuth: { label: "Client / Server Authentication Method", options: ["JWT", "Basic", "Session"] },
      cloudAccess: { label: "Cloud Resources Access Method", options: ["API", "SAS", "Connection String", "User/Password", "Web Console"] },
      authorization: { label: "Authorization Approach", options: ["User Access Matrix (Internal Users)", "Security matrices restrict user access", "Admin panel restricts user access"] },
      authImplementation: { label: "Authentication Implementation", options: ["Azure AD Authentication (Cloud AD)", "Microsoft AD authentication (On-Prem AD)", "User Access Matrix (Internal Users)", "User Access Matrix (External Users)", "Multi-factor Authentication (MFA)", "Third-party Authentication (Consumer)"] }
    }
  },
  endpoint: {
    label: "Endpoint Security",
    sections: {
      hardenedEndpoint: { label: "Hardened Endpoint", options: ["Server", "Laptop", "Mobile Devices", "Barcode Scanner", "Workstation", "Network Devices", "IoT Devices", "Kiosk", "Bartec"] },
      endpointProtection: { label: "Endpoint Protection", options: ["MDE", "McAfee", "Intune"] },
      cybersecurityOversight: { label: "Cybersecurity Oversight", options: ["Monitoring System", "Notification alert and response"] }
    }
  },
  applicationSecurity: {
    label: "Application Security",
    sections: {
      appDevelopment: { label: "Application Development", options: ["In-house", "COTS", "3rd Party"] },
      secureAppDev: { label: "Secure Application Development", options: ["DevSecOps", "Security Assurance", "Secure Communication", "Security Configuration"] },
      appFacing: { label: "Application Facing", options: ["Internal Users", "External Users (mandatory WAF)", "Non-Human"] }
    }
  },
  dataEncryption: {
    label: "Data Encryption Approach",
    sections: {
      dataInMotion: { label: "Data-in-motion", options: ["TLS 1.2", "TLS 1.3", "AES-256", "SHA-2 Hashing"] },
      dataAtRest: { label: "Data-at-rest", options: ["Database encryption - TDE with AES-256", "Server-side encryption - AES-256"] },
      dataIntegration: { label: "Data Integration", options: ["API", "ETL", "Middleware"] },
      dataRetention: { label: "Data Retention", options: ["1 - 2 Years", "1 - 3 Years", "5 Years", "7 Years"] },
      dataPrivacy: { label: "Data Privacy", options: ["GDPR", "ISO/IEC 27701", "PDPA"] },
      dataLossPrevention: { label: "Data Loss Prevention", options: ["Data Classification", "Detection Mechanism", "Policy Declaration", "Violation Remediation"] },
      cryptographicServices: { label: "Cryptographic Services", options: ["Certificate Management", "Key Management", "Secret Management"] }
    }
  },
  securityTesting: {
    label: "Security Testing Approach",
    sections: {
      vawa: { label: "Vulnerability Assessment + Web Assessment (VAWA)", options: ["Quarterly", "Pre and Post-production", "Every 6 months"] },
      devSecOps: { label: "Dev Sec Ops", options: ["VAPT", "WSPT (API Penetration Testing)", "WAPT (Web Application Penetration Testing)"] }
    }
  },
  networkSecurity: {
    label: "Network Security",
    sections: {
      perimeterSecurity: { label: "Perimeter Security", options: ["Firewall - Next Generation Firewall", "IPS - Intrusion Prevention System", "WAF - Web Application Firewall"] },
      networkDLP: { label: "Data Loss Prevention", options: ["Edge DLP - Data Loss Prevention"] },
      networkConnectivity: { label: "Network Connectivity", options: ["PETRONET", "WiFi (WPA3)", "5G", "Local ISP", "Secure VPN", "Network Segmentation", "IPSec", "4G", "SDWAN"] },
      pam: { label: "Privileged Access Management (PAM)", options: ["CyberArk", "Xage", "Jump Server"] }
    }
  }
};

const HA_OPTIONS = ["Secondary Server (Cloud and/or On-Premise)", "Availability Zone (Cloud only)", "Not Applicable"];
const DR_OPTIONS = ["Replication Across (Cloud only)", "Off-Site Replication (On-Prem Data Centre within 25km)", "Not Applicable"];
const ADDITIONAL_COMPONENTS = ["IGA Onboarding", "Others"];

// ── Mock saved HLD details (for prefill & detail view) ──
const MOCK_HLD_DETAILS = {
  "HLD-2025-001": {
    registration: { category: "Enhancement HLD", application: "SAP S/4HANA", title: "SAP S/4HANA — Advanced Analytics Module", description: "Adding advanced analytics capabilities to the existing SAP S/4HANA deployment for real-time business intelligence.", hldType: "ERP Application", landscape: "Enterprise Cloud", division: "Corporate", capabilityCategory: "8.0", capabilitySubprocess: "8.1" },
    applicationData: { components: "SAP S/4HANA Core, SAP Analytics Cloud, SAP BW/4HANA, Fiori Launchpad, OData Services", integrations: "SAP BW via RFC, SAP Analytics Cloud via HTTPS REST API, Microsoft Power BI via OData, Azure AD via SAML 2.0", dataClassification: "Confidential", dataInMotion: ["TLS 1.2", "AES-256"], dataAtRest: ["Database encryption - TDE with AES-256"], dataIntegration: ["API", "ETL"], dataRetention: "7 Years", dataPrivacy: ["PDPA"], dataLossPrevention: ["Data Classification", "Detection Mechanism"] },
    cybersecurity: { bia: { confidentiality: "Major", integrity: "Major", availability: "Severe", overall: "Severe" }, ha: ["Availability Zone (Cloud only)"], dr: ["Replication Across (Cloud only)"], connectivity: ["HTTPS", "SFTP", "SSH"], iam: { authenticationApproach: ["SAML", "OAuth 2.0"], accessControl: ["Role Based"], sso: ["Microsoft Entra ID"], keyManagement: ["Azure Key Vault"], crossDomain: ["SCIM 2.0"], clientServerAuth: ["JWT"], cloudAccess: ["API", "Web Console"], authorization: ["User Access Matrix (Internal Users)"], authImplementation: ["Azure AD Authentication (Cloud AD)", "Multi-factor Authentication (MFA)"] }, endpoint: { hardenedEndpoint: ["Server", "Laptop"], endpointProtection: ["MDE"], cybersecurityOversight: ["Monitoring System", "Notification alert and response"] }, applicationSecurity: { appDevelopment: ["COTS"], secureAppDev: ["Security Assurance", "Secure Communication"], appFacing: ["Internal Users"] }, securityTesting: { vawa: ["Quarterly"], devSecOps: ["VAPT", "WAPT (Web Application Penetration Testing)"] }, networkSecurity: { perimeterSecurity: ["Firewall - Next Generation Firewall", "WAF - Web Application Firewall"], networkDLP: ["Edge DLP - Data Loss Prevention"], networkConnectivity: ["PETRONET", "Secure VPN"], pam: ["CyberArk"] } },
    aiResults: { mermaidDiagram: "graph TD\n  A[Fiori Launchpad] -->|HTTPS| B[SAP S/4HANA Core]\n  B -->|RFC| C[SAP BW/4HANA]\n  C -->|HTTPS REST| D[SAP Analytics Cloud]\n  D -->|OData| E[Power BI]\n  B -->|SAML 2.0| F[Azure AD]", integrations: [{ source: "Fiori Launchpad", target: "SAP S/4HANA Core", protocol: "HTTPS", type: "UI Layer", direction: "Bidirectional" }, { source: "SAP S/4HANA", target: "SAP BW/4HANA", protocol: "RFC", type: "ETL", direction: "Outbound" }, { source: "SAP BW/4HANA", target: "SAP Analytics Cloud", protocol: "HTTPS REST", type: "API", direction: "Outbound" }], toeClassification: [{ component: "SAP S/4HANA", category: "ERP", classification: "TOE Default", notes: "Standard enterprise ERP" }, { component: "SAP Analytics Cloud", category: "Analytics", classification: "TOE Default", notes: "" }, { component: "Power BI", category: "BI Tool", classification: "Available Not Preferred", notes: "Consider SAC as primary" }], riskFlags: [{ severity: "Medium", confidence: 72, title: "Dual BI Tool Usage", rationale: "Both SAP Analytics Cloud and Power BI are used — may cause data inconsistency." }], recommendations: [{ title: "Consolidate BI Tools", text: "Consider standardizing on SAP Analytics Cloud to reduce integration complexity." }] }
  },
  "HLD-2024-050": {
    registration: { category: "Enhancement HLD", application: "Fleet Management System", title: "Fleet Management — Cloud Migration", description: "Migrating the on-premise Fleet Management System to AWS cloud infrastructure.", hldType: "Non-ERP Application", landscape: "Enterprise Cloud", division: "Gas & Maritime", capabilityCategory: "10.0", capabilitySubprocess: "10.1" },
    applicationData: { components: "Fleet Tracking Service, GPS Data Ingestion, Route Optimization Engine, Driver Portal, Admin Dashboard", integrations: "GPS Provider via SFTP, SAP PM via RFC, PETRONAS LDAP via LDAPS, Notification Service via HTTPS", dataClassification: "Internal", dataInMotion: ["TLS 1.3"], dataAtRest: ["Server-side encryption - AES-256"], dataIntegration: ["API", "Middleware"], dataRetention: "5 Years", dataPrivacy: ["PDPA"], dataLossPrevention: ["Data Classification", "Policy Declaration"] },
    cybersecurity: { bia: { confidentiality: "Moderate", integrity: "Major", availability: "Major", overall: "Major" }, ha: ["Availability Zone (Cloud only)"], dr: ["Replication Across (Cloud only)"], connectivity: ["HTTPS", "SFTP", "SSH", "DNS (Internal)"], iam: { authenticationApproach: ["OAuth 2.0"], accessControl: ["Role Based"], sso: ["Microsoft Entra ID"], keyManagement: ["AWS KMS"], crossDomain: [], clientServerAuth: ["JWT"], cloudAccess: ["API", "Web Console"], authorization: ["User Access Matrix (Internal Users)"], authImplementation: ["Azure AD Authentication (Cloud AD)", "Multi-factor Authentication (MFA)"] }, endpoint: { hardenedEndpoint: ["Server", "Mobile Devices"], endpointProtection: ["MDE", "Intune"], cybersecurityOversight: ["Monitoring System"] }, applicationSecurity: { appDevelopment: ["In-house"], secureAppDev: ["DevSecOps", "Secure Communication", "Security Configuration"], appFacing: ["Internal Users"] }, securityTesting: { vawa: ["Pre and Post-production"], devSecOps: ["VAPT"] }, networkSecurity: { perimeterSecurity: ["Firewall - Next Generation Firewall"], networkDLP: [], networkConnectivity: ["PETRONET", "Secure VPN", "4G"], pam: ["Jump Server"] } },
    aiResults: null
  },
  "HLD-2024-045": {
    registration: { category: "Enhancement HLD", application: "SAP S/4HANA", title: "SAP S/4HANA — BTP Integration", description: "Integrating SAP Business Technology Platform with existing S/4HANA landscape.", hldType: "ERP Application", landscape: "Enterprise Cloud", division: "Corporate", capabilityCategory: "8.0", capabilitySubprocess: "8.2" },
    applicationData: { components: "SAP S/4HANA Core, SAP BTP, Cloud Foundry Runtime, SAP Integration Suite, SAP HANA Cloud", integrations: "SAP S/4HANA via OData, SAP Integration Suite via HTTPS, Azure AD via SAML 2.0, SAP Event Mesh via AMQP", dataClassification: "Confidential", dataInMotion: ["TLS 1.2", "AES-256"], dataAtRest: ["Database encryption - TDE with AES-256"], dataIntegration: ["API", "Middleware"], dataRetention: "7 Years", dataPrivacy: ["PDPA"], dataLossPrevention: ["Data Classification", "Detection Mechanism", "Policy Declaration"] },
    cybersecurity: { bia: { confidentiality: "Major", integrity: "Major", availability: "Severe", overall: "Severe" }, ha: ["Availability Zone (Cloud only)"], dr: ["Replication Across (Cloud only)"], connectivity: ["HTTPS", "SSH"], iam: { authenticationApproach: ["SAML", "OAuth 2.0"], accessControl: ["Role Based", "Attribute Based"], sso: ["Microsoft Entra ID"], keyManagement: ["Azure Key Vault"], crossDomain: ["SCIM 2.0"], clientServerAuth: ["JWT"], cloudAccess: ["API", "Web Console"], authorization: ["User Access Matrix (Internal Users)"], authImplementation: ["Azure AD Authentication (Cloud AD)", "Multi-factor Authentication (MFA)"] }, endpoint: { hardenedEndpoint: ["Server", "Laptop"], endpointProtection: ["MDE"], cybersecurityOversight: ["Monitoring System", "Notification alert and response"] }, applicationSecurity: { appDevelopment: ["COTS", "3rd Party"], secureAppDev: ["DevSecOps", "Security Assurance", "Secure Communication"], appFacing: ["Internal Users"] }, securityTesting: { vawa: ["Quarterly"], devSecOps: ["VAPT", "WAPT (Web Application Penetration Testing)"] }, networkSecurity: { perimeterSecurity: ["Firewall - Next Generation Firewall", "WAF - Web Application Firewall"], networkDLP: ["Edge DLP - Data Loss Prevention"], networkConnectivity: ["PETRONET", "Secure VPN"], pam: ["CyberArk"] } },
    aiResults: { mermaidDiagram: "graph TD\n  A[SAP S/4HANA] -->|OData| B[SAP Integration Suite]\n  B -->|HTTPS| C[SAP BTP - Cloud Foundry]\n  C -->|AMQP| D[SAP Event Mesh]\n  A -->|SAML 2.0| E[Azure AD]", integrations: [{ source: "SAP S/4HANA", target: "SAP Integration Suite", protocol: "OData", type: "API", direction: "Bidirectional" }, { source: "SAP Integration Suite", target: "SAP BTP", protocol: "HTTPS", type: "API", direction: "Outbound" }], toeClassification: [{ component: "SAP BTP", category: "PaaS", classification: "TOE Default", notes: "" }, { component: "SAP Event Mesh", category: "Messaging", classification: "TOE Default", notes: "" }], riskFlags: [{ severity: "Low", confidence: 65, title: "Multi-runtime Complexity", rationale: "Cloud Foundry and HANA Cloud add operational overhead." }], recommendations: [{ title: "Standardize Runtime", text: "Consider consolidating on Cloud Foundry for all custom extensions." }] }
  },
  "HLD-2024-035": {
    registration: { category: "New Application HLD", application: "Virtus IP Management", title: "Virtus IP Management Portal", description: "New portal for managing intellectual property assets across PETRONAS.", hldType: "Non-ERP Application", landscape: "SaaS", division: "Virtus IP", capabilityCategory: "7.0", capabilitySubprocess: "7.1" },
    applicationData: { components: "IP Registry Portal, Document Management, Workflow Engine, Reporting Dashboard", integrations: "Microsoft 365 via Graph API, SAP via RFC, Azure AD via SAML 2.0", dataClassification: "Restricted", dataInMotion: ["TLS 1.3"], dataAtRest: ["Server-side encryption - AES-256"], dataIntegration: ["API"], dataRetention: "7 Years", dataPrivacy: ["PDPA"], dataLossPrevention: ["Data Classification", "Detection Mechanism", "Policy Declaration", "Violation Remediation"] },
    cybersecurity: { bia: { confidentiality: "Severe", integrity: "Major", availability: "Moderate", overall: "Severe" }, ha: ["Secondary Server (Cloud and/or On-Premise)"], dr: ["Off-Site Replication (On-Prem Data Centre within 25km)"], connectivity: ["HTTPS"], iam: { authenticationApproach: ["SAML", "OpenID 2.0"], accessControl: ["Role Based", "Policy Based"], sso: ["Microsoft Entra ID"], keyManagement: ["Azure Key Vault"], crossDomain: [], clientServerAuth: ["JWT"], cloudAccess: ["API", "Web Console"], authorization: ["User Access Matrix (Internal Users)", "Admin panel restricts user access"], authImplementation: ["Azure AD Authentication (Cloud AD)", "Multi-factor Authentication (MFA)"] }, endpoint: { hardenedEndpoint: ["Laptop", "Workstation"], endpointProtection: ["MDE"], cybersecurityOversight: ["Monitoring System"] }, applicationSecurity: { appDevelopment: ["3rd Party"], secureAppDev: ["Security Assurance", "Secure Communication", "Security Configuration"], appFacing: ["Internal Users"] }, securityTesting: { vawa: ["Pre and Post-production"], devSecOps: ["VAPT", "WAPT (Web Application Penetration Testing)"] }, networkSecurity: { perimeterSecurity: ["Firewall - Next Generation Firewall", "WAF - Web Application Firewall"], networkDLP: ["Edge DLP - Data Loss Prevention"], networkConnectivity: ["PETRONET"], pam: ["CyberArk"] } },
    aiResults: null
  },
  "HLD-2024-030": {
    registration: { category: "Enhancement HLD", application: "PETRONAS eProcurement", title: "eProcurement — Supplier Portal Enhancement", description: "Enhancing the supplier portal with self-service capabilities.", hldType: "Non-ERP Application", landscape: "SaaS", division: "Downstream", capabilityCategory: "9.0", capabilitySubprocess: "9.1" },
    applicationData: { components: "Supplier Portal, Procurement Engine, Invoice Processing, Vendor Onboarding", integrations: "SAP MM via RFC, DocuSign via REST API, Azure AD via SAML 2.0", dataClassification: "Confidential", dataInMotion: ["TLS 1.2"], dataAtRest: ["Database encryption - TDE with AES-256"], dataIntegration: ["API", "ETL"], dataRetention: "5 Years", dataPrivacy: ["PDPA"], dataLossPrevention: ["Data Classification", "Policy Declaration"] },
    cybersecurity: { bia: { confidentiality: "Major", integrity: "Major", availability: "Major", overall: "Major" }, ha: ["Availability Zone (Cloud only)"], dr: ["Replication Across (Cloud only)"], connectivity: ["HTTPS", "SFTP"], iam: { authenticationApproach: ["SAML"], accessControl: ["Role Based"], sso: ["Microsoft Entra ID"], keyManagement: ["Azure Key Vault"], crossDomain: [], clientServerAuth: ["JWT"], cloudAccess: ["API", "Web Console"], authorization: ["User Access Matrix (Internal Users)", "User Access Matrix (External Users)"], authImplementation: ["Azure AD Authentication (Cloud AD)", "Multi-factor Authentication (MFA)"] }, endpoint: { hardenedEndpoint: ["Server", "Laptop"], endpointProtection: ["MDE"], cybersecurityOversight: ["Monitoring System"] }, applicationSecurity: { appDevelopment: ["3rd Party"], secureAppDev: ["Security Assurance", "Secure Communication"], appFacing: ["Internal Users", "External Users (mandatory WAF)"] }, securityTesting: { vawa: ["Quarterly"], devSecOps: ["VAPT", "WSPT (API Penetration Testing)"] }, networkSecurity: { perimeterSecurity: ["Firewall - Next Generation Firewall", "WAF - Web Application Firewall"], networkDLP: [], networkConnectivity: ["PETRONET", "Secure VPN"], pam: ["CyberArk"] } },
    aiResults: null
  }
};
