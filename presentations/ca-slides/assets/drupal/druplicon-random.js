/**
 * Random Druplicon Helper
 * 
 * GitHub Pages compatible - no server-side includes required.
 * Automatically loads available icons from the sprite and provides
 * methods to insert random druplicons into your presentations.
 * 
 * Usage:
 *   <script src="ca-slides/assets/drupal/druplicon-random.js"></script>
 *   <script>
 *     // Insert random icon
 *     DruplIconRandom.insert('#watermark-container');
 *     
 *     // Get random icon ID
 *     const iconId = DruplIconRandom.getRandomId();
 *   </script>
 */

(function() {
  'use strict';
  
  const SPRITE_PATH = 'ca-slides/assets/drupal/druplicon-sprite.svg';
  
  // Best-effort verification: fetch sprite and cache available IDs for dynamic use
  async function verifySpriteIds(path) {
    try {
      const protocol = (window.location && window.location.protocol) || '';
      if (!/^https?:$/.test(protocol)) return; // skip when opened via file://
      if (window._drupliconSpriteVerified) return;
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) return;
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'image/svg+xml');
      const els = doc.querySelectorAll('[id]');
      const ids = new Set();
      els.forEach(el => { const id = el.getAttribute('id'); if (id) ids.add(id); });
      window._drupliconAvailableIds = ids;
      window._drupliconSpriteVerified = true;
    } catch (e) {
      // Non-blocking
    }
  }
  
  // All 162 available icon IDs
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
  
  // Public API
  window.DruplIconRandom = {
    /**
     * Get a random icon ID from the available set
     * @returns {string} Icon ID (e.g., 'druplicon-a11y_druplicon-a11y')
     */
    getRandomId: function() {
      const dynamic = (window._drupliconAvailableIds && window._drupliconAvailableIds.size)
        ? Array.from(window._drupliconAvailableIds).filter(id => id && id.indexOf('druplicon-') === 0)
        : ICON_IDS;
      return dynamic[Math.floor(Math.random() * dynamic.length)];
    },
    
    /**
     * Get multiple random unique icon IDs
     * @param {number} count - Number of icons to get
     * @returns {string[]} Array of icon IDs
     */
    getRandomIds: function(count) {
      const pool = (window._drupliconAvailableIds && window._drupliconAvailableIds.size)
        ? Array.from(window._drupliconAvailableIds).filter(id => id && id.indexOf('druplicon-') === 0)
        : ICON_IDS;
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(count, pool.length));
    },
    
    /**
     * Insert a random druplicon into a container
     * @param {string|Element} target - CSS selector or DOM element
     * @param {Object} options - Configuration options
     * @param {number} options.width - Width in pixels (default: 150)
     * @param {number} options.height - Height in pixels (default: 150)
     * @param {number} options.opacity - Opacity 0-1 (default: 0.15)
     * @param {string} options.position - CSS position (default: 'fixed')
     * @param {string} options.bottom - CSS bottom value (default: '20px')
     * @param {string} options.right - CSS right value (default: '20px')
     * @param {string} options.color - CSS color value (default: 'currentColor')
     * @param {string} options.spritePath - Path to sprite (default: SPRITE_PATH)
     * @returns {SVGElement} The created SVG element
     */
    insert: function(target, options = {}) {
      const container = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
      
      if (!container) {
        console.error('DruplIconRandom: Target container not found');
        return null;
      }
      
      const opts = {
        width: options.width || 150,
        height: options.height || 150,
        opacity: options.opacity !== undefined ? options.opacity : 0.15,
        position: options.position || 'fixed',
        bottom: options.bottom || '20px',
        right: options.right || '20px',
        color: options.color || 'currentColor',
        spritePath: options.spritePath || SPRITE_PATH
      };
      
      const iconId = this.getRandomId();
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', opts.width);
      svg.setAttribute('height', opts.height);
      svg.style.position = opts.position;
      svg.style.bottom = opts.bottom;
      svg.style.right = opts.right;
      svg.style.opacity = opts.opacity;
      svg.style.color = opts.color;
      svg.style.pointerEvents = 'none';
      
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 
        `${opts.spritePath}#${iconId}`);
      
      svg.appendChild(use);
      container.appendChild(svg);
      
      return svg;
    },
    
    /**
     * Create watermark CSS for a random icon
     * @param {Object} options - Same as insert() options
     * @returns {string} CSS class definition
     */
    createCSS: function(options = {}) {
      const opts = {
        className: options.className || 'druplicon-watermark',
        width: options.width || 150,
        height: options.height || 150,
        opacity: options.opacity !== undefined ? options.opacity : 0.15,
        position: options.position || 'fixed',
        bottom: options.bottom || '20px',
        right: options.right || '20px',
        spritePath: options.spritePath || SPRITE_PATH
      };
      
      const iconId = this.getRandomId();
      
      return `.${opts.className} {
  position: ${opts.position};
  bottom: ${opts.bottom};
  right: ${opts.right};
  width: ${opts.width}px;
  height: ${opts.height}px;
  opacity: ${opts.opacity};
  color: var(--text-color, currentColor);
  pointer-events: none;
}

.${opts.className} use {
  href: ${opts.spritePath}#${iconId};
}`;
    },
    
    /**
     * Get all available icon IDs
     * @returns {string[]} Array of all 162 icon IDs
     */
    getAllIds: function() {
      if (window._drupliconAvailableIds && window._drupliconAvailableIds.size) {
        return Array.from(window._drupliconAvailableIds).filter(id => id && id.indexOf('druplicon-') === 0);
      }
      return [...ICON_IDS];
    },
    
    /**
     * Get total count of available icons
     * @returns {number} Total count (162)
     */
    getCount: function() {
      if (window._drupliconAvailableIds && window._drupliconAvailableIds.size) {
        return Array.from(window._drupliconAvailableIds).filter(id => id && id.indexOf('druplicon-') === 0).length;
      }
      return ICON_IDS.length;
    },
    
    /**
     * Initialize all elements with data-druplicon="random" or class "druplicon-watermark"
     * Called automatically on DOMContentLoaded
     */
    init: function() {
      // Kick off sprite id verification (best effort) only under http(s)
      const protocol = (window.location && window.location.protocol) || '';
      if (/^https?:$/.test(protocol)) {
        verifySpriteIds(SPRITE_PATH);
      }
      const autoElements = document.querySelectorAll('[data-druplicon="random"], .druplicon-watermark');
      autoElements.forEach(element => {
        this.insert(element, {
          position: 'absolute',
          opacity: element.dataset.opacity || 0.08,
          width: element.dataset.width || 150,
          height: element.dataset.height || 150,
          bottom: element.dataset.bottom || '20px',
          right: element.dataset.right || '20px',
          color: element.dataset.color || 'currentColor',
          spritePath: element.dataset.spritePath || SPRITE_PATH
        });
      });
    }
  };
  
  // Auto-initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.DruplIconRandom.init();
    });
  } else {
    // Already loaded
    window.DruplIconRandom.init();
  }
})();
