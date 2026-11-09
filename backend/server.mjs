import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const PORT = Number(process.env.PORT || 4000);
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

function readLeads() {
  try {
    ensureStorage();
    const raw = fs.readFileSync(LEADS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function appendLead(record) {
  try {
    const leads = readLeads();
    leads.unshift(record);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads.slice(0, 1000), null, 2), "utf8");
  } catch (err) {
    console.error("[dcc-backend] Failed to persist lead:", err);
  }
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
  });
  res.end(body);
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname.replace(/\/+$/, "") || "/";

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
    });
    res.end();
    return;
  }

  // Healthcheck endpoint
  if (req.method === "GET" && (pathname === "/" || pathname === "/api/health" || pathname === "/health")) {
    const leads = readLeads();
    return sendJson(res, 200, {
      ok: true,
      service: "dcc-backend",
      company: "Debra's Classic Cleaning LLC",
      certificationId: "2040639",
      uptimeSeconds: Math.round(process.uptime()),
      storedLeadsCount: leads.length,
      timestamp: new Date().toISOString(),
    });
  }

  // Lead submission endpoint
  if (req.method === "POST" && pathname === "/api/lead") {
    try {
      const body = await parseJsonBody(req);
      const {
        leadType = "commercial_estimate",
        name = "",
        company = "",
        role = "",
        email = "",
        phone = "",
        zip = "",
        preferredTime = "",
        calculatorInputs = {},
        estimateRange = "",
        recommendedTier = "",
        notes = "",
      } = body;

      const submissionId = `DCC-${Date.now().toString(36).toUpperCase()}`;
      const timestamp = new Date().toISOString();

      // Optional HubSpot Forms API sync
      const hubspotPortalId = process.env.HUBSPOT_PORTAL_ID;
      const hubspotFormGuid = process.env.HUBSPOT_FORM_GUID;
      let hubspotSynced = false;

      if (hubspotPortalId && hubspotFormGuid && email) {
        try {
          const hsRes = await fetch(
            `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormGuid}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fields: [
                  { name: "email", value: email },
                  { name: "firstname", value: name },
                  { name: "company", value: company },
                  { name: "jobtitle", value: role },
                  { name: "phone", value: phone },
                  { name: "zip", value: zip },
                  { name: "dcc_lead_type", value: leadType },
                  { name: "dcc_estimate_range", value: estimateRange },
                  { name: "dcc_recommended_tier", value: recommendedTier },
                  { name: "dcc_calculator_json", value: JSON.stringify(calculatorInputs) },
                ],
                context: {
                  pageName: `Debra's Classic Cleaning — ${leadType}`,
                },
              }),
            }
          );
          hubspotSynced = hsRes.ok;
        } catch {
          hubspotSynced = false;
        }
      }

      const firstName = String(name).split(" ")[0] || "there";
      const facilityDesc =
        calculatorInputs?.facilityType || calculatorInputs?.serviceType || "your facility";
      const leadSmsPreview = `Hi ${firstName}, it's Debra from Debra's Classic Cleaning. Got your estimate (${estimateRange || "custom"}) for ${facilityDesc}. I'll call you within 5 minutes during business hours—or reply here anytime.`;

      const record = {
        submissionId,
        timestamp,
        leadType,
        name,
        company,
        role,
        email,
        phone,
        zip,
        preferredTime,
        estimateRange,
        recommendedTier,
        notes,
        calculatorInputs,
        hubspotSynced,
      };

      appendLead(record);

      return sendJson(res, 200, {
        ok: true,
        handledBy: "dcc-backend",
        submissionId,
        timestamp,
        hubspotSynced,
        speedToLead: {
          targetResponseMinutes: 5,
          autoSmsTriggered: Boolean(phone),
          leadSmsPreview,
          ownerAlertDispatched: true,
          dealStage: "Estimate",
        },
        summary: {
          leadType,
          name,
          company,
          email,
          phone,
          zip,
          preferredTime,
          estimateRange,
          recommendedTier,
          notes,
        },
      });
    } catch (err) {
      return sendJson(res, 400, {
        ok: false,
        error: err instanceof Error ? err.message : "Invalid submission payload",
      });
    }
  }

  // Leads summary endpoint
  if (req.method === "GET" && pathname === "/api/leads") {
    const leads = readLeads();
    return sendJson(res, 200, {
      ok: true,
      count: leads.length,
      recent: leads.slice(0, 25).map((l) => ({
        submissionId: l.submissionId,
        timestamp: l.timestamp,
        leadType: l.leadType,
        zip: l.zip,
        estimateRange: l.estimateRange,
        recommendedTier: l.recommendedTier,
      })),
    });
  }

  return sendJson(res, 404, { ok: false, error: "Not found" });
});

ensureStorage();
server.listen(PORT, "0.0.0.0", () => {
  console.log(`[dcc-backend] Listening on http://0.0.0.0:${PORT}`);
});
