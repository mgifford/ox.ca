---
layout: default
title: Accessibility
permalink: /accessibility/
---

# Accessibility

## Our commitment

Accessibility is a subset of quality. This site targets [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) and we track issues publicly to stay accountable.

## Features

- **Light/dark mode** — inherits your operating system preference and lets you override it with the toggle in the header. Your choice is saved across visits.
- **Keyboard navigation** — all interactive elements are reachable by keyboard; focus indicators meet 3:1 contrast in both colour modes.
- **Forced-colours (high contrast)** — the theme toggle uses system colour keywords so it stays visible in Windows High Contrast mode.
- **Reduced motion** — theme transitions are disabled when `prefers-reduced-motion: reduce` is active.
- **Skip navigation** — not yet present; tracked as an open issue.
- **Semantic HTML** — one `<h1>` per page, headings nested in order, `<main>` landmark present.
- **Images** — every content image has descriptive `alt` text.
- **Link text** — links describe their destination rather than using generic phrases.

## Known limitations

| Area | Status |
| :--- | :--- |
| Skip-to-content link | Not yet implemented |
| ARIA live regions | Not yet audited |
| PDF documents | Not applicable — no PDFs are hosted here |
| Third-party embeds | Font Awesome icon font loaded from CDN; we do not control its accessibility |

## Automated testing

This site is checked on every push with:

- [pa11y-ci](https://github.com/pa11y/pa11y-ci) — WCAG 2.1 AA automated scan
- [Axe](https://github.com/dequelabs/axe-core) via Playwright
- [html-validate](https://html-validate.org/) — structural HTML validation
- [Lychee](https://lychee.climateaction.tech/) — broken link detection

## Reporting an issue

If you find an accessibility barrier, please [open an issue on GitHub](https://github.com/mgifford/ox.ca/issues) or [contact me directly](/). I aim to respond within five business days.

## Standards and references

- [WCAG 2.2 Understanding 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 Understanding 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
- [CSS `prefers-color-scheme` media query](https://www.w3.org/TR/mediaqueries-5/#prefers-color-scheme)
- [Light/Dark Mode Accessibility Best Practices](https://github.com/mgifford/ACCESSIBILITY.md/blob/main/examples/LIGHT_DARK_MODE_ACCESSIBILITY_BEST_PRACTICES.md)

Last updated: 2026-03-02
