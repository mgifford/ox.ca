# Druplicon Sprite Usage

## Overview

The `druplicon-sprite.svg` contains 162 unique Druplicon icons optimized for watermarks and backgrounds in presentations. Each icon has been normalized for dark/light mode compatibility with greyscale luminance preserved.

## How It Works

- **Color Normalization**: All fills and strokes converted to `currentColor`
- **Greyscale Preservation**: Original luminance mapped to opacity (0.000-1.000)
- **Format Support**: Both SVG and raster images (PNG/JPG/GIF embedded as data URIs)
- **Deduplication**: SHA1-based duplicate removal

## Using the Sprite

### 1. Random Icon Helper (GitHub Pages Compatible)

The easiest way to use random druplicons in your presentations:

```html
<!-- Include the helper script -->
<script src="ca-slides/assets/drupal/druplicon-random.js"></script>

<!-- Insert a random watermark -->
<div id="watermark"></div>
<script>
  DruplIconRandom.insert('#watermark');
</script>
```

CustomiManual Icon Reference (Specific Icons)

If you want to use a specific icon instead of random:

```html
<!-- Basic usage -->
<svg width="50" height="50">
  <use href="ca-slides/assets/drupal/druplicon-sprite.svg#druplicon-angry-drop_angry"/>
</svg>

<!-- With custom color (inherits from currentColor) -->
<svg width="100" height="100" style="color: #0678BE;">
  <use href="ca-slides/assets/drupal/druplicon-sprite.svg#druplicon-drupal-hero_drupal-20hero"/>
</svg>
```

See [druplicon-manifest.txt](druplicon-manifest.txt) for all 162 available icon IDs.

// Get random icon ID for manual use
const iconId = DruplIconRandom.getRandomId();
// Returns: 'druplicon-a11y_druplicon-a11y' (or any of the 162 available)

// Get multiple random icons
const iconIds = DruplIconRandom.getRandomIds(5);
// Returns: ['druplicon-angry-drop_angry', 'druplicon-drupal-hero_drupal-20hero', ...]
```

### 2. Reference Icons via `<use>`

```html
<!-- Basic usage -->
<svg width="50" height="50">
  <use href="ca-slides/assets/drupal/druplicon-sprite.svg#druplicon-angry-drop_angry"/>
</svg>

<!-- With custom color (inherits from currentColor) -->
<svg width="100" height="100" style="color: #0678BE;">
  <use href="ca-slides/assets/drupal/druplicon-sprite.svg#druplicon-drupal-hero_drupal-20hero"/>
</svg>
```

### 3. Watermark Background

```css
.slide {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cuse href='ca-slides/assets/drupal/druplicon-sprite.svg%23druplicon-brazil' opacity='0.1'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: bottom 20px right 20px;
  background-size: 200px 200px;
}
```

Or using inline SVG:

```html
<style>
.watermark {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 150px;
  height: 150px;
  opacity: 0.15;
  color: var(--text-color); /* Adapts to theme */
}
</style>

<svg class="watermark">
  <use href="ca-slides/assets/drupal/druplicon-sprite.svg#druplicon-drupal-lego-im-drupalin_drupal-lego-20majica"/>
</svg>
```

### 4. Dark/Light Mode Adaptation

The icons automatically adapt because they use `currentColor`:

```css
/* Light mode */
:root {
  --text-color: #000;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #fff;
  }
}

.druplicon {
  color: var(--text-color);
}
```

## Available Icons

See [`druplicon-manifest.txt`](druplicon-manifest.txt) for the full list of 162 icons.

Sample IDs:
- `druplicon-angry-drop_angry`
- `druplicon-drupal-hero_drupal-20hero`
- `druplicon-a11y_druplicon-a11y`
- `druplicon-drupal-europe-2018`
- `druplicon-drupalcon-szeged-2008_drupalcon_szeged2008`
- `druplicon-bootstrap-paragraphs`
- `druplicon-composer`

## Technical Details

- **Luminance Calculation**: `L = 0.2126*R + 0.7152*G + 0.0722*B` (ITU-R BT.709)
- **Opacity Range**: 0.000 (black) to 1.000 (white)
- **Raster Embedding**: Base64 data URIs within `<image>` elements
- **ViewBox**: Normalized to original dimensions or 100×100 for rasters

## Regenerating the Sprite

```bash
python3 scripts/build_druplicon_sprite.py
```

This will:
1. Scan `presentations/ca-slides/assets/drupal/originals/`
2. Deduplicate by SHA1 hash
3. Normalize SVG colors to currentColor with luminance-preserving opacity
4. Embed raster images as data URIs
5. Write `druplicon-sprite.svg` and `druplicon-manifest.txt`
