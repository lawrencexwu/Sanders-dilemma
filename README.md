# Ms. Sanders's Dilemma — PrOACT Decision Analysis

An elegant, bilingual (English / 繁體中文) Three.js-driven strategy
presentation that walks through the *Ms. Sanders's Dilemma* case using
John S. Hammond's **Smart Choices / PrOACT** decision-making framework.

It is built as a slide-style "consulting deck": a subtle dark 3D
node-network background that reconfigures per section, full-screen
slides, keyboard navigation, a presenter-notes mode, and a printable
one/two-page executive summary.

## Highlights

- **Bilingual** — toggle EN / 繁中; every visible string (titles, body,
  tables, navigation, presenter notes, executive summary) switches.
  Default language is English. Traditional Chinese uses Taiwan-style
  wording.
- **PrOACT structure** — 10 slides: Hero, Problem, Objectives,
  Alternatives, Consequences, Tradeoffs, Recommended Path, the 60–90 Day
  Test, Decision Triggers, Final Judgment.
- **Calm backdrop** — a static, low-contrast dark gradient that keeps
  text fully readable (no moving particles).
- **Navigation** — section dots, progress bar, slide counter, edge
  arrows, wheel/touch, and keyboard:
  - `→` / `↓` / `Space` — next
  - `←` / `↑` — previous
  - `Home` / `End` — first / last
- **Presenter Notes** toggle (bilingual notes per slide).
- **Full-screen** toggle.
- **Print Executive Summary** — clean black-on-white consulting memo.
- Responsive for desktop, tablet, and mobile. No backend, no database,
  no paid APIs.

## Tech

Vite + vanilla JS. Zero runtime dependencies.

## Local development

```bash
npm install
npm run dev
```

Then open the printed local URL (default <http://localhost:5173>).

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Deploy to Vercel

This is a static site with no backend.

1. Push this repository to GitHub.
2. In Vercel, **Add New → Project** and import the repository.
3. Vercel auto-detects Vite (`vercel.json` is included as well):
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy. No environment variables are required.

You can also deploy from the CLI:

```bash
npm i -g vercel
vercel
```

## Project structure

```
package.json
vercel.json
index.html
src/
  main.js          # app shell, navigation, language, print, keyboard
  style.css        # dark executive theme + print styles
  content.js       # all bilingual copy (single source of truth)
  three-scene.js   # backdrop controller (static gradient; no-op API)
README.md
```

## Content

All copy is the provided case content (no placeholder text). To edit
text, change `src/content.js` only — the UI reads everything from there.
