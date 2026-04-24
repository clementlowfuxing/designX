// myHLD Portal MVP — Application Logic
// LAMBDA_URL will be replaced by deploy.sh
const LAMBDA_URL = "https://1baqekfcrh.execute-api.ap-southeast-1.amazonaws.com/generate";

let apqcData = null;
let currentStep = 1;

// ── Initialization ──
document.addEventListener("DOMContentLoaded", async () => {
  mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose" });
  await loadAPQCData();
  populateDropdowns();
  populateDashboard();
  populateSecurityCheckboxes();
});

async function loadAPQCData() {
  try {
    const resp = await fetch("apqc_capabilities.json");
    apqcData = await resp.json();
  } catch (e) {
    console.warn("APQC data not found, using fallback");
    apqcData = { categories: [], level1: [] };
  }
}

// ── Dashboard ──
function populateDashboard() {
  const tbody = document.getElementById("hld-table-body");
  tbody.innerHTML = "";
  MOCK_DASHBOARD_HLDS.forEach(hld => {
    const tr = document.createElement("tr");
    const hasDetail = !!MOCK_HLD_DETAILS[hld.id];
    if (hasDetail) tr.classList.add("clickable-row");
    tr.innerHTML = `
      <td>${hld.id}</td>
      <td>${hld.title}</td>
      <td>${hld.app}</td>
      <td>${hld.division}</td>
      <td><span class="status-badge ${hld.status}">${hld.status}</span></td>
      <td>${hld.date}</td>
      <td>${hld.author}</td>`;
    if (hasDetail) {
      tr.setAttribute("role", "link");
      tr.setAttribute("aria-label", `View details for ${hld.title}`);
      tr.addEventListener("click", () => showHLDDetail(hld.id));
    }
    tbody.appendChild(tr);
  });

  const all = MOCK_DASHBOARD_HLDS.length;
  const submitted = MOCK_DASHBOARD_HLDS.filter(h => h.status === "Submitted").length;
  const inReview = MOCK_DASHBOARD_HLDS.filter(h => h.status === "In-Review").length;
  const approved = MOCK_DASHBOARD_HLDS.filter(h => h.status === "Approved").length;
  document.getElementById("count-all").textContent = all;
  document.getElementById("count-submitted").textContent = submitted;
  document.getElementById("count-inreview").textContent = inReview;
  document.getElementById("count-approved").textContent = approved;
}

function populateDropdowns() {
  // Business Divisions
  const divSelect = document.getElementById("hld-division");
  BUSINESS_DIVISIONS.forEach(d => {
    divSelect.innerHTML += `<option value="${d}">${d}</option>`;
  });

  // Applications
  const appSelect = document.getElementById("hld-application");
  MOCK_APPLICATIONS.forEach(app => {
    appSelect.innerHTML += `<option value="${app.id}">${app.name}</option>`;
  });

  // APQC Categories
  const capCatSelect = document.getElementById("hld-capability-cat");
  if (apqcData) {
    apqcData.categories.forEach(c => {
      capCatSelect.innerHTML += `<option value="${c.id}">${c.id} - ${c.name}</option>`;
    });
  }

  // BIA Ratings
  ["bia-confidentiality", "bia-integrity", "bia-availability", "bia-overall"].forEach(id => {
    const sel = document.getElementById(id);
    BIA_RATINGS.forEach(r => { sel.innerHTML += `<option value="${r}">${r}</option>`; });
  });
}

function populateSecurityCheckboxes() {
  // Connectivity
  renderCheckboxGroup("sec-connectivity", SECURITY_FIELDS.connectivity.options);

  // IAM sections
  renderSectionedCheckboxes("sec-iam-container", SECURITY_FIELDS.iam.sections);

  // Endpoint sections
  renderSectionedCheckboxes("sec-endpoint-container", SECURITY_FIELDS.endpoint.sections);

  // Application Security sections
  renderSectionedCheckboxes("sec-appsec-container", SECURITY_FIELDS.applicationSecurity.sections);

  // Data encryption — handled in Step 2
  renderCheckboxGroup("data-in-motion", SECURITY_FIELDS.dataEncryption.sections.dataInMotion.options);
  renderCheckboxGroup("data-at-rest", SECURITY_FIELDS.dataEncryption.sections.dataAtRest.options);
  renderCheckboxGroup("data-integration", SECURITY_FIELDS.dataEncryption.sections.dataIntegration.options);
  renderCheckboxGroup("data-privacy", SECURITY_FIELDS.dataEncryption.sections.dataPrivacy.options);
  renderCheckboxGroup("data-dlp", SECURITY_FIELDS.dataEncryption.sections.dataLossPrevention.options);

  // Security Testing sections
  renderSectionedCheckboxes("sec-testing-container", SECURITY_FIELDS.securityTesting.sections);

  // Network Security sections
  renderSectionedCheckboxes("sec-network-container", SECURITY_FIELDS.networkSecurity.sections);

  // HA/DR
  renderCheckboxGroup("ha-options", HA_OPTIONS);
  renderCheckboxGroup("dr-options", DR_OPTIONS);
}

function renderCheckboxGroup(containerId, options) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = options.map((opt, i) =>
    `<label><input type="checkbox" name="${containerId}" value="${opt}"><span>${opt}</span></label>`
  ).join("");
}

function renderSectionedCheckboxes(containerId, sections) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let html = '<div class="form-grid">';
  Object.entries(sections).forEach(([key, section]) => {
    html += `<div class="form-group"><label>${section.label}</label><div class="checkbox-group" id="sec-${key}"></div></div>`;
  });
  html += '</div>';
  container.innerHTML = html;
  Object.entries(sections).forEach(([key, section]) => {
    renderCheckboxGroup(`sec-${key}`, section.options);
  });
}

// ── View Switching ──
function showDashboard() {
  document.getElementById("dashboard-view").classList.add("active");
  document.getElementById("wizard-view").classList.remove("active");
  document.getElementById("detail-view").classList.remove("active");
  hideChatbot();
}

function showCreateHLD() {
  document.getElementById("dashboard-view").classList.remove("active");
  document.getElementById("wizard-view").classList.add("active");
  document.getElementById("detail-view").classList.remove("active");
  goToStep(1);
  showChatbotFAB();
}

function goToStep(step) {
  currentStep = step;
  document.querySelectorAll(".step-panel").forEach(p => p.classList.remove("active"));
  document.getElementById(`step-${step}`).classList.add("active");

  document.querySelectorAll(".step-indicator").forEach(ind => {
    const s = parseInt(ind.dataset.step);
    ind.classList.remove("active", "completed");
    if (s === step) ind.classList.add("active");
    else if (s < step) ind.classList.add("completed");
    ind.setAttribute("aria-selected", s === step ? "true" : "false");
  });
}

// ── HLD Category Change ──
function onHLDCategoryChange() {
  const cat = document.getElementById("hld-category").value;
  const appRequired = document.getElementById("app-required");
  const appSelect = document.getElementById("hld-application");
  if (cat === "Enhancement HLD") {
    appRequired.style.display = "inline";
    appSelect.required = true;
    // Trigger prefill if app already selected
    const appId = appSelect.value;
    if (appId && appId !== "__new__" && MOCK_HLD_HISTORY[appId]) {
      prefillFromPriorHLD(appId);
    }
  } else {
    appRequired.style.display = "none";
    appSelect.required = false;
    clearPrefill();
  }
}

// ── Application Change ──
function onApplicationChange() {
  const appId = document.getElementById("hld-application").value;
  const newAppInput = document.getElementById("hld-new-app-name");
  const lineageContainer = document.getElementById("hld-lineage-container");
  const lineageDiv = document.getElementById("hld-lineage");

  if (appId === "__new__") {
    newAppInput.style.display = "block";
    lineageContainer.style.display = "none";
    clearPrefill();
    return;
  }
  newAppInput.style.display = "none";

  if (appId && MOCK_HLD_HISTORY[appId]) {
    const history = MOCK_HLD_HISTORY[appId];
    lineageContainer.style.display = "block";
    lineageDiv.innerHTML = history.map(h => `
      <div class="lineage-item">
        <span class="lineage-id">${h.id} (${h.version})</span>
        <span class="lineage-title">${h.title}</span>
        <span class="lineage-meta"><span class="status-badge ${h.status}">${h.status}</span> ${h.date}</span>
      </div>
    `).join("");

    // FR-NEW-01: Prefill for Enhancement HLD
    const cat = document.getElementById("hld-category").value;
    if (cat === "Enhancement HLD") {
      prefillFromPriorHLD(appId);
    }
  } else {
    lineageContainer.style.display = "none";
    clearPrefill();
  }
}

// ── APQC Capability Cascade ──
function onCapabilityCategoryChange() {
  const catId = document.getElementById("hld-capability-cat").value;
  const subSelect = document.getElementById("hld-capability-sub");
  subSelect.innerHTML = '<option value="">Select sub-process...</option>';
  if (!catId || !apqcData) { subSelect.disabled = true; return; }
  const subs = apqcData.level1.filter(l => l.parent === catId);
  subs.forEach(s => {
    subSelect.innerHTML += `<option value="${s.id}">${s.id} - ${s.name}</option>`;
  });
  subSelect.disabled = subs.length === 0;
}

// ── BIA Availability triggers HA/DR ──
function onBIAAvailabilityChange() {
  const val = document.getElementById("bia-availability").value;
  const section = document.getElementById("ha-dr-section");
  section.style.display = (val === "Major" || val === "Severe") ? "block" : "none";
}

// ── Collect Form Data ──
function collectFormData() {
  const getChecked = (name) => Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value);
  const getCheckedFromId = (id) => Array.from(document.querySelectorAll(`#${id} input:checked`)).map(cb => cb.value);

  const appId = document.getElementById("hld-application").value;
  const app = MOCK_APPLICATIONS.find(a => a.id === appId);
  const appName = appId === "__new__" ? document.getElementById("hld-new-app-name").value : (app ? app.name : "");

  return {
    registration: {
      category: document.getElementById("hld-category").value,
      application: appName,
      title: document.getElementById("hld-title").value,
      description: document.getElementById("hld-description").value,
      hldType: document.getElementById("hld-type").value,
      landscape: document.getElementById("hld-landscape").value,
      division: document.getElementById("hld-division").value,
      capabilityCategory: document.getElementById("hld-capability-cat").value,
      capabilitySubprocess: document.getElementById("hld-capability-sub").value
    },
    applicationData: {
      components: document.getElementById("app-components").value,
      integrations: document.getElementById("app-integrations").value,
      dataClassification: document.getElementById("data-classification").value,
      dataInMotion: getChecked("data-in-motion"),
      dataAtRest: getChecked("data-at-rest"),
      dataIntegration: getChecked("data-integration"),
      dataRetention: document.getElementById("data-retention").value,
      dataPrivacy: getChecked("data-privacy"),
      dataLossPrevention: getChecked("data-dlp")
    },
    cybersecurity: {
      bia: {
        confidentiality: document.getElementById("bia-confidentiality").value,
        integrity: document.getElementById("bia-integrity").value,
        availability: document.getElementById("bia-availability").value,
        overall: document.getElementById("bia-overall").value
      },
      ha: getChecked("ha-options"),
      dr: getChecked("dr-options"),
      connectivity: getChecked("sec-connectivity"),
      iam: {
        authenticationApproach: getCheckedFromId("sec-authenticationApproach"),
        accessControl: getCheckedFromId("sec-accessControl"),
        sso: getCheckedFromId("sec-sso"),
        keyManagement: getCheckedFromId("sec-keyManagement"),
        crossDomain: getCheckedFromId("sec-crossDomain"),
        clientServerAuth: getCheckedFromId("sec-clientServerAuth"),
        cloudAccess: getCheckedFromId("sec-cloudAccess"),
        authorization: getCheckedFromId("sec-authorization"),
        authImplementation: getCheckedFromId("sec-authImplementation")
      },
      endpoint: {
        hardenedEndpoint: getCheckedFromId("sec-hardenedEndpoint"),
        endpointProtection: getCheckedFromId("sec-endpointProtection"),
        cybersecurityOversight: getCheckedFromId("sec-cybersecurityOversight")
      },
      applicationSecurity: {
        appDevelopment: getCheckedFromId("sec-appDevelopment"),
        secureAppDev: getCheckedFromId("sec-secureAppDev"),
        appFacing: getCheckedFromId("sec-appFacing")
      },
      securityTesting: {
        vawa: getCheckedFromId("sec-vawa"),
        devSecOps: getCheckedFromId("sec-devSecOps")
      },
      networkSecurity: {
        perimeterSecurity: getCheckedFromId("sec-perimeterSecurity"),
        networkDLP: getCheckedFromId("sec-networkDLP"),
        networkConnectivity: getCheckedFromId("sec-networkConnectivity"),
        pam: getCheckedFromId("sec-pam")
      }
    }
  };
}

// ── Generate HLD (AI Call) ──
async function generateHLD() {
  const formData = collectFormData();
  goToStep(4);
  document.getElementById("loading-overlay").style.display = "flex";
  document.getElementById("results-container").style.display = "none";

  try {
    const response = await fetch(LAMBDA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    renderResults(result);
  } catch (err) {
    console.error("AI generation failed:", err);
    document.getElementById("loading-overlay").innerHTML = `
      <div style="color: var(--p-red); text-align: center;">
        <p style="font-size: 18px; font-weight: 700;">Generation Failed</p>
        <p style="margin-top: 8px;">${err.message}</p>
        <button class="btn-secondary" style="margin-top: 16px;" onclick="goToStep(3)">Back to Edit</button>
      </div>`;
  }
}

// ── Render AI Results ──
async function renderResults(result) {
  document.getElementById("loading-overlay").style.display = "none";
  document.getElementById("results-container").style.display = "block";

  // Mermaid Diagram
  if (result.mermaidDiagram) {
    const container = document.getElementById("mermaid-diagram");
    container.innerHTML = "";
    try {
      const { svg } = await mermaid.render("hld-diagram", result.mermaidDiagram);
      container.innerHTML = svg;
    } catch (e) {
      container.innerHTML = `<pre style="background:#f5f5f5;padding:16px;border-radius:8px;overflow-x:auto;">${result.mermaidDiagram}</pre>`;
    }
  }

  // Integration Table
  if (result.integrations && result.integrations.length > 0) {
    const tbody = document.getElementById("integration-table-body");
    tbody.innerHTML = result.integrations.map(i => `
      <tr>
        <td>${i.source}</td>
        <td>${i.target}</td>
        <td>${i.protocol}</td>
        <td>${i.type}</td>
        <td>${i.direction}</td>
      </tr>`).join("");
  }

  // TOE Table
  if (result.toeClassification && result.toeClassification.length > 0) {
    const tbody = document.getElementById("toe-table-body");
    tbody.innerHTML = result.toeClassification.map(t => {
      const cls = t.classification === "TOE Default" ? "toe-default"
        : t.classification === "Available Not Preferred" ? "toe-anp"
        : t.classification === "Step-Out" ? "toe-stepout" : "toe-unknown";
      return `<tr>
        <td>${t.component}</td>
        <td>${t.category}</td>
        <td><span class="${cls}">${t.classification}</span></td>
        <td>${t.notes || ""}</td>
      </tr>`;
    }).join("");
  }

  // Risk Flags
  if (result.riskFlags && result.riskFlags.length > 0) {
    document.getElementById("risk-flags").innerHTML = result.riskFlags.map(r => `
      <div class="risk-flag ${r.severity}">
        <div class="risk-flag-header">
          <span class="risk-severity ${r.severity}">${r.severity}</span>
          <span class="risk-confidence">Confidence: ${r.confidence}%</span>
        </div>
        <div class="risk-title">${r.title}</div>
        <div class="risk-rationale">${r.rationale}</div>
      </div>`).join("");
  }

  // Recommendations
  if (result.recommendations && result.recommendations.length > 0) {
    document.getElementById("recommendations").innerHTML = result.recommendations.map(r => `
      <div class="recommendation">
        <div class="recommendation-title">${r.title}</div>
        <div class="recommendation-text">${r.text}</div>
      </div>`).join("");
  }
}

// ── Save HLD ──
async function acknowledgeAndSave() {
  const btn = document.querySelector(".btn-acknowledge");
  btn.disabled = true;
  btn.textContent = "Saving...";
  try {
    // In production, this would POST to a save endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    btn.textContent = "Saved";
    btn.style.background = "#2e7d32";
    alert("HLD saved successfully. Returning to dashboard.");
    showDashboard();
  } catch (err) {
    btn.textContent = "Save Failed";
    btn.disabled = false;
  }
}

// ── FR-NEW-01: Prefill from Prior HLD ──
function prefillFromPriorHLD(appId) {
  clearPrefill();
  // Find the most recent HLD for this app that has details
  const history = MOCK_HLD_HISTORY[appId];
  if (!history || history.length === 0) return;

  // Sort by date descending, pick the most recent with saved details
  const sorted = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
  let priorData = null;
  let priorHldId = null;
  for (const h of sorted) {
    if (MOCK_HLD_DETAILS[h.id]) {
      priorData = MOCK_HLD_DETAILS[h.id];
      priorHldId = h.id;
      break;
    }
  }
  if (!priorData) return;

  // Show prefill banner
  showPrefillBanner(priorHldId);

  const reg = priorData.registration;
  const appData = priorData.applicationData;
  const cyber = priorData.cybersecurity;

  // Step 1 fields
  setAndMark("hld-type", reg.hldType);
  setAndMark("hld-landscape", reg.landscape);
  setAndMark("hld-division", reg.division);
  if (reg.capabilityCategory) {
    setAndMark("hld-capability-cat", reg.capabilityCategory);
    onCapabilityCategoryChange();
    if (reg.capabilitySubprocess) {
      setTimeout(() => setAndMark("hld-capability-sub", reg.capabilitySubprocess), 50);
    }
  }

  // Step 2 fields
  setTextAndMark("app-components", appData.components);
  setTextAndMark("app-integrations", appData.integrations);
  setAndMark("data-classification", appData.dataClassification);
  setAndMark("data-retention", appData.dataRetention);
  checkAndMark("data-in-motion", appData.dataInMotion);
  checkAndMark("data-at-rest", appData.dataAtRest);
  checkAndMark("data-integration", appData.dataIntegration);
  checkAndMark("data-privacy", appData.dataPrivacy);
  checkAndMark("data-dlp", appData.dataLossPrevention);

  // Step 3 fields
  setAndMark("bia-confidentiality", cyber.bia.confidentiality);
  setAndMark("bia-integrity", cyber.bia.integrity);
  setAndMark("bia-availability", cyber.bia.availability);
  onBIAAvailabilityChange();
  setAndMark("bia-overall", cyber.bia.overall);
  checkAndMark("ha-options", cyber.ha);
  checkAndMark("dr-options", cyber.dr);
  checkAndMark("sec-connectivity", cyber.connectivity);

  // IAM
  Object.entries(cyber.iam).forEach(([key, vals]) => {
    if (vals && vals.length) checkAndMark(`sec-${key}`, vals);
  });
  // Endpoint
  Object.entries(cyber.endpoint).forEach(([key, vals]) => {
    if (vals && vals.length) checkAndMark(`sec-${key}`, vals);
  });
  // App Security
  Object.entries(cyber.applicationSecurity).forEach(([key, vals]) => {
    if (vals && vals.length) checkAndMark(`sec-${key}`, vals);
  });
  // Security Testing
  Object.entries(cyber.securityTesting).forEach(([key, vals]) => {
    if (vals && vals.length) checkAndMark(`sec-${key}`, vals);
  });
  // Network Security
  Object.entries(cyber.networkSecurity).forEach(([key, vals]) => {
    if (vals && vals.length) checkAndMark(`sec-${key}`, vals);
  });
}

function showPrefillBanner(hldId) {
  // Remove existing banners
  document.querySelectorAll(".prefill-banner").forEach(b => b.remove());
  const banner = document.createElement("div");
  banner.className = "prefill-banner";
  banner.innerHTML = `<span class="prefill-icon">&#9432;</span> Fields prefilled from <strong>${hldId}</strong>. Review and modify as needed before proceeding.`;
  const card = document.querySelector("#step-1 .card");
  card.insertBefore(banner, card.querySelector("h2").nextSibling);
}

function setAndMark(id, value) {
  const el = document.getElementById(id);
  if (!el || !value) return;
  el.value = value;
  el.classList.add("prefilled");
}

function setTextAndMark(id, value) {
  const el = document.getElementById(id);
  if (!el || !value) return;
  el.value = value;
  el.classList.add("prefilled");
}

function checkAndMark(name, values) {
  if (!values || !values.length) return;
  const container = document.getElementById(name);
  if (!container) return;
  const checkboxes = container.querySelectorAll("input[type='checkbox']");
  if (!checkboxes.length) {
    // Try by name attribute
    const byName = document.querySelectorAll(`input[name="${name}"]`);
    byName.forEach(cb => {
      if (values.includes(cb.value)) {
        cb.checked = true;
        cb.closest("label")?.classList.add("prefilled");
      }
    });
    return;
  }
  checkboxes.forEach(cb => {
    if (values.includes(cb.value)) {
      cb.checked = true;
      cb.closest("label")?.classList.add("prefilled");
    }
  });
}

function clearPrefill() {
  document.querySelectorAll(".prefilled").forEach(el => el.classList.remove("prefilled"));
  document.querySelectorAll(".prefill-banner").forEach(b => b.remove());
}

// ── FR-NEW-02: HLD Detail View ──
async function showHLDDetail(hldId) {
  const hld = MOCK_DASHBOARD_HLDS.find(h => h.id === hldId);
  const detail = MOCK_HLD_DETAILS[hldId];
  if (!hld || !detail) return;

  document.getElementById("dashboard-view").classList.remove("active");
  document.getElementById("wizard-view").classList.remove("active");
  document.getElementById("detail-view").classList.add("active");

  document.getElementById("detail-title").textContent = `${hld.id} — ${hld.title}`;
  const statusEl = document.getElementById("detail-status");
  statusEl.textContent = hld.status;
  statusEl.className = `status-badge ${hld.status}`;

  // Registration
  const reg = detail.registration;
  document.getElementById("detail-registration").innerHTML = renderDetailFields([
    ["HLD Category", reg.category],
    ["Application", reg.application],
    ["HLD Title", reg.title, true],
    ["Description", reg.description, true],
    ["HLD Type", reg.hldType],
    ["Landscape", reg.landscape],
    ["Division", reg.division],
    ["Business Capability", reg.capabilityCategory + (reg.capabilitySubprocess ? " / " + reg.capabilitySubprocess : "")]
  ]);

  // App & Data
  const ad = detail.applicationData;
  document.getElementById("detail-appdata").innerHTML = renderDetailFields([
    ["Components", ad.components, true],
    ["Integrations", ad.integrations, true],
    ["Data Classification", ad.dataClassification],
    ["Data Retention", ad.dataRetention],
    ["Data-in-motion", renderChips(ad.dataInMotion)],
    ["Data-at-rest", renderChips(ad.dataAtRest)],
    ["Data Integration", renderChips(ad.dataIntegration)],
    ["Data Privacy", renderChips(ad.dataPrivacy)],
    ["Data Loss Prevention", renderChips(ad.dataLossPrevention)]
  ]);

  // Cybersecurity
  const cy = detail.cybersecurity;
  let cyberFields = [
    ["BIA — Confidentiality", cy.bia.confidentiality],
    ["BIA — Integrity", cy.bia.integrity],
    ["BIA — Availability", cy.bia.availability],
    ["BIA — Overall", cy.bia.overall],
    ["HA", renderChips(cy.ha)],
    ["DR", renderChips(cy.dr)],
    ["Connectivity", renderChips(cy.connectivity)]
  ];
  // Flatten IAM, endpoint, appSec, testing, network
  const sectionMap = { iam: "IAM", endpoint: "Endpoint", applicationSecurity: "App Security", securityTesting: "Security Testing", networkSecurity: "Network Security" };
  Object.entries(sectionMap).forEach(([key, label]) => {
    const section = cy[key];
    if (!section) return;
    Object.entries(section).forEach(([subKey, vals]) => {
      if (vals && vals.length) {
        const readableKey = subKey.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());
        cyberFields.push([`${label} — ${readableKey}`, renderChips(vals)]);
      }
    });
  });
  document.getElementById("detail-cybersecurity").innerHTML = renderDetailFields(cyberFields);

  // AI Results
  const aiContainer = document.getElementById("detail-ai-results");
  if (detail.aiResults) {
    let html = "";
    if (detail.aiResults.mermaidDiagram) {
      html += `<div class="card"><h2>Architecture Diagram</h2><div id="detail-mermaid" class="mermaid-container"></div></div>`;
    }
    if (detail.aiResults.integrations && detail.aiResults.integrations.length) {
      html += `<div class="card"><h2>Integration Summary</h2><table class="hld-table"><thead><tr><th>Source</th><th>Target</th><th>Protocol</th><th>Type</th><th>Direction</th></tr></thead><tbody>`;
      detail.aiResults.integrations.forEach(i => {
        html += `<tr><td>${i.source}</td><td>${i.target}</td><td>${i.protocol}</td><td>${i.type}</td><td>${i.direction}</td></tr>`;
      });
      html += `</tbody></table></div>`;
    }
    if (detail.aiResults.toeClassification && detail.aiResults.toeClassification.length) {
      html += `<div class="card"><h2>TOE Classification</h2><table class="hld-table"><thead><tr><th>Component</th><th>Category</th><th>Classification</th><th>Notes</th></tr></thead><tbody>`;
      detail.aiResults.toeClassification.forEach(t => {
        const cls = t.classification === "TOE Default" ? "toe-default" : t.classification === "Available Not Preferred" ? "toe-anp" : t.classification === "Step-Out" ? "toe-stepout" : "toe-unknown";
        html += `<tr><td>${t.component}</td><td>${t.category}</td><td><span class="${cls}">${t.classification}</span></td><td>${t.notes || ""}</td></tr>`;
      });
      html += `</tbody></table></div>`;
    }
    if (detail.aiResults.riskFlags && detail.aiResults.riskFlags.length) {
      html += `<div class="card"><h2>Risk Flags</h2><div class="risk-flags-container">`;
      detail.aiResults.riskFlags.forEach(r => {
        html += `<div class="risk-flag ${r.severity}"><div class="risk-flag-header"><span class="risk-severity ${r.severity}">${r.severity}</span><span class="risk-confidence">Confidence: ${r.confidence}%</span></div><div class="risk-title">${r.title}</div><div class="risk-rationale">${r.rationale}</div></div>`;
      });
      html += `</div></div>`;
    }
    if (detail.aiResults.recommendations && detail.aiResults.recommendations.length) {
      html += `<div class="card"><h2>AI Recommendations</h2><div class="recommendations-container">`;
      detail.aiResults.recommendations.forEach(r => {
        html += `<div class="recommendation"><div class="recommendation-title">${r.title}</div><div class="recommendation-text">${r.text}</div></div>`;
      });
      html += `</div></div>`;
    }
    aiContainer.innerHTML = html;

    // Render mermaid if present
    if (detail.aiResults.mermaidDiagram) {
      try {
        const { svg } = await mermaid.render("detail-diagram-svg", detail.aiResults.mermaidDiagram);
        document.getElementById("detail-mermaid").innerHTML = svg;
      } catch (e) {
        document.getElementById("detail-mermaid").innerHTML = `<pre style="background:#f5f5f5;padding:16px;border-radius:8px;overflow-x:auto;">${detail.aiResults.mermaidDiagram}</pre>`;
      }
    }
  } else {
    aiContainer.innerHTML = `<div class="card"><h2>AI Results</h2><p style="color:var(--text-muted);">No AI-generated results available for this HLD. The HLD may not have been submitted for AI generation yet.</p></div>`;
  }
}

function renderDetailFields(fields) {
  return fields.map(([label, value, fullWidth]) => {
    const cls = fullWidth ? "detail-field full-width" : "detail-field";
    return `<div class="${cls}"><span class="detail-field-label">${label}</span><span class="detail-field-value">${value || '<span style="color:var(--text-muted)">—</span>'}</span></div>`;
  }).join("");
}

function renderChips(arr) {
  if (!arr || !arr.length) return '<span style="color:var(--text-muted)">—</span>';
  return arr.map(v => `<span class="chip">${v}</span>`).join("");
}

// ── Chatbot Panel ──
let chatbotOpen = false;
let chatbotBusy = false;

function toggleChatbot() {
  chatbotOpen = !chatbotOpen;
  const panel = document.getElementById("chatbot-panel");
  const fab = document.getElementById("chatbot-fab");
  if (chatbotOpen) {
    panel.style.display = "flex";
    fab.style.display = "none";
    if (document.getElementById("chatbot-messages").children.length === 0) {
      appendAssistantGreeting();
    }
    document.getElementById("chatbot-input").focus();
  } else {
    panel.style.display = "none";
    fab.style.display = "flex";
  }
}

function showChatbotFAB() {
  document.getElementById("chatbot-fab").style.display = "flex";
  if (chatbotOpen) {
    document.getElementById("chatbot-panel").style.display = "flex";
  }
}

function hideChatbot() {
  document.getElementById("chatbot-fab").style.display = "none";
  document.getElementById("chatbot-panel").style.display = "none";
}

function appendAssistantGreeting() {
  appendSuggestionCard(
    "Hello! I'm your Bedrock Assistant. I can help you fill in form fields, suggest security controls, or answer architecture questions. What would you like to know?",
    null
  );
}

function onChatKeydown(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
}

function sendQuickMessage(text) {
  document.getElementById("chatbot-input").value = text;
  sendChatMessage();
}

async function sendChatMessage() {
  if (chatbotBusy) return;
  const input = document.getElementById("chatbot-input");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  appendUserMessage(text);
  const typingId = appendTypingIndicator();
  chatbotBusy = true;
  setSendDisabled(true);

  try {
    const formContext = collectFormData();
    const response = await fetch(LAMBDA_URL.replace("/generate", "/chat"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        currentStep,
        formContext
      })
    });

    removeTypingIndicator(typingId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();

    if (result.suggestion && result.applyTarget) {
      appendSuggestionCard(result.reply, result.suggestion, result.applyTarget, result.applyValue);
    } else {
      appendAssistantMessage(result.reply || "I couldn't generate a response. Please try again.");
    }
  } catch (err) {
    removeTypingIndicator(typingId);
    appendAssistantMessage("Sorry, I'm having trouble connecting right now. Please try again.");
    console.error("Chat error:", err);
  } finally {
    chatbotBusy = false;
    setSendDisabled(false);
    input.focus();
  }
}

function setSendDisabled(disabled) {
  document.querySelector(".chatbot-send").disabled = disabled;
}

function appendUserMessage(text) {
  const msgs = document.getElementById("chatbot-messages");
  const div = document.createElement("div");
  div.className = "chat-msg user";
  div.innerHTML = `<div class="chat-bubble">${escapeHtml(text)}</div><div class="chat-time">${chatTime()}</div>`;
  msgs.appendChild(div);
  scrollChatToBottom();
}

function appendAssistantMessage(text) {
  const msgs = document.getElementById("chatbot-messages");
  const div = document.createElement("div");
  div.className = "chat-msg assistant";
  div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${chatTime()}</div>`;
  msgs.appendChild(div);
  scrollChatToBottom();
}

function appendSuggestionCard(replyText, suggestionText, applyTarget, applyValue) {
  const msgs = document.getElementById("chatbot-messages");
  const div = document.createElement("div");
  div.className = "chat-suggestion-card";

  const sparkIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#00A19C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  let html = `<div class="chat-suggestion-label">${sparkIcon} AI SUGGESTION</div>
    <div class="chat-suggestion-text">${replyText}</div>`;

  if (suggestionText && applyTarget) {
    html += `<button class="chat-apply-btn" onclick="applyToForm('${escapeAttr(applyTarget)}', '${escapeAttr(applyValue || suggestionText)}', this)">
      ${sparkIcon} Apply to Form
    </button>`;
  }

  div.innerHTML = html;
  msgs.appendChild(div);
  scrollChatToBottom();
}

function appendTypingIndicator() {
  const msgs = document.getElementById("chatbot-messages");
  const id = "typing-" + Date.now();
  const div = document.createElement("div");
  div.className = "chat-msg assistant chat-typing";
  div.id = id;
  div.innerHTML = `<div class="chat-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
  msgs.appendChild(div);
  scrollChatToBottom();
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function applyToForm(target, value, btn) {
  const el = document.getElementById(target);
  if (!el) return;
  if (el.tagName === "SELECT") {
    // Try to match option by value or text
    const opts = Array.from(el.options);
    const match = opts.find(o => o.value === value || o.text.toLowerCase().includes(value.toLowerCase()));
    if (match) el.value = match.value;
  } else {
    el.value = value;
  }
  el.classList.add("prefilled");
  el.dispatchEvent(new Event("change"));
  btn.textContent = "✓ Applied";
  btn.disabled = true;
  btn.style.background = "var(--p-emerald)";
  btn.style.color = "#fff";
}

function scrollChatToBottom() {
  const msgs = document.getElementById("chatbot-messages");
  msgs.scrollTop = msgs.scrollHeight;
}

function chatTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return (str || "").replace(/'/g, "\\'").replace(/"/g, "&quot;");
}
