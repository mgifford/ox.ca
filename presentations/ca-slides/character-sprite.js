/**
 * Character Sprite Display
 * Displays one random character from the sprite sheet per slide
 */

(function() {
  'use strict';

  const svgPath = 'ca-slides/assets/Dark on white characters.svg';
  
  // Character positions in the sprite (Y-position percentages)
  // SVG is 1253×2525px with characters arranged vertically
  const characters = [
    { posY: '0%' },       // First character
    { posY: '-15%' },    // Second character
    { posY: '-30%' },    // Third character
    { posY: '-45%' },    // Fourth character
    { posY: '-60%' },    // Fifth character
    { posY: '-75%' },    // Sixth character
  ];

  function addCharactersToSlides() {
    const slides = document.querySelectorAll('.slide');
    
    slides.forEach((slide, index) => {
      if (slide.querySelector('.character-sprite')) return;

      // Pick a random character for this slide
      const randomChar = characters[Math.floor(Math.random() * characters.length)];
      
      const container = document.createElement('div');
      container.className = 'character-sprite';
      container.style.cssText = `
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 120px;
        height: 180px;
        background-image: url('${svgPath}');
        background-size: auto 500%;
        background-position: center ${randomChar.posY};
        background-repeat: no-repeat;
        opacity: 0.15;
        z-index: 10;
        pointer-events: none;
      `;
      
      slide.appendChild(container);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCharactersToSlides);
  } else {
    addCharactersToSlides();
  }
})();
