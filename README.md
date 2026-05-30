# 📡 NetFaultAI — Network Fault & Outage Analysis Chatbot

An AI-powered chatbot built with **Claude (Anthropic)** specifically for telecom network fault analysis, RCA, and outage management. Designed for NOC engineers, field teams, and network managers.

---

## 🚀 Quick Start on GitHub Codespaces

### Step 1 — Open in Codespaces
Click **Code → Codespaces → Create codespace on main** in your GitHub repo.
The devcontainer will auto-install Node.js dependencies.

### Step 2 — Set your API Key
```bash
cp .env.example .env
# Open .env and replace 'your_api_key_here' with your Anthropic API key
# Get one free at: https://console.anthropic.com
```

### Step 3 — Start the server
```bash
npm start
```

### Step 4 — Open the app
In the **PORTS** tab of Codespaces, click the globe icon next to port **3000**.
The chatbot UI will open in your browser.

---

## 🖥 Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/network-fault-chatbot.git
cd network-fault-chatbot
npm install
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm start
# Open http://localhost:3000
```

---

## 🧠 What It Can Analyse

| Category               | Examples                                        |
|------------------------|-------------------------------------------------|
| **Fibre / OFC Faults** | Cable cuts, signal loss, OTDR analysis          |
| **Power Issues**       | DC plant failure, battery backup, DG sets       |
| **Radio / BTS**        | GSM, 4G LTE BTS faults, handover failures       |
| **Transmission**       | MPLS, SDH/PDH, microwave link issues            |
| **IP / Routing**       | BGP flaps, OSPF adjacency, packet loss          |
| **FTTH / Broadband**   | GPON ONU offline, OLT faults, PPPoE issues      |
| **Alarms / Logs**      | SNMP traps, syslog analysis, alarm storms       |
| **Core Network**       | BSC/RNC resets, MGW failures, HLR issues        |
| **RCA & Methodology**  | Root cause isolation, MTTR reduction, SLA       |

---

## 📁 Project Structure

```
network-fault-chatbot/
├── server.js            ← Express backend (API proxy + system prompt)
├── public/
│   └── index.html       ← Frontend UI (single-file, no build step)
├── .devcontainer/
│   └── devcontainer.json ← GitHub Codespaces config
├── .env.example         ← Environment template
├── package.json
└── README.md
```

---

## ⚙️ Configuration

| Variable            | Description                        |
|---------------------|------------------------------------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (required)  |
| `PORT`              | Server port (default: 3000)        |

---

## 🔧 Development

```bash
npm run dev    # Start with nodemon (auto-restart on file changes)
```

---

## 📡 Designed for BSNL / Indian Telecom Context

The AI system prompt is tuned for:
- BSNL network architecture (PSTN, GSM, 4G, FTTH, MPLS backbone)
- Indian telecom regulatory context (TRAI, DoT)
- NOC workflows and escalation matrix
- ITU-T, 3GPP, IEEE standards

---

## 📄 License
MIT — free to use, modify, and deploy.
