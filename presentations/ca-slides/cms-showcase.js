/**
 * CMS Showcase - Displays open source authoring tools in a right sidebar
 * Add class="cms-showcase" to any slide to display a random CMS
 */
(function() {
  'use strict';

  const openSourceCMS = [
    { name: 'Drupal', url: 'https://www.drupal.org/' },
    { name: 'WordPress', url: 'https://wordpress.org/' },
    { name: 'Joomla', url: 'https://www.joomla.org/' },
    { name: 'TYPO3', url: 'https://typo3.org/' },
    { name: 'Plone', url: 'https://plone.org/' },
    { name: 'Backdrop CMS', url: 'https://backdropcms.org/' },
    { name: 'Concrete CMS', url: 'https://www.concretecms.org/' },
    { name: 'ProcessWire', url: 'https://processwire.com/' },
    { name: 'Craft CMS', url: 'https://craftcms.com/' },
    { name: 'Grav', url: 'https://getgrav.org/' },
    { name: 'October CMS', url: 'https://octobercms.com/' },
    { name: 'Silverstripe', url: 'https://www.silverstripe.org/' },
    { name: 'Statamic', url: 'https://statamic.com/' },
    { name: 'Ghost', url: 'https://ghost.org/' },
    { name: 'Strapi', url: 'https://strapi.io/' },
    { name: 'Directus', url: 'https://directus.io/' },
    { name: 'Wagtail', url: 'https://wagtail.org/' },
    { name: 'Netlify CMS', url: 'https://www.netlifycms.org/' },
    { name: 'Hugo', url: 'https://gohugo.io/' },
    { name: 'Jekyll', url: 'https://jekyllrb.com/' },
    { name: 'Eleventy', url: 'https://www.11ty.dev/' },
    { name: 'Gatsby', url: 'https://www.gatsbyjs.com/' },
    { name: 'Next.js', url: 'https://nextjs.org/' },
    { name: 'Astro', url: 'https://astro.build/' }
  ];

  function getRandomCMS() {
    return openSourceCMS[Math.floor(Math.random() * openSourceCMS.length)];
  }

  function addCMSToSlide(slide) {
    // If a watermark container already exists, skip
    if (slide.querySelector('.cms-watermark')) return;

    // Configuration via data attributes
    const count = parseInt(slide.dataset.logoCount || slide.dataset.logoCount === 0 ? slide.dataset.logoCount : 6, 10) || 6;
    const opacity = parseFloat(slide.dataset.logoOpacity || 0.08);
    const minScale = parseFloat(slide.dataset.logoScaleMin || 6); // percent
    const maxScale = parseFloat(slide.dataset.logoScaleMax || 16); // percent

    // Create watermark wrapper that fills the slide and sits behind content
    const wrapper = document.createElement('div');
    wrapper.className = 'cms-watermark';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `;

    // Helper: create an inline SVG node by cloning the group from the generated sprite
    function createLogoNode(item, sizePct, leftPct, topPct, rotationDeg) {
      const idCandidate = item.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '').replace(/_/g, '-');

      const el = document.createElement('div');
      el.className = 'cms-watermark-logo';
      el.style.cssText = `
        position: absolute;
        left: ${leftPct}%;
        top: ${topPct}%;
        transform: translate(-50%, -50%) rotate(${rotationDeg}deg);
        width: ${sizePct}%;
        height: auto;
        opacity: ${opacity};
        mix-blend-mode: multiply;
        filter: grayscale(100%) contrast(0.9) brightness(1.1);
        pointer-events: none;
      `;

      // If we have the sprite document loaded, try to inline the matching group/svg
      const spriteDoc = window._cmsLogoSpriteDoc;
      if (spriteDoc) {
        // Prefer direct id lookup
        let group = spriteDoc.getElementById(idCandidate);
        if (!group) {
          // Fallback: find by title text
          const titles = spriteDoc.querySelectorAll('title');
          for (let t of titles) {
            if (t.textContent && t.textContent.trim().toLowerCase() === item.name.toLowerCase()) {
              group = t.parentElement || t.closest('g');
              break;
            }
          }
        }

        if (group) {
          // If the group contains an inner <svg>, clone that; otherwise clone the group contents
          const innerSvg = group.querySelector('svg');
          if (innerSvg) {
            const clone = innerSvg.cloneNode(true);
            clone.removeAttribute('id');
            clone.style.width = '100%';
            clone.style.height = 'auto';
            el.appendChild(clone);
            return el;
          } else {
            // Build a wrapper svg
            const outer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            outer.setAttribute('viewBox', group.getAttribute('data-viewbox') || '0 0 100 100');
            outer.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            outer.style.width = '100%';
            outer.style.height = 'auto';
            // Clone children
            Array.from(group.childNodes).forEach(node => {
              outer.appendChild(node.cloneNode(true));
            });
            el.appendChild(outer);
            return el;
          }
        }
      }

      // Fallback: remote image
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.name;
      img.style.width = '100%';
      img.style.height = 'auto';
      el.appendChild(img);
      return el;
    }

    // If logoSources are loaded, use them; otherwise fall back to the embedded list above
    const sources = window._logoSourcesCache || window.openSourceCMS || [];
    // If window.openSourceCMS exists (legacy), map to items with url=null
    let items = [];
    if (Array.isArray(sources) && sources.length > 0 && sources[0].name) {
      // Likely from logo-sources.json already loaded into _logoSourcesCache
      items = sources;
    } else if (window.logoSources && Array.isArray(window.logoSources)) {
      items = window.logoSources;
    } else {
      // Fallback: build a minimal list from the names in the old array
      items = [{name: 'Drupal', url: 'ca-slides/assets/cms-logos.svg#drupal'}, {name: 'WordPress', url: 'ca-slides/assets/cms-logos.svg#wordpress'}, {name: 'Ghost', url: 'ca-slides/assets/cms-logos.svg#ghost'}];
    }

    // Determine how many logos to place.
    // If the slide explicitly sets `data-logo-count`, use that (clamped).
    // Otherwise pick a random number between 2 and 5.
    let pickCount;
    if (typeof slide.dataset.logoCount !== 'undefined' && slide.dataset.logoCount !== '') {
      pickCount = Math.max(1, Math.min(20, parseInt(slide.dataset.logoCount, 10) || 6));
    } else {
      pickCount = Math.floor(Math.random() * 4) + 2; // 2..5
    }

    // Place logos while avoiding overlap where possible. We'll attempt a few times per logo
    // to find a non-overlapping position; after `maxAttempts` we accept the last placement.
    const placedBoxes = [];
    const slideWidth = slide.clientWidth || slide.offsetWidth || 1000;
    const slideHeight = slide.clientHeight || slide.offsetHeight || 600;
    const maxAttempts = 12;
    const paddingPx = 8; // padding between logos

    // Keep track of names placed on this slide to avoid duplicates
    const slideChosen = new Set();
    for (let i = 0; i < pickCount; i++) {
      // choose an item biased toward those with the lowest global usage to ensure even coverage
      const size = (Math.random() * (maxScale - minScale)) + minScale; // percent

      // Build candidate pool excluding names already placed on this slide
      let candidates = items.filter(it => it && it.name && !slideChosen.has(it.name));
      if (candidates.length === 0) candidates = items.slice();

      // compute minimum usage among candidates
      let minUsage = Infinity;
      candidates.forEach(c => {
        const n = (window._logoUsageMap && window._logoUsageMap[c.name]) || 0;
        if (n < minUsage) minUsage = n;
      });

      // narrow to candidates with usage == minUsage
      const minCandidates = candidates.filter(c => ((window._logoUsageMap && window._logoUsageMap[c.name]) || 0) === minUsage);
      let chosen = null;
      if (minCandidates.length > 0) chosen = minCandidates[Math.floor(Math.random() * minCandidates.length)];
      if (!chosen) chosen = items[Math.floor(Math.random() * items.length)];

      let attempt = 0;
      let leftPct, topPct, rot, leftPx, topPx, widthPx, heightPx;
      let box, overlaps;
      do {
        leftPct = 40 + (Math.random() * 60);
        topPct = 40 + (Math.random() * 60);
        rot = (Math.random() - 0.5) * 40; // -20..20deg

        widthPx = (size / 100) * slideWidth;
        heightPx = widthPx; // approximate square bounds

        leftPx = (leftPct / 100) * slideWidth;
        topPx = (topPct / 100) * slideHeight;

        // keep fully inside slide
        leftPx = Math.max(widthPx / 2, Math.min(slideWidth - widthPx / 2, leftPx));
        topPx = Math.max(heightPx / 2, Math.min(slideHeight - heightPx / 2, topPx));

        box = {
          x1: leftPx - (widthPx / 2) - paddingPx,
          y1: topPx - (heightPx / 2) - paddingPx,
          x2: leftPx + (widthPx / 2) + paddingPx,
          y2: topPx + (heightPx / 2) + paddingPx,
          name: chosen && chosen.name
        };

        overlaps = placedBoxes.some(pb => !(box.x2 < pb.x1 || box.x1 > pb.x2 || box.y2 < pb.y1 || box.y1 > pb.y2));
        attempt++;
      } while (overlaps && attempt < maxAttempts);

      const finalLeftPct = (leftPx / slideWidth) * 100;
      const finalTopPct = (topPx / slideHeight) * 100;

      const node = createLogoNode(chosen, size, finalLeftPct, finalTopPct, rot);
      wrapper.appendChild(node);

      placedBoxes.push(box);
      if (chosen && chosen.name) slideChosen.add(chosen.name);

      // increment global usage for the chosen logo name
      try {
        if (chosen && chosen.name) {
          if (!window._logoUsageMap) window._logoUsageMap = Object.create(null);
          if (typeof window._logoUsageMap[chosen.name] === 'undefined') window._logoUsageMap[chosen.name] = 0;
          window._logoUsageMap[chosen.name]++;
        }
      } catch (e) {}
    }

    slide.appendChild(wrapper);
  }

  async function initCMSShowcase() {
    // Try to load the logo source JSON once and cache it on window
    if (!window._logoSourcesCache) {
      try {
        const resp = await fetch('ca-slides/assets/logo-sources.json', {cache: 'no-cache'});
        if (resp && resp.ok) {
          const json = await resp.json();
          // Flatten categories into an array
          const flat = [];
          Object.keys(json).forEach(k => {
            if (Array.isArray(json[k])) json[k].forEach(i => flat.push(i));
          });
          window._logoSourcesCache = flat;
          // Initialize global usage map to balance coverage across slides
          if (!window._logoUsageMap) {
            window._logoUsageMap = Object.create(null);
            flat.forEach(i => { try { if (i && i.name) window._logoUsageMap[i.name] = 0; } catch (e) {} });
          }
        }
      } catch (e) {
        // ignore - fallback behaviour in addCMSToSlide will handle missing sources
        console.warn('Could not load logo-sources.json:', e);
      }
    }

      // Load the generated svg sprite as a document so we can inline groups (avoids cross-origin <use> issues)
      if (!window._cmsLogoSpriteDoc) {
        try {
          window._cmsLogoSpriteDoc = null;
          await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'ca-slides/assets/cms-logos.svg', true);
            xhr.responseType = 'document';
            xhr.onload = function() {
              if (xhr.status === 200 || xhr.status === 0) {
                window._cmsLogoSpriteDoc = xhr.responseXML;
                resolve();
              } else {
                reject(new Error('Failed to load sprite: ' + xhr.status));
              }
            };
            xhr.onerror = function() { reject(new Error('XHR error loading sprite')); };
            xhr.send();
          });
        } catch (e) {
          console.warn('Could not load cms-logos.svg sprite:', e);
        }
      }

    // If sources were loaded but usage map was not initialized for some reason, create it now
    if (window._logoSourcesCache && !window._logoUsageMap) {
      window._logoUsageMap = Object.create(null);
      window._logoSourcesCache.forEach(i => { try { if (i && i.name) window._logoUsageMap[i.name] = 0; } catch (e) {} });
    }

    const slides = document.querySelectorAll('.slide.cms-showcase, section.slide.cms-showcase');
    slides.forEach(slide => addCMSToSlide(slide));
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCMSShowcase);
  } else {
    initCMSShowcase();
  }

  // Re-init on hash change (for slide navigation)
  window.addEventListener('hashchange', () => {
    setTimeout(initCMSShowcase, 100);
  });

})();
