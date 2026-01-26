#!/usr/bin/env python3
"""
Build CMS Logo Sprite Sheet
Downloads logos from sources and creates a monochrome SVG sprite sheet
Usage: python3 build-logo-sprite.py
"""

import json
import re
import urllib.request
import urllib.error
import base64
from pathlib import Path
from xml.etree import ElementTree as ET

# Configuration
SOURCE_FILE = Path(__file__).parent / "logo-sources.json"
OUTPUT_FILE = Path(__file__).parent / "cms-logos.svg"
TEMP_DIR = Path(__file__).parent / "temp_logos"
GRID_SIZE = 150  # Spacing between logos
LOGO_MAX_SIZE = 100  # Maximum width/height for each logo

def ensure_temp_dir():
    """Create temporary directory for downloads"""
    TEMP_DIR.mkdir(exist_ok=True)
    return TEMP_DIR

def download_logo(url, name):
    """Download logo from URL"""
    safe_name = re.sub(r'[^a-z0-9]+', '-', name.lower())
    ext = '.svg' if url.endswith('.svg') else '.png'
    output_path = TEMP_DIR / f"{safe_name}{ext}"
    
    if output_path.exists():
        print(f"✓ Already downloaded: {name}")
        return output_path
    
    try:
        print(f"Downloading {name} from {url}")
        headers = {'User-Agent': 'Mozilla/5.0 (CMS Logo Sprite Builder)'}
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            content = response.read()
            output_path.write_bytes(content)
        print(f"✓ Downloaded: {name}")
        return output_path
    except urllib.error.URLError as e:
        print(f"✗ Failed to download {name}: {e}")
        return None
    except Exception as e:
        print(f"✗ Error downloading {name}: {e}")
        return None

def rgb_to_grayscale(color_str):
    """Convert RGB/hex color to grayscale hex"""
    if not color_str or color_str in ['none', 'transparent', 'currentColor']:
        return color_str
    
    # Handle hex colors
    if color_str.startswith('#'):
        hex_color = color_str.lstrip('#')
        if len(hex_color) == 3:
            hex_color = ''.join([c*2 for c in hex_color])
        if len(hex_color) == 6:
            r, g, b = int(hex_color[0:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16)
            # Use luminance formula for better grayscale conversion
            gray = int(0.299 * r + 0.587 * g + 0.114 * b)
            return f'#{gray:02x}{gray:02x}{gray:02x}'
    
    # Handle rgb() colors
    rgb_match = re.match(r'rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)', color_str)
    if rgb_match:
        r, g, b = map(int, rgb_match.groups())
        gray = int(0.299 * r + 0.587 * g + 0.114 * b)
        return f'#{gray:02x}{gray:02x}{gray:02x}'
    
    # Default to black for unknown formats
    return '#000000'


def parse_color(color_str):
    """Return (r,g,b) for a color string or None"""
    if not color_str:
        return None
    s = color_str.strip().lower()
    if s in ['none', 'transparent', 'currentcolor', 'currentcolor']:
        return None
    if s.startswith('#'):
        hex_color = s.lstrip('#')
        if len(hex_color) == 3:
            hex_color = ''.join([c*2 for c in hex_color])
        if len(hex_color) == 6:
            try:
                r = int(hex_color[0:2], 16)
                g = int(hex_color[2:4], 16)
                b = int(hex_color[4:6], 16)
                return (r, g, b)
            except Exception:
                return None
    m = re.match(r'rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)', s)
    if m:
        return tuple(map(int, m.groups()))
    return None


def luminance(rgb):
    r, g, b = rgb
    return 0.299 * r + 0.587 * g + 0.114 * b

def convert_to_grayscale(svg_path, desired_shades=None):
    """Convert SVG colors to currentColor for theme support.

    If multiple distinct fills are present, preserve up to 3 tonal layers
    by mapping original colors to `fill-opacity` levels while setting
    `fill` and `stroke` to `currentColor`. This keeps multi-shade logos
    legible while still allowing theming via `currentColor`.
    """
    try:
        # Register SVG namespace
        ET.register_namespace('', 'http://www.w3.org/2000/svg')
        ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')
        
        tree = ET.parse(svg_path)
        root = tree.getroot()
        
        # First, collect distinct fill/stroke colors present in the SVG
        fills = []
        strokes = []
        for elem in root.iter():
            if 'fill' in elem.attrib:
                c = elem.attrib.get('fill')
                rgb = parse_color(c)
                if rgb:
                    fills.append((c, rgb))
            if 'stroke' in elem.attrib:
                c = elem.attrib.get('stroke')
                rgb = parse_color(c)
                if rgb:
                    strokes.append((c, rgb))
            if 'style' in elem.attrib:
                style = elem.attrib.get('style')
                m_fill = re.search(r'fill:\s*([^;]+)', style)
                m_stroke = re.search(r'stroke:\s*([^;]+)', style)
                if m_fill:
                    rgb = parse_color(m_fill.group(1))
                    if rgb:
                        fills.append((m_fill.group(1), rgb))
                if m_stroke:
                    rgb = parse_color(m_stroke.group(1))
                    if rgb:
                        strokes.append((m_stroke.group(1), rgb))
        unique_fills = {}
        for raw, rgb in fills:
            key = raw.strip().lower()
            unique_fills[key] = rgb

        unique_strokes = {}
        for raw, rgb in strokes:
            key = raw.strip().lower()
            unique_strokes[key] = rgb

        # Decide shading strategy: merge fills+strokes colors and create up to 3 shade bins
        color_items = list({**unique_fills, **unique_strokes}.items())
        # color_items: list of (color_str, (r,g,b))
        shade_map = {}  # color_str -> opacity
        special_handled = False
        # If no explicit colors were found but the caller requested 2 shades,
        # enable the alternate two-shade fallback so we can duplicate/alternate
        # elements to give a two-tone appearance.
        if len(color_items) == 0 and desired_shades == 2:
            need_alternate = True
            alternate_opacities = [1.0, 0.7]
            # Build parent map and eligible list for possible cloning
            parent_map = {c: p for p in root.iter() for c in list(p)}
            eligible = []
            for e in root.iter():
                has_fill = 'fill' in e.attrib and e.attrib['fill'].strip().lower() not in ['none', 'transparent', 'currentcolor']
                style = e.attrib.get('style', '')
                has_style_fill = bool(re.search(r'fill:\s*([^;]+)', style))
                if has_fill or has_style_fill:
                    eligible.append(e)
            if len(eligible) == 1:
                src = eligible[0]
                parent = parent_map.get(src, root)
                try:
                    clone = ET.fromstring(ET.tostring(src))
                    siblings = list(parent)
                    try:
                        idx = siblings.index(src)
                    except ValueError:
                        idx = len(siblings)
                    parent.insert(idx + 1, clone)
                except Exception:
                    pass
            # Continue to application step with need_alternate True
            # (shade_map stays empty)
        

        # If there is only one color and the caller did NOT request 2 shades,
        # keep single-tone behavior. If the caller requested 2 shades, fall
        # through to the multi-shade logic so we can apply an alternate
        # two-tone treatment even for single-shape icons.
        if special_handled:
            # Already handled (e.g. no parseable colors but two-shade fallback applied)
            pass
        elif (len(color_items) <= 1 and desired_shades != 2) or desired_shades == 1:
            # Single-tone: convert everything to currentColor with full opacity
            for elem in root.iter():
                if 'fill' in elem.attrib:
                    val = elem.attrib['fill']
                    if val and val.lower() not in ['none', 'transparent']:
                        elem.attrib['fill'] = 'currentColor'
                        if 'fill-opacity' in elem.attrib:
                            del elem.attrib['fill-opacity']
                if 'stroke' in elem.attrib:
                    val = elem.attrib['stroke']
                    if val and val.lower() not in ['none', 'transparent']:
                        elem.attrib['stroke'] = 'currentColor'
                        if 'stroke-opacity' in elem.attrib:
                            del elem.attrib['stroke-opacity']
                if 'style' in elem.attrib:
                    style = elem.attrib['style']
                    style = re.sub(r'fill:\s*([^;]+)', 'fill:currentColor', style)
                    style = re.sub(r'stroke:\s*([^;]+)', 'stroke:currentColor', style)
                    elem.attrib['style'] = style
        else:
            # Create luminance-sorted list
            cols = [(k, v, luminance(v)) for k, v in color_items]
            cols.sort(key=lambda x: x[2])  # dark -> light

            reps = []
            opacities = []
            if not cols:
                # No parsed colors — leave reps empty and rely on alternate fallback
                reps = []
                opacities = []
            elif desired_shades == 2:
                reps = [cols[0], cols[-1]]
                opacities = [1.0, 0.7]
            else:
                # Default: up to 3 representatives (dark, median, light)
                if len(cols) <= 3:
                    reps = cols
                else:
                    reps = [cols[0], cols[len(cols)//2], cols[-1]]
                opacities = [1.0, 0.7, 0.35]

            rep_map = {r[0]: opacities[i] for i, r in enumerate(reps)} if reps else {}

            # For any original color, find nearest representative by luminance
            for key, rgb in dict(unique_fills, **unique_strokes).items():
                lum = luminance(rgb)
                closest = min(reps, key=lambda r: abs(r[2] - lum))
                shade_map[key] = rep_map[closest[0]]

            # If the user requested 2 shades but the shade_map collapsed to a single opacity,
            # prepare to alternate opacities across eligible elements so the logo appears two-tone.
            need_alternate = False
            if desired_shades == 2 and len(set(shade_map.values())) < 2:
                need_alternate = True
                alternate_opacities = [1.0, 0.7]
                alt_counter = 0

                # Build parent map so we can clone an element into the same parent if needed
                parent_map = {c: p for p in root.iter() for c in list(p)}
                # Find eligible elements that will receive fill/stroke
                eligible = []
                for e in root.iter():
                    has_fill = 'fill' in e.attrib and e.attrib['fill'].strip().lower() not in ['none', 'transparent', 'currentcolor']
                    style = e.attrib.get('style', '')
                    has_style_fill = bool(re.search(r'fill:\s*([^;]+)', style))
                    if has_fill or has_style_fill:
                        eligible.append(e)

                # If only one eligible element, duplicate it so alternating opacities have effect
                if len(eligible) == 1:
                    src = eligible[0]
                    parent = parent_map.get(src, root)
                    try:
                        clone = ET.fromstring(ET.tostring(src))
                        # insert clone immediately after source element
                        siblings = list(parent)
                        try:
                            idx = siblings.index(src)
                        except ValueError:
                            idx = len(siblings)
                        parent.insert(idx + 1, clone)
                    except Exception:
                        # if cloning fails, fall back to alternating without clone
                        pass

            # Now walk elements and apply currentColor + fill-opacity/stroke-opacity according to mapping
            for elem in root.iter():
                # fill attribute
                if 'fill' in elem.attrib:
                    raw = elem.attrib['fill'].strip().lower()
                    if raw not in ['none', 'transparent', 'currentcolor']:
                        elem.attrib['fill'] = 'currentColor'
                        if need_alternate:
                            elem.attrib['fill-opacity'] = str(alternate_opacities[alt_counter % 2])
                            alt_counter += 1
                        elif raw in shade_map:
                            elem.attrib['fill-opacity'] = str(shade_map[raw])
                # stroke attribute
                if 'stroke' in elem.attrib:
                    raw = elem.attrib['stroke'].strip().lower()
                    if raw not in ['none', 'transparent', 'currentcolor']:
                        elem.attrib['stroke'] = 'currentColor'
                        if need_alternate:
                            elem.attrib['stroke-opacity'] = str(alternate_opacities[alt_counter % 2])
                            alt_counter += 1
                        elif raw in shade_map:
                            elem.attrib['stroke-opacity'] = str(shade_map[raw])
                # style attr
                if 'style' in elem.attrib:
                    style = elem.attrib['style']
                    m_fill = re.search(r'fill:\s*([^;]+)', style)
                    if m_fill:
                        raw = m_fill.group(1).strip().lower()
                        if raw not in ['none', 'transparent', 'currentcolor']:
                            style = re.sub(r'fill:\s*([^;]+)', 'fill:currentColor', style)
                            if raw in shade_map:
                                style = style + f';fill-opacity:{shade_map[raw]} '
                    m_stroke = re.search(r'stroke:\s*([^;]+)', style)
                    if m_stroke:
                        raw = m_stroke.group(1).strip().lower()
                        if raw not in ['none', 'transparent', 'currentcolor']:
                            style = re.sub(r'stroke:\s*([^;]+)', 'stroke:currentColor', style)
                            if raw in shade_map:
                                style = style + f';stroke-opacity:{shade_map[raw]} '
                    elem.attrib['style'] = style
        
        return tree
    except ET.ParseError as e:
        print(f"✗ Failed to parse SVG: {e}")
        return None
    except Exception as e:
        print(f"✗ Error converting to currentColor: {e}")
        return None

def get_svg_viewbox(tree):
    """Extract viewBox from SVG"""
    root = tree.getroot()
    viewbox = root.get('viewBox')
    if viewbox:
        return [float(x) for x in viewbox.split()]
    
    # Try to construct from width/height
    width = root.get('width', '100')
    height = root.get('height', '100')
    width = re.sub(r'[^0-9.]', '', width)
    height = re.sub(r'[^0-9.]', '', height)
    return [0, 0, float(width or 100), float(height or 100)]

def convert_png_to_svg(png_path, max_size=100):
    """Convert PNG to embedded SVG with base64 encoding and theme support"""
    try:
        # Read PNG file
        png_data = png_path.read_bytes()
        b64_data = base64.b64encode(png_data).decode('ascii')
        
        # Create SVG wrapper with filters for light/dark mode
        svg_str = f'''<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {max_size} {max_size}" width="{max_size}" height="{max_size}" class="png-logo">
  <defs>
    <filter id="theme-light">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="0.8"/>
        <feFuncG type="linear" slope="0.8"/>
        <feFuncB type="linear" slope="0.8"/>
      </feComponentTransfer>
    </filter>
    <filter id="theme-dark">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.5" intercept="0.2"/>
        <feFuncG type="linear" slope="1.5" intercept="0.2"/>
        <feFuncB type="linear" slope="1.5" intercept="0.2"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <image href="data:image/png;base64,{b64_data}" width="{max_size}" height="{max_size}" 
         class="theme-aware" preserveAspectRatio="xMidYMid meet"/>
</svg>'''
        
        # Parse as ElementTree
        return ET.ElementTree(ET.fromstring(svg_str))
    except Exception as e:
        print(f"✗ Error converting PNG: {e}")
        return None

def build_sprite_sheet(sources_data):
    """Build the complete sprite sheet"""
    ensure_temp_dir()
    
    # Create root SVG element
    NS = {'svg': 'http://www.w3.org/2000/svg'}
    ET.register_namespace('', NS['svg'])
    
    root = ET.Element('svg', {
        'viewBox': '0 0 1200 1200',
        'width': '1200',
        'height': '1200',
        'class': 'logo-sprite'
    })

    # Add CSS for light/dark mode theming
    style = ET.SubElement(root, 'style')
    style.text = '''
        /* Default: dark text for light backgrounds */
        .logo-sprite { color: #2d2d2d; }

        /* Dark mode: light text for dark backgrounds */
        @media (prefers-color-scheme: dark) {
            .logo-sprite { color: #cccccc; }
            .logo-sprite .png-logo .theme-aware { filter: url(#theme-dark); }
        }

        /* Explicit theme classes */
        .logo-sprite.theme-light { color: #2d2d2d; }
        .logo-sprite.theme-light .png-logo .theme-aware { filter: url(#theme-light); }
        .logo-sprite.theme-dark { color: #cccccc; }
        .logo-sprite.theme-dark .png-logo .theme-aware { filter: url(#theme-dark); }

        /* Default PNG filter for light mode */
        .png-logo .theme-aware { filter: url(#theme-light); }
    '''

    # Add title and description
    title = ET.SubElement(root, 'title')
    title.text = 'Open Source Platform Logos'
    desc = ET.SubElement(root, 'desc')
    desc.text = 'Monochrome logos for open source content management systems, frameworks, and platforms'
    
    # Position tracking
    x_offset = 50
    y_offset = 50
    max_x = 0
    row_height = 0
    
    # Process each category
    for category, items in sources_data.items():
        print(f"\n{'='*60}")
        print(f"Processing category: {category}")
        print(f"{'='*60}")
        
        for item in items:
            name = item['name']
            description = item['description']
            url = item['url']
            
            # Download logo
            logo_path = download_logo(url, name)
            if not logo_path or not logo_path.exists():
                continue
            
            # Handle PNG files
            if logo_path.suffix == '.png':
                tree = convert_png_to_svg(logo_path, LOGO_MAX_SIZE)
                if not tree:
                    print(f"⚠ Skipping {name}: PNG conversion failed")
                    continue
            else:
                # Convert SVG to grayscale; allow per-item shade overrides
                tree = convert_to_grayscale(logo_path, item.get('shades'))
                if not tree:
                    continue
            
            # Get original viewBox
            viewbox = get_svg_viewbox(tree)
            vb_width = viewbox[2] - viewbox[0]
            vb_height = viewbox[3] - viewbox[1]
            
            # Calculate scaling to fit in LOGO_MAX_SIZE
            scale = min(LOGO_MAX_SIZE / vb_width, LOGO_MAX_SIZE / vb_height)
            scaled_width = vb_width * scale
            scaled_height = vb_height * scale
            
            # Create group for this logo
            group = ET.SubElement(root, 'g', {
                'id': re.sub(r'[^a-z0-9]+', '-', name.lower()),
                'transform': f'translate({x_offset}, {y_offset})'
            })
            
            # Add title and description
            g_title = ET.SubElement(group, 'title')
            g_title.text = name
            g_desc = ET.SubElement(group, 'desc')
            g_desc.text = description
            
            # Add logo content with viewBox preserved
            logo_root = tree.getroot()
            logo_svg = ET.SubElement(group, 'svg', {
                'width': str(scaled_width),
                'height': str(scaled_height),
                'viewBox': f"{viewbox[0]} {viewbox[1]} {vb_width} {vb_height}",
                'preserveAspectRatio': 'xMidYMid meet'
            })
            
            # Copy all child elements
            for child in logo_root:
                logo_svg.append(child)
            
            print(f"✓ Added {name} at ({x_offset}, {y_offset})")
            
            # Update position for next logo
            x_offset += GRID_SIZE
            row_height = max(row_height, scaled_height)
            
            # Move to next row if needed
            if x_offset > 1100:
                x_offset = 50
                y_offset += GRID_SIZE
                row_height = 0
    
    # Calculate actual SVG dimensions
    final_height = y_offset + GRID_SIZE if row_height > 0 else y_offset
    root.set('viewBox', f'0 0 1200 {final_height}')
    root.set('height', str(final_height))
    
    # Write output file
    tree = ET.ElementTree(root)
    ET.indent(tree, space='  ')
    tree.write(OUTPUT_FILE, encoding='utf-8', xml_declaration=True)
    
    print(f"\n{'='*60}")
    print(f"✓ Sprite sheet created: {OUTPUT_FILE}")
    print(f"  Dimensions: 1200 × {final_height}")
    print(f"{'='*60}")

def main():
    """Main execution"""
    print("CMS Logo Sprite Builder")
    print("=" * 60)
    
    # Load sources
    if not SOURCE_FILE.exists():
        print(f"✗ Source file not found: {SOURCE_FILE}")
        return
    
    with open(SOURCE_FILE) as f:
        sources_data = json.load(f)
    
    print(f"✓ Loaded {sum(len(items) for items in sources_data.values())} logos from {len(sources_data)} categories")
    
    # Build sprite sheet
    build_sprite_sheet(sources_data)
    
    print("\nTo add more logos:")
    print(f"  1. Edit {SOURCE_FILE.name}")
    print("  2. Add entries to existing categories or create new ones")
    print("  3. Run this script again")

if __name__ == '__main__':
    main()
