/**
 * Druplicon Showcase - Displays multiple random random druplicon icons in a right sidebar
 * Add class="druplicon-watermark" to any slide to display random druplicons
 * 
 * Works just like cms-showcase.js but for the druplicon collection.
 */
(function() {
  'use strict';

  // All 162 available icon IDs from druplicon-manifest.txt
  const ICON_IDS = [
    'druplicon-42-druplicon',
    'druplicon-5net-company',
    'druplicon-a11y_druplicon-a11y',
    'druplicon-agiledrop',
    'druplicon-angry-drop_angry',
    'druplicon-annoying-druplicon',
    'druplicon-association-drupal-france',
    'druplicon-badcamp-2014_badcamp-logo_0',
    'druplicon-badcamp-2016_badcamp-2016-logo',
    'druplicon-badcamp-2017_badcamp17',
    'druplicon-badcamp-2020_badcamp-20logo-20--202011-20-28site-20version-20--20lq-29',
    'druplicon-baltimore-drupal-camp_bdc',
    'druplicon-behat-drupal-extension',
    'druplicon-bootstrap-paragraphs',
    'druplicon-brad-czerniak_image08',
    'druplicon-brazilian-drupal-community',
    'druplicon-cheppers',
    'druplicon-composer',
    'druplicon-cornell-drupalcamp-2017_drupal_blue',
    'druplicon-czech-drupal-association',
    'druplicon-d8-logo',
    'druplicon-dc-drupal-meetup_dc-drupal-meetup',
    'druplicon-dcgov_dcgov',
    'druplicon-ddg',
    'druplicon-dev-days-nola_dev-days-nola',
    'druplicon-devcamp-2013_devcamp-2013',
    'druplicon-dondi_dondi',
    'druplicon-drupal-7-icon_drupal-7-icon',
    'druplicon-drupal-8-logo_drupal-208-20logo',
    'druplicon-drupal-9-logo_drupal-209-20logo',
    'druplicon-drupal-awards_drupal-awards',
    'druplicon-drupal-bartik-theme',
    'druplicon-drupal-camp-baltics_drupal-camp-baltics',
    'druplicon-drupal-camp-chicago_drupal-camp-chicago',
    'druplicon-drupal-camp-fox-valley_drupal-camp-fox-valley',
    'druplicon-drupal-camp-mn-2012_drupal-camp-mn-2012',
    'druplicon-drupal-camp-mn-2013_drupal-camp-mn-2013',
    'druplicon-drupal-camp-mn-2014_drupal-camp-mn-2014',
    'druplicon-drupal-camp-mn-2015_drupal-camp-mn-2015',
    'druplicon-drupal-camp-nrw-2013_drupal-camp-nrw-2013',
    'druplicon-drupal-camp-spain_drupal-camp-spain',
    'druplicon-drupal-community_drupal-community',
    'druplicon-drupal-compose_drupal-compose',
    'druplicon-drupal-conduct_drupal-conduct',
    'druplicon-drupal-connection_drupal-connection',
    'druplicon-drupal-content-management-system',
    'druplicon-drupal-diversity-and-inclusion',
    'druplicon-drupal-gopher_drupal-gopher-20logo-20for-20drupal-go-org',
    'druplicon-drupal-hands-logo_drupal-hands-logo',
    'druplicon-drupal-hero_drupal-20hero',
    'druplicon-drupal-in-a-day_drupal-in-a-day',
    'druplicon-drupal-lego-im-drupalin_drupal-lego-20majica',
    'druplicon-drupal-meetup-logo_dc-drupal-meetup',
    'druplicon-drupal-meetup-madison',
    'druplicon-drupal-pie',
    'druplicon-drupal-romania',
    'druplicon-drupal-trainings',
    'druplicon-drupal-tricolor-new_drupal-tricolor-new',
    'druplicon-drupal-wordmark',
    'druplicon-drupal-wordmark-black',
    'druplicon-drupal-wordmark-blue',
    'druplicon-drupalcamp-colorado_drupalcamp-colorado',
    'druplicon-drupalcamp-prague-2013_drupalcamp-prague-2013',
    'druplicon-drupalcamp-scotland_drupalcamp-scotland',
    'druplicon-drupalcon-2013-portland_drupalcon-2013-portland',
    'druplicon-drupalcon-asia_drupalcon-asia',
    'druplicon-drupalcon-atlanta-2013-logo_drupalcon-atlanta-2013-logo',
    'druplicon-drupalcon-barcelona_drupalcon-barcelona',
    'druplicon-drupalcon-dublin-2016_drupalcon-dublin-2016',
    'druplicon-drupalcon-europe-2020_drupalcon-europe-2020',
    'druplicon-drupalcon-global-2020_drupalcon-global-2020',
    'druplicon-drupalcon-global-2020-experience-drupal_drupalcon-global-2020-20-20experience-20drupal',
    'druplicon-drupalcon-houston_drupalcon-houston',
    'druplicon-drupalcon-north-america-2021_drupalcon-north-america-2021',
    'druplicon-drupalcon-portland-2024_drupalcon-portland-2024',
    'druplicon-drupalcon-singapore-2024_drupalcon-singapore-2024',
    'druplicon-drupalgeddon',
    'druplicon-drupalicon-d8-responsive-images',
    'druplicon-druplicon-drupal-code_druplicon-drupal-code',
    'druplicon-el-drupal-logo_el-drupal-logo',
    'druplicon-euro-drupal-camp-paris',
    'druplicon-evil-genius_evil-genius',
    'druplicon-extended-metatag-module',
    'druplicon-florida-drupalcamp-2016_florida-drupalcamp-2016',
    'druplicon-florida-drupalcamp-2018_florida-drupalcamp-2018',
    'druplicon-gatech_gatech',
    'druplicon-globalevent_2024',
    'druplicon-harvard_harvard',
    'druplicon-hungarian-drupal-community',
    'druplicon-indiana-university',
    'druplicon-italian-drupal-community',
    'druplicon-jdrupal',
    'druplicon-jekyll',
    'druplicon-lightning-icon',
    'druplicon-los-angeles-drupal-meetup',
    'druplicon-madison-drupal-meetup',
    'druplicon-mdce_mdce',
    'druplicon-mediacat',
    'druplicon-mediacurrent',
    'druplicon-midcamp-2013_midcamp-2013',
    'druplicon-midcamp-2014_midcamp-2014',
    'druplicon-midcamp-2015_midcamp-2015',
    'druplicon-midcamp-2016_midcamp-2016',
    'druplicon-midcamp-2018_midcamp-2018',
    'druplicon-monster_monster-2',
    'druplicon-montreal-drupal-users-group_montreal-drupal-users-group',
    'druplicon-mountain-camp',
    'druplicon-multi-druplicon',
    'druplicon-nebraskacamp_nebraskacamp',
    'druplicon-new-england-drupal-camp_new-england-drupal-camp',
    'druplicon-north-carolina-drupal-users-group_north-carolina-drupal-users-group',
    'druplicon-northeastern-university',
    'druplicon-northwestern-university_northwestern-university',
    'druplicon-nosh',
    'druplicon-nyc-camp_nyc-camp',
    'druplicon-nyccamp-2015_nyccamp-2015',
    'druplicon-nyccamp-2016_nyccamp-2016',
    'druplicon-nyccamp-2017_nyccamp-2017',
    'druplicon-nyccamp-2018_nyccamp-2018',
    'druplicon-oklahoma-drupal-users-group_oklahoma-drupal-users-group',
    'druplicon-old-version-druplicon_old-version-druplicon',
    'druplicon-oregon-state-university_oregon-state-university',
    'druplicon-oscms_oscms',
    'druplicon-photo-of-druplicon-pinata-at-barcamptampa',
    'druplicon-picture1',
    'druplicon-puppet-druplicon',
    'druplicon-purdue-university',
    'druplicon-redhat',
    'druplicon-russia-drupal',
    'druplicon-scary-clown',
    'druplicon-siteimprove',
    'druplicon-smiley-druplicon_smiley-druplicon',
    'druplicon-sparkpost',
    'druplicon-spain-drupal-community',
    'druplicon-stanford',
    'druplicon-stateofindiana_stateofindiana',
    'druplicon-tufts-university',
    'druplicon-twin-cities-drupal-camp-2013_twin-cities-drupal-camp-2013',
    'druplicon-twin-cities-drupal-user-group',
    'druplicon-university-of-adelaide',
    'druplicon-university-of-colorado',
    'druplicon-university-of-minnesota',
    'druplicon-university-of-virginia',
    'druplicon-vancouver-drupal-users-group_vancouver-drupal-users-group',
    'druplicon-washington-dug',
    'druplicon-white-house',
    'druplicon-wisconsin-dug'
  ];

  const SPRITE_PATH = 'ca-slides/assets/drupal/druplicon-sprite.svg';

  // Inject styles for blend modes (Light vs Dark)
  // We need 'multiply' for light mode (to hide white backgrounds)
  // And 'screen' + 'invert' for dark mode (to make black backgrounds transparent and icons light)
  // Note: slides.css defaults to Dark Mode ("slide-dark.svg"), so we default to screen/invert.
  const style = document.createElement('style');
  style.textContent = `
    .druplicon-watermark-logo {
      /* Default (Dark Mode) - matches presentation default */
      mix-blend-mode: screen;
      filter: grayscale(100%) invert(1) contrast(1.2) brightness(1.2);
      transition: opacity 0.3s;
    }

    /* Light Mode Override (.lightmode class on html or body) */
    html.lightmode .druplicon-watermark-logo,
    body.lightmode .druplicon-watermark-logo,
    .lightmode .druplicon-watermark-logo {
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(0.9) brightness(1.1);
    }
  `;
  document.head.appendChild(style);

  function addDrupliconsToSlide(slide) {
    // If a watermark container already exists or we marked it as loaded, skip
    if (slide.dataset.drupliconsLoaded === 'true') return;
    if (slide.querySelector('.druplicon-watermark-container')) return;

    // Check dimensions to ensure we don't place into a hidden/collapsed slide
    // IntersectionObserver usage below ensures this runs when visible.
    // Safety check: if width is basically 0, skip and retry later.
    const w = slide.clientWidth || slide.offsetWidth;
    const h = slide.clientHeight || slide.offsetHeight;
    if (w < 50 || h < 50) return; 

    slide.dataset.drupliconsLoaded = 'true';

    // Configuration via data attributes
    // Use data-druplicon-count if set, otherwise default to random 2-5
    let countConfig = parseInt(slide.dataset.drupliconCount || slide.dataset.logoCount || -1, 10);
    
    // If not explicitly set, pick random number between 2 and 5
    if (countConfig === -1) {
      countConfig = Math.floor(Math.random() * 4) + 2; // 2, 3, 4, or 5
    }

    const count = countConfig;
    const opacity = parseFloat(slide.dataset.drupliconOpacity || slide.dataset.logoOpacity || 0.25); // Increased default opacity to 0.25
    const minScale = parseFloat(slide.dataset.drupliconScaleMin || 22); // percent (bumped min size)
    const maxScale = parseFloat(slide.dataset.drupliconScaleMax || 30); // percent (bumped max size)
    const spritePath = slide.dataset.spritePath || SPRITE_PATH;

    // Robust dimension selection - fix for display:none slides
    // Try reliable sources for dimensions, fallback to standard aspect ratio
    let slideWidth = slide.clientWidth || slide.offsetWidth;
    let slideHeight = slide.clientHeight || slide.offsetHeight;

    if (slideWidth < 50 || slideHeight < 50) {
      const rect = slide.getBoundingClientRect();
      if (rect.width > 50) slideWidth = rect.width;
      if (rect.height > 50) slideHeight = rect.height;
    }

    // Final fallback if slide is completely hidden/detached
    if (slideWidth < 50) slideWidth = 1024;
    if (slideHeight < 50) slideHeight = 768;

    // Create watermark wrapper that fills the slide and sits behind content
    const wrapper = document.createElement('div');
    wrapper.className = 'druplicon-watermark-container';
    wrapper.setAttribute('aria-hidden', 'true');
    wrapper.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `;

    // Helper: create an SVG node with a <use> reference
    function createLogoNode(iconId, sizePct, leftPct, topPct, rotationDeg) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      el.setAttribute('class', 'druplicon-watermark-logo');
      el.style.cssText = `
        position: absolute;
        left: ${leftPct}%;
        top: ${topPct}%;
        transform: translate(-50%, -50%) rotate(${rotationDeg}deg);
        width: ${sizePct}%;
        height: ${sizePct}%;
        opacity: ${opacity};
        color: currentColor;
        pointer-events: none;
      `;
      
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${spritePath}#${iconId}`);
      el.appendChild(use);
      
      return el;
    }

    // Determine how many logos to place.
    let pickCount = Math.max(1, Math.min(20, count));

    // Place logos while avoiding overlap where possible.
    const placedBoxes = [];
    const maxAttempts = 100; // Increased attempts to find non-overlapping spot
    const paddingPx = 10; // padding between logos

    // Keep track of names placed on this slide to avoid duplicates
    const slideChosen = new Set();
    
    // Usage map for fair distribution across slides
    if (!window._drupliconUsageMap) window._drupliconUsageMap = {};

    for (let i = 0; i < pickCount; i++) {
      const size = (Math.random() * (maxScale - minScale)) + minScale; // percent

      // Build candidate pool excluding names already placed on this slide
      let candidates = ICON_IDS.filter(id => !slideChosen.has(id));
      if (candidates.length === 0) candidates = ICON_IDS.slice();

      // compute minimum usage among candidates to ensure even coverage
      let minUsage = Infinity;
      candidates.forEach(id => {
        const n = window._drupliconUsageMap[id] || 0;
        if (n < minUsage) minUsage = n;
      });

      // narrow to candidates with usage == minUsage
      const minCandidates = candidates.filter(id => (window._drupliconUsageMap[id] || 0) === minUsage);
      
      let chosenId = null;
      if (minCandidates.length > 0) chosenId = minCandidates[Math.floor(Math.random() * minCandidates.length)];
      if (!chosenId) chosenId = ICON_IDS[Math.floor(Math.random() * ICON_IDS.length)];

      let attempt = 0;
      let leftPct, topPct,RDeg, leftPx, topPx, widthPx, heightPx;
      let box, overlaps;
      
      // Calculate pixel size for collision detection based on width
      const sizePx = (size / 100) * slideWidth; // Approximate square
      
      do {
        // Place in bottom-right quadrant (approx 50-95% width, 50-95% height)
        // Keeps top-left empty as requested
        leftPct = 50 + (Math.random() * 45); // 50% to 95%
        topPct = 40 + (Math.random() * 55);  // 40% to 95%
        RDeg = (Math.random() - 0.5) * 60; // -30..30deg

        widthPx = sizePx;
        heightPx = sizePx;

        leftPx = (leftPct / 100) * slideWidth;
        topPx = (topPct / 100) * slideHeight;

        // keep fully inside slide
        leftPx = Math.max(widthPx / 2, Math.min(slideWidth - widthPx / 2, leftPx));
        topPx = Math.max(heightPx / 2, Math.min(slideHeight - heightPx / 2, topPx));

        box = {
          x1: leftPx - (widthPx / 2) - paddingPx,
          y1: topPx - (heightPx / 2) - paddingPx,
          x2: leftPx + (widthPx / 2) + paddingPx,
          y2: topPx + (heightPx / 2) + paddingPx
        };

        overlaps = placedBoxes.some(pb => !(box.x2 < pb.x1 || box.x1 > pb.x2 || box.y2 < pb.y1 || box.y1 > pb.y2));
        attempt++;
      } while (overlaps && attempt < maxAttempts);

      // CRITICAL FIX: If we still overlap after max attempts, SKIP this placement.
      // Do not render it, do not record usage.
      if (overlaps) {
        continue;
      }

      const finalLeftPct = (leftPx / slideWidth) * 100;
      const finalTopPct = (topPx / slideHeight) * 100;

      const node = createLogoNode(chosenId, size, finalLeftPct, finalTopPct, RDeg);
      wrapper.appendChild(node);

      placedBoxes.push(box);
      slideChosen.add(chosenId);

      // increment global usage
      if (!window._drupliconUsageMap[chosenId]) window._drupliconUsageMap[chosenId] = 0;
      window._drupliconUsageMap[chosenId]++;
    }

    slide.appendChild(wrapper);
  }

  function initDrupliconShowcase() {
    // Look for slides with class "druplicon" OR "druplicon-watermark" (backward compatibility)
    const slides = document.querySelectorAll('.slide.druplicon, section.slide.druplicon, .slide.druplicon-watermark, section.slide.druplicon-watermark');
    
    // Use IntersectionObserver to ensure we only generate watermarks when the slide is rendered and has dimensions.
    // This fixes issues with slides hidden via display:none having 0x0 placement or content collisions.
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const slide = entry.target;
          addDrupliconsToSlide(slide);
          
          // If successfully loaded (checked via dataset), stop observing
          if (slide.dataset.drupliconsLoaded === 'true') {
            obs.unobserve(slide);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '500px 0px', // Start loading well before the slide scrolls into view
      threshold: 0
    });

    slides.forEach(slide => observer.observe(slide));
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDrupliconShowcase);
  } else {
    initDrupliconShowcase();
  }
  
  // Note: We no longer need hashchange listeners because IntersectionObserver handles visibility changes automatically.


})();
