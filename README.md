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
| Data | Synthetic dataset (built-in JavaScript) |

---

## 🏗 How It Works

FinAgent is a fully self-contained front-end simulation — no backend, no external API calls, no credentials required.

```
User Prompt
    │
    ▼
JavaScript Agent Engine
    │
    ├── Matches prompt against built-in rule set
    ├── Cross-references synthetic source vs. target records
    ├── Flags discrepancies by severity (critical / warning / info)
    ├── Streams timestamped reasoning steps to the agent log
    └── Updates dashboard UI (tables, status panels, metrics)
```

All financial data is synthetic and generated entirely in the browser. Nothing is stored or transmitted externally.

---

## 🔒 Data & Privacy

- No external API calls are made
- No financial data is stored or transmitted beyond the current browser session
- All sample data is synthetic and not representative of any real entity

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
