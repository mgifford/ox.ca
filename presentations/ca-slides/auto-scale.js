/**
 * Auto-scale slide text to prevent footer overlap
 * Dynamically adjusts font size based on actual content height
 * 
 * This script should be loaded after b6plus.js in presentation HTML:
 * <script src="ca-slides/b6plus.js"></script>
 * <script src="ca-slides/auto-scale.js"></script>
 */

(function() {
  'use strict';

  /**
   * Scale slide content to fit available space
   */
  function scaleSlideContent() {
    const slides = document.querySelectorAll('.slide');
    const footerReserve = 120; // Increased space for progress/clock in pixels
    
    slides.forEach(slide => {
      // Skip cover, final, or slides with manual scaling disabled
      if (slide.classList.contains('cover') || 
          slide.classList.contains('final') ||
          slide.hasAttribute('data-no-scale')) {
        return;
      }
      
      // Reset any previous scaling to get accurate measurements
      slide.style.fontSize = '';
      slide.style.lineHeight = '';
      slide.style.width = '';
      slide.style.height = '';
      slide.removeAttribute('data-text-scaled');
      
      // Reset list item margins
      const lis = slide.querySelectorAll('li');
      lis.forEach(li => {
        li.style.marginBottom = '';
      });
      
      // Force layout recalculation
      void slide.offsetHeight;
      
      const originalWidth = slide.offsetWidth;
      const slideHeight = slide.offsetHeight;
      const availableHeight = slideHeight - footerReserve;
      
      // Measure actual content height (exclude notes and hidden elements)
      let contentHeight = 0;
      Array.from(slide.children).forEach(el => {
        if (!el.classList.contains('note') && 
            getComputedStyle(el).display !== 'none') {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          const marginTop = parseFloat(style.marginTop) || 0;
          const marginBottom = parseFloat(style.marginBottom) || 0;
          contentHeight += rect.height + marginTop + marginBottom;
        }
      });
      
      // Add some padding for safety
      contentHeight += 20;
      
      // Scale down if content overflows
      if (contentHeight > availableHeight) {
        // Calculate scale factor with a minimum of 65%
        const scaleFactor = Math.max(0.65, availableHeight / contentHeight);
        const currentSize = parseFloat(window.getComputedStyle(slide).fontSize);
        const newSize = currentSize * scaleFactor;
        
        slide.style.fontSize = `${newSize}px`;
        slide.style.width = `${originalWidth}px`;
        slide.style.height = `${slideHeight}px`;
        
        // Proportionally adjust line-height
        const computedLineHeight = window.getComputedStyle(slide).lineHeight;
        if (computedLineHeight !== 'normal') {
          const currentLineHeight = parseFloat(computedLineHeight);
          if (!isNaN(currentLineHeight)) {
            slide.style.lineHeight = `${currentLineHeight * scaleFactor}px`;
          }
        }
        
        // Reduce list item margins proportionally
        lis.forEach(li => {
          const currentMargin = parseFloat(window.getComputedStyle(li).marginBottom) || 0;
          if (currentMargin > 0) {
            li.style.marginBottom = `${currentMargin * scaleFactor}px`;
          }
        });
        
        // Reduce paragraph margins
        const paragraphs = slide.querySelectorAll('p:not(.note)');
        paragraphs.forEach(p => {
          const currentMargin = parseFloat(window.getComputedStyle(p).marginBottom) || 0;
          if (currentMargin > 0) {
            p.style.marginBottom = `${currentMargin * scaleFactor}px`;
          }
        });
        
        // Mark as scaled for debugging
        slide.setAttribute('data-text-scaled', scaleFactor.toFixed(3));
        
        // Log for debugging
        console.log(`Slide #${slide.id || 'unknown'}: content=${contentHeight.toFixed(1)}px, available=${availableHeight.toFixed(1)}px, scaled to ${(scaleFactor * 100).toFixed(1)}%`);
      } else {
        console.log(`Slide #${slide.id || 'unknown'}: fits (content=${contentHeight.toFixed(1)}px, available=${availableHeight.toFixed(1)}px)`);
      }
    });
  }

  /**
   * Initialize scaling on DOM ready
   */
  function init() {
    console.log('Auto-scale.js loaded');
    // Delay to ensure layout is complete
    setTimeout(() => {
      console.log('Running initial scale...');
      scaleSlideContent();
    }, 300);
  }

  /**
   * Debounced resize handler
   */
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(scaleSlideContent, 250);
  }

  /**
   * Handle slide navigation events
   */
  function handleSlideChange() {
    setTimeout(scaleSlideContent, 100);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-scale on window resize
  window.addEventListener('resize', handleResize);

  // Hook into slide navigation events
  document.addEventListener('showslide', handleSlideChange);
  document.addEventListener('slidechanged', handleSlideChange);

  // Expose for manual testing
  window.scaleSlideContent = scaleSlideContent;

})();