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
- If adding typo catches (e.g., /presentatons/), redirect to the canonical /presentations/ path instead of copying files.

## Review checklist
- Links work and have context; alt text is present where needed.
- Spelling and casing match the guidance; YAML front matter (if any) is valid.
- Page renders cleanly on mobile and desktop; nothing breaks the minimal theme.
