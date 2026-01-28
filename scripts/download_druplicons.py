#!/usr/bin/env python3
"""Download druplicon images from topic pages.

Usage: python3 scripts/download_druplicons.py

This script fetches druplicon links from the topic pages and downloads
the primary image (preferring SVG) into the presentations/ca-slides/assets/drupal/originals folder.
"""
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
import urllib.request
import os
import sys

TOPIC_URLS = [
    'https://www.druplicon.org/druplicons?item[0]=topics:11',
    'https://www.druplicon.org/druplicons?item[0]=topics:13',
    'https://www.druplicon.org/druplicons?item[0]=topics:1',
    'https://www.druplicon.org/druplicons?item[0]=topics:18',
]

# Also crawl the main druplicons index pages (pagination) to gather more items
PAGINATE_PAGES = 10


BASE = 'https://www.druplicon.org'
OUTDIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'presentations', 'ca-slides', 'assets', 'drupal', 'originals')
os.makedirs(OUTDIR, exist_ok=True)


class HrefImgParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
        self.imgs = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs:
            self.hrefs.append(attrs['href'])
        if tag == 'img' and 'src' in attrs:
            self.imgs.append(attrs['src'])


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'druplicon-downloader/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8', errors='ignore')


def find_druplicon_links(topic_html):
    p = HrefImgParser()
    p.feed(topic_html)
    links = []
    for h in p.hrefs:
        if '/druplicon/' in h:
            full = urljoin(BASE, h)
            if full not in links:
                links.append(full)
    return links


def find_druplicon_links_paginated():
    links = []
    for page in range(PAGINATE_PAGES):
        url = f'https://www.druplicon.org/druplicons?page={page}'
        try:
            html = fetch(url)
        except Exception:
            break
        new = find_druplicon_links(html)
        if not new:
            break
        for n in new:
            if n not in links:
                links.append(n)
    return links


def find_best_image(page_html, page_url):
    p = HrefImgParser()
    p.feed(page_html)
    imgs = [urljoin(page_url, src) for src in p.imgs]
    # filter for actual druplicon artwork in /druplicons/ folder
    imgs = [i for i in imgs if '/files/druplicons/' in i]
    # prefer svg, then png, then jpg
    for ext in ('.svg', '.png', '.jpg', '.jpeg'):
        for img in imgs:
            if img.lower().split('?')[0].endswith(ext):
                return img
    # fallback: return first match
    return imgs[0] if imgs else None


def download(url, outdir, slug):
    parsed = urlparse(url)
    name = os.path.basename(parsed.path)
    if not name or name == 'image':
        ext = '.svg' if '.svg' in url else '.png' if '.png' in url else '.jpg'
        name = f"{slug}{ext}"
    else:
        # prefix with slug to avoid collisions
        base, ext = os.path.splitext(name)
        name = f"{slug}_{base}{ext}"
    target = os.path.join(outdir, name)
    # avoid re-downloading
    if os.path.exists(target):
        return target
    try:
        urllib.request.urlretrieve(url, target)
        return target
    except Exception as e:
        print('download failed', url, e, file=sys.stderr)
        return None


def main():
    seen = set()
    meta = []
    # Collect links from topic pages and from the main paginated index
    all_links = []
    for topic in TOPIC_URLS:
        print('Fetching topic', topic)
        try:
            html = fetch(topic)
        except Exception as e:
            print('Failed to fetch topic', topic, e, file=sys.stderr)
            continue
        links = find_druplicon_links(html)
        print('Found', len(links), 'druplicon links')
        for link in links:
            if link in seen:
                continue
            seen.add(link)
            # extract slug from URL
            slug = link.rstrip('/').split('/')[-1]
            print('Processing', link)
            try:
                ph = fetch(link)
            except Exception as e:
                print('  failed to fetch page', e, file=sys.stderr)
                continue
            img = find_best_image(ph, link)
            if not img:
                print('  no image found for', link)
                continue
            print('  image ->', img)
            saved = download(img, OUTDIR, slug)
            meta.append((link, img, saved))

    # paginated index
    print('Fetching paginated index pages...')
    pagelinks = find_druplicon_links_paginated()
    print('Found', len(pagelinks), 'paginated links')
    for link in pagelinks:
        if link in seen:
            continue
        seen.add(link)
        print('Processing', link)
        try:
            ph = fetch(link)
        except Exception as e:
            print('  failed to fetch page', e, file=sys.stderr)
            continue
        img = find_best_image(ph, link)
        if not img:
            print('  no image found for', link)
            continue
        print('  image ->', img)
        # Use page slug to create unique filename
        slug = urlparse(link).path.rstrip('/').split('/')[-1] or 'druplicon'
        ext = os.path.splitext(urlparse(img).path)[1] or '.svg'
        target_name = f"{slug}{ext}"
        target_path = os.path.join(OUTDIR, target_name)
        # avoid overwriting existing files with same name; add counter
        i = 1
        base_target = target_path
        while os.path.exists(target_path):
            target_path = os.path.join(OUTDIR, f"{slug}-{i}{ext}")
            i += 1
        try:
            urllib.request.urlretrieve(img, target_path)
            saved = target_path
        except Exception as e:
            print('download failed', img, e, file=sys.stderr)
            saved = None
        meta.append((link, img, saved))

    # write metadata
    metafile = os.path.join(OUTDIR, 'druplicons_metadata.csv')
    with open(metafile, 'w', encoding='utf-8') as fh:
        fh.write('page_url,image_url,saved_path\n')
        for page, image, saved in meta:
            fh.write(f'"{page}","{image}","{saved or ""}"\n')
    print('Done. Saved', len(meta), 'items to', OUTDIR)


if __name__ == '__main__':
    main()
