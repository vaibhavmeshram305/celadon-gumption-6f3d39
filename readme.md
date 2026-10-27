# Vaibhav's Engineering World — VS Code Edition 🌱⚡

**A fully editable, Minecraft-inspired engineering placement portfolio.** Includes the voxel island, project quests, category/search filters, expandable quest detail windows, inventory-style skills, technical report shelf, day/night switch, mobile menu, and placement intro copy.

This project is extracted from the previously created **standalone Minecraft portfolio HTML**. It is **not a download of Replit's current source code**. It runs locally without Replit and without any third-party npm packages.

## Folder map

```text
vaibhav-minecraft-portfolio-vscode/
├── index.html                  # All page sections and text
├── src/
│   ├── main.js                 # Filters, popup, toggles, interactions
│   ├── data/
│   │   └── projects.js         # The eight editable project quest cards
│   └── styles/
│       └── main.css            # Minecraft colors, layout, pixels, mobile styles
├── public/
│   └── favicon.svg             # Pixel bolt favicon
├── scripts/
│   └── dev-server.mjs          # Local development server (no dependencies)
├── .vscode/
│   ├── tasks.json              # VS Code run task
│   └── settings.json
├── extras/
│   └── standalone-preview.html # Optional double-click offline preview
├── package.json
├── .gitignore
└── README.md
```

## Run in VS Code

1. Extract the ZIP, then open the **entire project folder** in VS Code (`File → Open Folder`).
2. Install **Node.js 18+** if you don't already have it.
3. Open VS Code Terminal (`Ctrl + backtick`).
4. Run:

   ```bash
   npm run dev
   ```

5. Open **http://localhost:5173** in your browser.

**No `npm install` required.** This is a dependency-free project. Use **Ctrl+C** in the terminal to stop the local server. You can also use VS Code: **Terminal → Run Task → Run Minecraft Portfolio**.

For an immediate offline look without the server, double-click `extras/standalone-preview.html`. However, to edit separate JS/CSS/data files, use the local preview server.

## Where to edit

| You want to change | Edit |
| --- | --- |
| Main headline, introduction, about, and report bookshelf | `index.html` |
| Add/change projects, descriptions and their details | `src/data/projects.js` |
| Minecraft look, fonts, grass blocks, pixel colors, animations, mobile behavior | `src/styles/main.css` |
| Quest search, filtering, popup, night toggle, hotbar and copy button | `src/main.js` |
| Browser favicon | `public/favicon.svg` |

### Add a new quest

Open `src/data/projects.js` and duplicate an object in the `projects` array. Each needs a unique `id`, `title`, `kind`, `groups`, `icon`, `description`, `tags`, `overview`, `tasks`, and `note`. Existing filter names include `simulation`, `control`, `ev`, `research`, `embedded`.

**Accuracy:** The included descriptions intentionally distinguish coursework, simulations in progress, review writing, and research concepts. Don't present unverified results or proposals as completed hardware work.

## Privacy and publishing

- Running `npm run dev` starts a server bound to `127.0.0.1` (your own computer only).
- Nothing is uploaded or published by this project. No login, analytics, remote database, or API is used.
- The HTML has a `noindex` robots tag, but **`noindex` is not security** if you later host it publicly.
- If you eventually deploy, enable an authentication/access restriction at your chosen hosting provider before sharing a link.
- An external Google Fonts stylesheet is optional; if offline, the page falls back to local system fonts.

## Notes

The artwork is original CSS-based voxel styling rather than official Minecraft game assets. This source is independent of your Replit `FakeCharmingPublishing` project and can be customized in VS Code.
