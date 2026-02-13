# AGENTS.md

Authoring guidance for keeping the slide deck consistent, accessible, and on-message.

## Purpose
- Maintain the CivicActions deck voice: technical, urgent, empowering, open-source-forward.
- Keep the conflict/hero/twist arc: cleanup vs authoring, villain = cognitive load, hero = ATAG Part B + local SLMs, twist = AI for WCAG-EM automation.
- Additional arcs for the other three decks:
    - **Operations cadence deck:** conflict = fragmented QA handoffs, villain = siloed governance, hero = shared SLM dashboards, twist = community-driven automation that previews compliance before formal reviews.
    - **Platform rollout deck:** conflict = compliance backlog vs rapid feature work, villain = fear of audit-triggering surprises, hero = CivicActions + open-source tooling that codifies ATAG/WCAG guidance, twist = lightweight AI assistants that keep stakeholders aligned in real time.
    - **Innovation lab deck:** conflict = experimentation vs enterprise confidence, villain = opaque assessments and manual scorecards, hero = transparent, open-source-ready ATAG Part B playbooks, twist = AI-powered WCAG-EM scaffolds that keep labs accountable without blocking discovery.

## Slide Structure (template version b6+)
- Slides use `<section class="slide">`; title slide uses `class="slide cover clear"`.
- Speaker notes follow immediately with `<section class="comment">`.
- Incremental bullets use `<ul class="emerge">` and `class="next"` where needed.
- Big pivot uses `<p class="shout">`.
- Side-by-side content uses `<div class="columns">` with child blocks.
- Use `<aside class="progress" aria-label="Presentation progress"></aside>` and `<aside class="clock" aria-label="Presentation timer"></aside>` for presentation controls (these are ARIA landmarks required for WCAG 2.1 compliance).
- Cover slide should include a subtitle, speaker line (name + affiliation), event line (venue + date/time with time zone), and a note block that lists the event URL(s), slide link, and the hook for the talk.
- Keep the `aria-live` region that announces exit from slide mode; it supports screen reader users.
- Include a Resources slide near the end and keep a final Questions slide with contact links and a QR placeholder when possible.

## Slide Augmentations & Helpers
- Load helpers after `ca-slides/b6plus.js` and before deck content where possible
- **Druplicon Showcase** (`ca-slides/assets/drupal/druplicon-showcase.js`)
    - Adds watermark druplicon icons to slides with `class="druplicon"` or `class="druplicon-watermark"`
    - Controls:
        - `data-druplicon-count` – number of icons per slide
        - `data-druplicon-opacity` – opacity (0–1)
        - `data-druplicon-scale-min` / `data-druplicon-scale-max` – size bounds (percent)
        - `data-druplicon-sequence="true"` on `<body>` to distribute icons sequentially across slides
- **Random Druplicon** (`ca-slides/assets/drupal/druplicon-random.js`)
    - `window.DruplIconRandom.insert(target, options)` to place a single random watermark
    - Uses dynamic IDs discovered from the sprite over http(s) and falls back to a static list
- **CMS Showcase** (`ca-slides/cms-showcase.js`)
    - For non-Drupal logo watermarks; similar data attributes apply
- **Details Popovers** (`ca-slides/details-popovers.js`)
    - Optional popovers for supplemental slide content; load after `b6plus.js`

## Accessibility & Content Hygiene
- Keep headings in order (no skipped levels); one `h1` on the cover, `h2` per slide.
- Use clear, descriptive link text; avoid "click here." Include `alt` text when adding images/QRs.
- Avoid jargon without context; prefer plain language nudges inline.
- Spell out acronyms.
- Only one notes block per slide: keep a single `class="note"`/`class="notes"` element in each slide section.
- Prefer literal characters; keep HTML entities only where required for HTML (`&`, `<`, `>`).
- Be consistent with use of "and" and "&" - default to "&" for space.
- In notes, include source URLs in full (https...) and keep citations readable without relying on link previews.

## Druplicon Sprite Maintenance
- Originals folder: `presentations/ca-slides/assets/drupal/originals`
- Sprite output: `presentations/ca-slides/assets/drupal/druplicon-sprite.svg`
- Manifest: `presentations/ca-slides/assets/drupal/druplicon-manifest.txt`
- Regenerate after adding/removing originals:
    - `python scripts/build_druplicon_sprite.py`
- JS reads IDs dynamically from the sprite when served over http(s), so no manual JS updates are required

## Tone & Narrative
- Voice: direct, community-focused, pragmatic. Call out procurement/privacy realities and open-source advantages.
- Emphasize author support over gatekeeping; AI as guidance, not punishment.
- Reinforce that sampling/compliance is automation-friendly science, not busywork.

### Plain language (Orwell's 6 Rules)
- Never use a metaphor, simile, or figure of speech you see often in print.
- Never use a long word where a short one will do.
- If you can cut a word out, always cut it out.
- Never use the passive where you can use the active.
- Never use a foreign phrase, scientific term, or jargon if an everyday equivalent exists.
- Break any of these rules sooner than say anything outright barbarous.

## CivicActions Style Alignment
- Follow the CivicActions writing style guide: use welcoming plain language, minimal jargon, and explain acronyms on first use. Reference: https://guidebook.civicactions.com/en/latest/about-this-guidebook/writing-style-guide/
- Use American spelling by default.
- Use title case for slide headings to match the current deck style.
- Bullets: no trailing periods unless the bullet is a full sentence; keep structure parallel and concise.
- Write in second person when giving guidance; keep tone calm, confident, and people-first.

## Typography & Branding
- **Body font**: Nunito (sans-serif) via Google Fonts
- **Heading font**: Merriweather (serif) via Google Fonts
- **Primary colors**: Primary Red (#D83933), Primary Blue (#162E51), Light Blue (#73B3E7)
- **Accent colors**: Warm Gold (#FA9441), Warm Light Gold (#FFBC78)
- **Grayscale**: White (#FFFFFF), Gray-05 (#F0F0F0), Gray-90 (#171717), Black (#000000)
- **Light/Dark modes**: Slides automatically switch based on system preference or `.darkmode` class
- **SVG backgrounds**: Use `cover-light.svg`/`cover-dark.svg` for cover slides, `slide-light.svg`/`slide-dark.svg` for regular slides
- All color combinations meet WCAG 2.2 AA contrast requirements

## When Editing Slides
- Keep slide count relative to the length of the presentation; maintain IDs for linking.
- Do not remove `shower fade-in duration=20 warn=5 hidemouse` on `<body>` unless timing changes are requested.
- If adding demos or QR codes, include alt text and a short label. Use placeholders if the asset is not yet available.
- There should be a Cover slide and a final Questions slide for each presentation. 

## External References
- Core links: Should be in the notes or in a reference slide for each presentation.
- If adding more references, prefer stable W3C or open GitHub sources; avoid proprietary gated links.

## Change Review Checklist
- Structure validated (slide/comment pairs, emerge lists where incremental).
- Accessibility: headings, alt text, link clarity, no color-only meaning.
- Narrative alignment: conflict/villain/hero/twist/call preserved.
- Timing: duration/warn classes intact; progress/clock elements present.

## Quality Assurance
Before committing changes to presentations:
- Run full QA: `npm run qa:all` (requires `npm install` in project root)
- Verify HTML validity: `npm run validate:html`
- Check links: `npm run check:links`
- Audit accessibility: `npm run scan:accessibility`
- Fix any landmarks errors (ensure unique labels) and heading order.

## Scope
- Edit source files in `/presentations/` only; do not edit generated output in `/_site`
- Keep paths and shortlinks stable; use redirects under `/p/` rather than moving content

## Scope to /presentations
- Do not apply any changes from this to the parent directory. Keep it to within the /presentations folder
- Each presentation should be able to run independently, assuming access to the /presentations/ca-slides folder
