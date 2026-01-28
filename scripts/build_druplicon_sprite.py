#!/usr/bin/env python3
"""Build an SVG sprite from downloaded druplicon images (SVG + raster).

Writes `presentations/ca-slides/assets/drupal/druplicon-sprite.svg`.
Normalizes fills/strokes to `currentColor` with opacity preserving greyscale luminance.
Works in light/dark modes. Deduplicates files by SHA1.
Embeds raster images (PNG/JPG/GIF) as data URIs.
"""
import os
import re
import hashlib
import base64

BASE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'presentations', 'ca-slides', 'assets', 'drupal')
IN_DIR = os.path.join(BASE, 'originals')
OUT_SVG = os.path.join(BASE, 'druplicon-sprite.svg')

def sha1_file(path):
    """Compute SHA1 hash of file for deduplication."""
    h = hashlib.sha1()
    with open(path, 'rb') as f:
        while True:
            b = f.read(8192)
            if not b:
                break
            h.update(b)
    return h.hexdigest()

def rgb_to_luminance(r, g, b):
    """Convert RGB (0-255) to relative luminance (0-1) using standard weights."""
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255.0

def parse_color_to_luminance(color_str):
    """Parse CSS color and return luminance (0-1), or None if transparent/none."""
    if not color_str or color_str.strip().lower() in ('none', 'transparent'):
        return None
    
    color_str = color_str.strip().lower()
    
    # Hex: #RRGGBB or #RGB
    if color_str.startswith('#'):
        hex_val = color_str[1:]
        if len(hex_val) == 3:
            r, g, b = [int(c*2, 16) for c in hex_val]
        elif len(hex_val) == 6:
            r = int(hex_val[0:2], 16)
            g = int(hex_val[2:4], 16)
            b = int(hex_val[4:6], 16)
        else:
            return 0.5  # fallback
        return rgb_to_luminance(r, g, b)
    
    # rgb(r, g, b)
    m = re.match(r'rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)', color_str)
    if m:
        r, g, b = map(int, m.groups())
        return rgb_to_luminance(r, g, b)
    
    # Named colors (partial list)
    named = {
        'black': 0.0, 'white': 1.0, 'gray': 0.5, 'grey': 0.5,
        'red': 0.2126, 'green': 0.7152, 'blue': 0.0722,
    }
    return named.get(color_str, 0.5)  # default to mid-grey

def normalize_svg(svg_text):
    """Parse SVG and normalize colors to currentColor with luminance-based opacity."""
    # Remove XML declaration
    svg_text = re.sub(r'<\?xml[^>]+\?>', '', svg_text)
    
    # Find svg tag
    m = re.search(r'<svg([^>]*)>(.*)</svg>', svg_text, flags=re.S)
    if not m:
        return None, None
    
    attrs = m.group(1)
    inner = m.group(2).strip()
    
    # Extract viewBox if present
    vb = None
    mv = re.search(r'viewBox="([^"]+)"', attrs)
    if mv:
        vb = mv.group(1)
    else:
        # Try width/height
        mw = re.search(r'width="([^"]+)"', attrs)
        mh = re.search(r'height="([^"]+)"', attrs)
        if mw and mh:
            try:
                w = float(re.sub(r'[^0-9.]', '', mw.group(1)))
                h = float(re.sub(r'[^0-9.]', '', mh.group(1)))
                vb = f'0 0 {int(w)} {int(h)}'
            except Exception:
                vb = None
    
    # Normalize fills with greyscale preservation
    def replace_fill_attr(m):
        color = m.group(1).strip()
        lum = parse_color_to_luminance(color)
        if lum is None:
            return 'fill="none"'
        return f'fill="currentColor" opacity="{lum:.3f}"'
    
    def replace_fill_style(m):
        color = m.group(1).strip()
        lum = parse_color_to_luminance(color)
        if lum is None:
            return 'fill:none;'
        return f'fill:currentColor;opacity:{lum:.3f};'
    
    def replace_stroke_attr(m):
        color = m.group(1).strip()
        lum = parse_color_to_luminance(color)
        if lum is None:
            return 'stroke="none"'
        return f'stroke="currentColor" opacity="{lum:.3f}"'
    
    def replace_stroke_style(m):
        color = m.group(1).strip()
        lum = parse_color_to_luminance(color)
        if lum is None:
            return 'stroke:none;'
        return f'stroke:currentColor;opacity:{lum:.3f};'
    
    # Apply replacements
    inner = re.sub(r'fill="([^"]+)"', replace_fill_attr, inner)
    inner = re.sub(r'fill\s*:\s*([^;"\']+);?', replace_fill_style, inner)
    inner = re.sub(r'stroke="([^"]+)"', replace_stroke_attr, inner)
    inner = re.sub(r'stroke\s*:\s*([^;"\']+);?', replace_stroke_style, inner)
    
    return vb or '0 0 100 100', inner

def slugify(name):
    """Convert filename to valid CSS ID."""
    return re.sub(r'[^a-z0-9_-]', '-', name.lower())

def embed_raster_as_svg(path, symbol_id):
    """Convert raster image to SVG symbol with data URI."""
    ext = os.path.splitext(path)[1].lower()
    mime_types = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif'
    }
    mime = mime_types.get(ext)
    if not mime:
        return None
    
    try:
        with open(path, 'rb') as f:
            data = base64.b64encode(f.read()).decode('ascii')
        # Use standard viewBox; actual image will scale
        return f'<symbol id="{symbol_id}" viewBox="0 0 100 100"><image href="data:{mime};base64,{data}" width="100" height="100"/></symbol>'
    except Exception as e:
        print(f'  Error embedding {path}: {e}')
        return None

def main():
    if not os.path.isdir(IN_DIR):
        print('No originals directory:', IN_DIR)
        return
    
    # Deduplicate by sha1
    seen = {}
    symbols = []
    manifest = []
    
    for fn in sorted(os.listdir(IN_DIR)):
        path = os.path.join(IN_DIR, fn)
        if not os.path.isfile(path):
            continue
        
        ext = os.path.splitext(fn)[1].lower()
        if ext not in ('.svg', '.png', '.jpg', '.jpeg', '.gif'):
            continue
        
        h = sha1_file(path)
        if h in seen:
            print(f'Skipping duplicate: {fn} (same as {seen[h]})')
            continue
        seen[h] = fn
        
        name = os.path.splitext(fn)[0]
        symbol_id = 'druplicon-' + slugify(name)
        
        if ext == '.svg':
            # Process SVG with color normalization
            with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
                txt = fh.read()
            vb, inner = normalize_svg(txt)
            if inner is None:
                print(f'Skipping invalid SVG: {fn}')
                continue
            symbol = f'<symbol id="{symbol_id}" viewBox="{vb}">{inner}</symbol>'
            symbols.append(symbol)
            manifest.append(f'{symbol_id}: {fn} (SVG, normalized)')
            print(f'Added SVG: {symbol_id}')
        else:
            # Embed raster image
            symbol = embed_raster_as_svg(path, symbol_id)
            if symbol:
                symbols.append(symbol)
                manifest.append(f'{symbol_id}: {fn} (embedded raster)')
                print(f'Added raster: {symbol_id}')
    
    # Write sprite
    with open(OUT_SVG, 'w', encoding='utf-8') as out:
        out.write('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none">\n')
        for s in symbols:
            out.write(s + '\n')
        out.write('</svg>\n')
    
    # Write manifest
    manifest_path = os.path.join(BASE, 'druplicon-manifest.txt')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(manifest))
    
    print(f'\nWrote sprite with {len(symbols)} symbols to {OUT_SVG}')
    print(f'Manifest written to {manifest_path}')

if __name__ == '__main__':
    main()
