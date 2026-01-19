# AGENTS.md

Guardrails for keeping the ox.ca landing page clear, accurate, and accessible.

## Scope
- Applies to the root site content (index, media references, and shortlinks). For decks, follow presentations/AGENTS.md instead.
- Keep paths stable; use redirects for convenience rather than moving content.
- When updating presentations, edit source files in /presentations/ only; never edit generated output in /_site/.

## Voice and intent
- Write in the first person, welcoming, and purpose-driven; keep paragraphs concise.
- Highlight accessibility, sustainability, and open-source values; avoid salesy language.
- Prefer en-CA spelling; expand acronyms on first use.

### Plain language (Orwell's 6 Rules)
- Never use a metaphor, simile, or figure of speech you see often in print.
- Never use a long word where a short one will do.
- If you can cut a word out, always cut it out.
- Never use the passive where you can use the active.
- Never use a foreign phrase, scientific term, or jargon if an everyday equivalent exists.
- Break any of these rules sooner than say anything outright barbarous.

## Accessibility and structure
- One h1 on the page; nest headings in order with no skips.
- Use descriptive link text with https URLs; provide alt text and note file types for non-HTML links.
- Keep content ASCII unless a proper name or existing text requires otherwise.
- Use plain Markdown/kramdown; limit raw HTML to redirects or essentials.

## Content boundaries
- Keep the landing page lightweight: no heavy embeds, trackers, or autoplay media.
- Add new sections only when they summarize evergreen work; link out to long-form content.
- Do not duplicate or relocate presentations; link to the existing directory instead.

## Shortlinks and redirects
- The /p short URL must redirect to /presentations/; include a canonical link in redirect pages.
- If adding typo catches (e.g., /presentations/), redirect to the canonical /presentations/ path instead of copying files.

## Review checklist
- Run local quality checks: `npm run qa:all` (requires `npm install`).
- Links work and have context; alt text is present where needed.
- Pin external links to their final destinations to avoid redirects and reduce link-check noise.
- Spelling and casing match the guidance; YAML front matter (if any) is valid.
- Page renders cleanly on mobile and desktop; nothing breaks the minimal theme.

## Style
- Bullets: no trailing periods unless the bullet is a full sentence; keep structure parallel and concise.

## Slide augmentations and scripts
- Keep custom behavior for the decks in separate scripts under /presentations/ca-slides so b6plus.js can be updated directly from https://www.w3.org/Talks/Tools/b6plus/ without merge conflict.
- Load helpers like details-popovers.js after ca-slides/b6plus.js (and after auto-scale.js when that helper is used) so the global helpers (`_`, document structure) are available.
- Document any additional helper scripts in this AGENTS file so the maintenance plan is clear for future updates.
