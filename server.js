require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── System prompt tuned for telecom network fault analysis ──────────────────
const SYSTEM_PROMPT = `You are NetFaultAI, an expert AI assistant specialised in analysing faults and outages in telecommunications networks — particularly in wireline, wireless, fibre, and broadband infrastructure.

You have deep knowledge of:
- BSNL and Indian telecom network architecture (PSTN, GSM, 4G LTE, FTTH, MPLS)
- Network fault categories: link failures, node failures, power outages, equipment faults, software/config errors, transmission issues
- Fault isolation and RCA (Root Cause Analysis) methodology
- KPIs: uptime/SLA, MTTR, MTBF, packet loss, latency, jitter, BER, throughput
- OAM&P frameworks, TMN model, ITU-T standards
- Alarm management: severity levels (critical/major/minor/warning), alarm storms, suppression
- Network management systems: NMS, OSS, BSS, EMS
- Protocols: BGP, OSPF, MPLS, STP, SNMP, Syslog, NetFlow
- Outage classification: total outage, partial outage, degraded service
- Escalation matrix, NOC procedures, ticketing workflows
- Preventive maintenance, predictive fault analysis, capacity planning

When analysing faults:
1. Ask clarifying questions if needed (topology, affected nodes, error codes, alarms)
2. Provide structured RCA: Symptom → Probable Cause → Verification Steps → Resolution → Prevention
3. Suggest immediate remediation and long-term fixes
4. Reference relevant standards or vendor advisories if applicable
5. Use clear headings and bullet points for actionable output

Respond in a professional but conversational tone. When the user pastes logs, alarms, or error codes — analyse them systematically.`;

// ── Chat endpoint ─────────────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }

  if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === "your_api_key_here") {
    return res.status(500).json({
      error: "ANTHROPIC_API_KEY is not configured. Copy .env.example to .env and add your key.",
    });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return res.status(response.status).json({ error: "Upstream API error", details: errText });
    }

    const data = await response.json();
    const text = data.content.map((b) => (b.type === "text" ? b.text : "")).join("\n");
    res.json({ reply: text });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    apiKeySet: !!(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== "your_api_key_here"),
  });
});

// Serve SPA for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🟢  NetFaultAI Server running on http://localhost:${PORT}`);
  console.log(`📡  In GitHub Codespaces, use the PORTS tab to open the forwarded URL\n`);
});
