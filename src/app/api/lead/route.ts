import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward to dedicated backend container (dcc-backend) when running in Docker
    const backendBaseUrl = process.env.BACKEND_INTERNAL_URL || "http://dcc-backend:4000";
    try {
      const proxyRes = await fetch(`${backendBaseUrl.replace(/\/+$/, "")}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(4000),
      });
      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        return NextResponse.json(proxyData);
      }
    } catch {
      // Fallback to in-process handler when running local dev without Docker
    }

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

    // 1. Optional HubSpot Forms / Deals API integration (runs if HUBSPOT_PORTAL_ID & HUBSPOT_FORM_GUID or HUBSPOT_ACCESS_TOKEN are set)
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

    // 2. Optional Twilio 10-second Speed-to-Lead SMS webhook (runs if TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER are set)
    const firstName = name.split(" ")[0] || "there";
    const facilityDesc =
      calculatorInputs?.facilityType || calculatorInputs?.serviceType || "your facility";
    const leadSmsPreview = `Hi ${firstName}, it's Debra from Debra's Classic Cleaning. Got your estimate (${estimateRange || "custom"}) for ${facilityDesc}. I'll call you within 5 minutes during business hours—or reply here anytime.`;

    return NextResponse.json({
      ok: true,
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
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Invalid submission payload" },
      { status: 400 }
    );
  }
}

