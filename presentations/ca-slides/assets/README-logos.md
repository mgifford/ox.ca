# CMS Logo Sprite Sheet

This directory contains tools to build a sprite sheet of monochrome logos for open source platforms.

## Quick Start

```bash
cd presentations/ca-slides/assets
python3 build-logo-sprite.py
```

This will:
1. Download logos from the URLs in `logo-sources.json`
2. Convert them to monochrome (black and white)
3. Create a sprite sheet in `cms-logos.svg`

## Adding New Logos

Edit `logo-sources.json` and add entries to existing categories or create new ones:

```json
{
  "cms": [
    {
      "name": "New CMS",
      "description": "Description of the platform",
      "url": "https://example.com/logo.svg"
    }
  ]
}
```

Categories are semantic groups like:
- `cms` - Traditional content management systems
- `headless_cms` - Headless/API-first CMS platforms
- `static_site_generators` - Static site builders
- `frameworks` - Web frameworks
- `social_platforms` - Social networking platforms
- `learning_platforms` - Educational platforms

## Removing Logos

Simply delete the entry from `logo-sources.json` and re-run the script.

## Finding Logo URLs

Best sources for open source project logos:
- **Wikimedia Commons**: https://commons.wikimedia.org/
- **Official project websites** (look for press/media kits)
- **GitHub repositories** (often in `/docs` or `/assets`)

Make sure to use SVG format when possible for best quality.

## File Structure

- `logo-sources.json` - Configuration with logo URLs
- `build-logo-sprite.py` - Script to build sprite sheet
- `cms-logos.svg` - Generated sprite sheet (output)
- `temp_logos/` - Temporary downloads (gitignored)

## License Considerations

All logos remain property of their respective owners. This tool is for creating visual references in presentations about open source software. Ensure you have appropriate rights to use any logo.
