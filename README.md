# FinAgent — AI Reconciliation Dashboard

> **Intelligent financial data reconciliation, powered by AI.**

FinAgent is a terminal-aesthetic, single-page dashboard that simulates an AI agent performing automated financial reconciliation. It presents live-style data feeds, discrepancy detection, agent reasoning logs, and actionable resolution workflows — all in a sleek dark UI.

![FinAgent Preview](./preview.png)

---

## ✨ Features

- 🤖 **AI Agent panel** — prompt the reconciliation agent with natural-language instructions
- 📊 **Live data grid** — side-by-side comparison of source and target financial records
- 🔴 **Discrepancy highlighting** — automatic flagging of mismatched entries with severity tiers
- 🖥 **Agent reasoning log** — timestamped trace of every step the agent takes
- 📡 **Data source status** — connection health indicators for all upstream feeds
- ⚡ **Scanline aesthetic** — high-contrast dark UI with CRT-style overlay for focus
- 📱 **Responsive layout** — adapts from widescreen dashboards to narrower viewports

---

## 🚀 Getting Started

No build tools required. Runs entirely in the browser.

### Option 1 — Open locally

```bash
git clone https://github.com/<your-username>/finagent-reconciliation.git
cd finagent-reconciliation
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option 2 — Live Server (VS Code)

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**

### Option 3 — Deploy to GitHub Pages

```bash
# In your repository settings:
# Settings → Pages → Source → Deploy from branch → main → / (root)
```

Live at: `https://<your-username>.github.io/finagent-reconciliation/`

---

## 📁 Project Structure

```
finagent-reconciliation/
├── index.html        # Complete self-contained application (HTML + CSS + JS)
└── README.md
```

> This project is intentionally self-contained in a single HTML file for maximum portability. All styles and scripts are inlined.

---

## 🛠 Tech Stack

| Layer      | Choice |
|------------|--------|
| Markup     | HTML5 |
| Styling    | Inline CSS (CSS custom properties, Grid, Flexbox) |
| Logic      | Vanilla JavaScript |
| Fonts      | [IBM Plex Mono + IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Mono) via Google Fonts |
| AI Backend | Anthropic Claude API (`/v1/messages`) |

---

## 🔑 API Configuration

FinAgent calls the **Anthropic Claude API** to power the reconciliation agent. To connect your own key:

1. Create a free account at [console.anthropic.com](https://console.anthropic.com)
2. Generate an API key under **API Keys**
3. In `index.html`, locate the configuration block near the top of the `<script>` section:

```js
const CONFIG = {
  apiKey: "YOUR_ANTHROPIC_API_KEY",   // ← replace this
  model: "claude-sonnet-4-20250514",
};
```

> ⚠️ **Never commit a real API key to a public repository.** Use environment variables or a backend proxy for production deployments.

---

## 🏗 Architecture

```
User Prompt
    │
    ▼
Claude AI Agent  ←──── System prompt with reconciliation rules
    │
    ├── Analyse source vs. target data
    ├── Identify discrepancies
    ├── Log reasoning steps
    └── Return structured resolution advice
         │
         ▼
    Dashboard UI (tables, log, status panels)
```

---

## 🔒 Security Notes

- This project is a **frontend prototype / demo**. In a real-world deployment, API calls should be proxied through a secure backend to avoid exposing credentials.
- No financial data is stored or transmitted beyond the current browser session.
- All sample data is synthetic and not representative of any real entity.

---

## 🎨 Design Decisions

- **IBM Plex Mono** — chosen for its terminal legibility and financial-data aesthetic
- **Dark navy palette** (`#0a0e14` base) — reduces eye strain during extended dashboard use
- **Scanline overlay** — subtle CRT texture that reinforces the "live system" feel without impairing readability
- **Colour-coded severity** — green / yellow / red mirrors standard financial traffic-light systems

---

## 📜 License

[MIT](./LICENSE) © 2025 — free to use, fork, and adapt.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a Pull Request
