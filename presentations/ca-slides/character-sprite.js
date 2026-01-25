/**
 * Character Sprite Display
 * Displays one random character SVG on slides with the "sprite" class
 * Characters are full-height, right-aligned at 10% opacity
 */

(function() {
  'use strict';

  const svgPath = 'ca-slides/assets/inclusive-design-characters.svg';
  let svgDoc = null;
  let characterGroups = [];

  function loadSVG() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', svgPath, true);
      xhr.responseType = 'document';
      
      xhr.onload = function() {
        console.log('XHR status:', xhr.status, 'responseXML:', xhr.responseXML);
        if (xhr.status === 200 || xhr.status === 0) { // 0 for file:// protocol
          svgDoc = xhr.responseXML;
          
          if (!svgDoc) {
            console.error('responseXML is null');
            reject(new Error('Failed to parse SVG'));
            return;
          }
          
          // Find all <title> elements - each represents a character
          // Structure: <title>Name</title><desc>...</desc><path.../><path.../>
          const titles = svgDoc.querySelectorAll('title');
          console.log('Found titles:', titles.length);
          
          characterGroups = Array.from(titles).map((title, index) => {
            // Collect all path elements that follow this title (until next title)
            const paths = [];
            let sibling = title.nextElementSibling;
            
            while (sibling && sibling.tagName !== 'title') {
              if (sibling.tagName === 'path' || sibling.tagName === 'g' || sibling.tagName === 'desc') {
                paths.push(sibling);
              }
              sibling = sibling.nextElementSibling;
            }
            
            console.log(`Character "${title.textContent}" has ${paths.length} elements`);
            
            return {
              title: title.textContent,
              titleElement: title,
              pathElements: paths
            };
          }).filter(char => char.pathElements.length > 0);
          
          console.log(`Loaded ${characterGroups.length} characters from sprite sheet`);
          resolve();
        } else {
          console.error('Failed to load SVG, status:', xhr.status);
          reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
        }
      };
      
      xhr.onerror = function() {
        console.error('XHR error loading SVG');
        reject(new Error('Failed to load SVG'));
      };
      
      xhr.send();
    });
  }

  function addCharacterToSlide(slide) {
    if (!svgDoc || characterGroups.length === 0) {
      console.log('Cannot add character: svgDoc=', svgDoc, 'characterGroups=', characterGroups.length);
      return;
    }
    if (slide.querySelector('.character-sprite')) return;

    // Pick a random character
    const randomChar = characterGroups[Math.floor(Math.random() * characterGroups.length)];
    console.log('Selected character:', randomChar.title);
    
    // Clone the SVG document
    const svgClone = svgDoc.documentElement.cloneNode(false); // Clone SVG element only (not contents)
    
    // Copy essential attributes from the original SVG
    const originalSVG = svgDoc.documentElement;
    if (originalSVG.hasAttribute('viewBox')) {
      svgClone.setAttribute('viewBox', originalSVG.getAttribute('viewBox'));
    }
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Add the title element
    svgClone.appendChild(randomChar.titleElement.cloneNode(true));
    
    // Add all path elements for this character
    randomChar.pathElements.forEach(pathEl => {
      svgClone.appendChild(pathEl.cloneNode(true));
    });
    
    console.log('SVG clone created with', svgClone.children.length, 'elements');
    
    // Calculate bounding box of the character to set proper viewBox
    // Create a temporary SVG in DOM to get accurate bounding box
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    document.body.appendChild(tempDiv);
    tempDiv.appendChild(svgClone);
    
    // Get bounding box of all path elements
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const paths = svgClone.querySelectorAll('path');
    paths.forEach(path => {
      const bbox = path.getBBox();
      minX = Math.min(minX, bbox.x);
      minY = Math.min(minY, bbox.y);
      maxX = Math.max(maxX, bbox.x + bbox.width);
      maxY = Math.max(maxY, bbox.y + bbox.height);
    });
    
    document.body.removeChild(tempDiv);
    
    // Add some padding (10%)
    const width = maxX - minX;
    const height = maxY - minY;
    const padding = Math.max(width, height) * 0.1;
    minX -= padding;
    minY -= padding;
    const newWidth = width + (padding * 2);
    const newHeight = height + (padding * 2);
    
    console.log(`Character bbox: ${minX},${minY} ${newWidth}x${newHeight}`);
    
    // Set viewBox to focus on just this character
    svgClone.setAttribute('viewBox', `${minX} ${minY} ${newWidth} ${newHeight}`);
    svgClone.setAttribute('preserveAspectRatio', 'xMaxYMid meet');
    
    // Force dark colors - convert any light fills to dark
    const allElements = svgClone.querySelectorAll('[fill]');
    allElements.forEach(el => {
      const fill = el.getAttribute('fill');
      // If it's a light color or white, make it dark
      if (fill && (fill.toLowerCase().includes('fff') || fill.toLowerCase().includes('white'))) {
        el.setAttribute('fill', '#171717');
      }
    });
    
    // Set opacity to 15% (can be overridden via data attribute)
    const opacity = slide.dataset.spriteOpacity || '0.15';
    
    // Create container for the character - right justified, 90% of slide height
    const container = document.createElement('div');
    container.className = 'character-sprite';
    container.setAttribute('aria-label', randomChar.title);
    container.setAttribute('role', 'presentation');
    
    container.style.cssText = `
      position: absolute;
      top: 5%;
      right: 2em;
      bottom: 5%;
      width: 30%;
      height: 90%;
      opacity: ${opacity};
      z-index: 1;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `;
    
    // Style the SVG - make it fill the container
    svgClone.style.cssText = `
      height: 100%;
      width: auto;
    `;
    
    container.appendChild(svgClone);
    slide.appendChild(container);
    console.log('Character sprite added to slide');
  }

  async function addCharactersToSlides() {
    console.log('addCharactersToSlides called');
    // Only process slides with the "sprite" class
    const slides = document.querySelectorAll('.slide.sprite');
    
    console.log('Found sprite slides:', slides.length);
    if (slides.length === 0) return;
    
    // Load the SVG if not already loaded
    if (!svgDoc) {
      try {
        await loadSVG();
        console.log('SVG loaded successfully');
      } catch (error) {
        console.error('Failed to load SVG:', error);
        return;
      }
    }
    
    slides.forEach((slide, index) => {
      console.log('Adding character to slide', index);
      addCharacterToSlide(slide);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCharactersToSlides);
  } else {
    addCharactersToSlides();
  }
})();
