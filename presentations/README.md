# Presentations
Slide decks for talks under `/presentations/`, built on W3C’s b6+ templates with a minimal theme.

## Framework
- **Template**: b6+ tooling from W3C (Overview in `/presentations/ca-slides/Overview.html`)
- **Runtime scripts**: `ca-slides/b6plus.js`, optional helpers loaded after it
- **Theme**: `ca-slides/slides.css` supports light/dark backgrounds and text colors

## Authoring
- Edit slides only in `/presentations/`; never edit generated files in `/_site`
- Keep `body` classes like `shower fade-in duration=20 warn=5 hidemouse` unless timing needs change
- Each deck should have a Cover, Resources, and Questions slide
- Use `class="next"` for staged reveals; keep headings in order and include alt text for images

## Assets
- **Druplicon sprite**: built from originals in `presentations/ca-slides/assets/drupal/originals`
	- Generated file: `presentations/ca-slides/assets/drupal/druplicon-sprite.svg`
	- Manifest: `presentations/ca-slides/assets/drupal/druplicon-manifest.txt`
	- Regenerate sprite:
		- `python scripts/build_druplicon_sprite.py`
- **QR codes**: under `presentations/qr-codes/` with SVG files referenced by slides

## Helpers
- **Druplicon Showcase**: `ca-slides/assets/drupal/druplicon-showcase.js`
	- Adds watermark icons to slides with `class="druplicon"` or `class="druplicon-watermark"`
	- Data attributes:
		- `data-druplicon-count` – number of icons per slide
		- `data-druplicon-opacity` – icon opacity (0–1)
		- `data-druplicon-scale-min` / `data-druplicon-scale-max` – icon size bounds (percent)
		- `data-druplicon-sequence="true"` on `<body>` to distribute icons sequentially across slides
- **Random Druplicon**: `ca-slides/assets/drupal/druplicon-random.js`
	- Provides `window.DruplIconRandom` utilities to insert or pick random sprite icons
- **CMS Showcase**: `ca-slides/cms-showcase.js` for non-Drupal logos
- **Details Popovers**: `ca-slides/details-popovers.js` for optional slide popovers

## Local Preview
- Serve from any static server or open files directly; dynamic sprite ID discovery runs only over http(s)
- GitHub Pages can host the `/presentations/` directory without additional setup

## QA
- Run in project root:
	- `npm install` once
	- `npm run qa:all` to validate HTML, links, and basic accessibility
	- Fix headings, alt text, and landmark labels before publishing

## References
- b6+: https://www.w3.org/Talks/Tools/b6plus/
- Shower: https://shwr.me/
