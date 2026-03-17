# Copilot Instructions

This repository hosts the **ox.ca** personal landing page and presentation decks, built with Jekyll and deployed via GitHub Pages.

## Primary guidance

All authoring, voice, accessibility, and quality rules live in:

- **[/AGENTS.md](../AGENTS.md)** — root-site guardrails (scope, voice, accessibility, content boundaries, QA commands)
- **[/presentations/AGENTS.md](../presentations/AGENTS.md)** — slide-deck authoring guide (structure, helpers, tone, branding, QA)
- **[/accessibility.md](../accessibility.md)** — accessibility commitment, known limitations, and automated testing details

Read these files before making any change. They are the authoritative source of truth for this project.

## Quick orientation

| Area | Path | Notes |
| :--- | :--- | :--- |
| Landing page | `index.md` | Jekyll/Markdown; en-CA spelling |
| Layouts | `_layouts/` | Minimal theme; one `<h1>` per page, `<main>` landmark required |
| Presentations | `presentations/` | Standalone HTML decks using b6plus; edit source only, not `_site/` |
| Slide framework | `presentations/ca-slides/` | Custom helpers; keep separate from upstream `b6plus.js` |
| Shortlinks | `p/` | Redirects to `/presentations/`; keep paths stable |
| QA scripts | `package.json` | Run `npm install` then `npm run qa:all` before committing |

## Key rules at a glance

- **Never edit `_site/`** — it is generated output.
- **One `<h1>` per page**; nest headings in order with no skips.
- **en-CA spelling** for root-site content; slide decks follow CivicActions style (American spelling) per `presentations/AGENTS.md`.
- **Descriptive link text** and `alt` text on every image.
- **Run `npm run qa:all`** (links, HTML validation, accessibility scan) before opening a PR.
- Keep the landing page lightweight: no trackers, heavy embeds, or autoplay media.
