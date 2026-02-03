/**
 * Fullscreen Fix for VS Code Simple Browser
 * 
 * Prevents fullscreen API errors in environments that don't support it
 * Load this before b6plus.js
 */

(function() {
  'use strict';
  
  // Override the fullscreen API to prevent errors
  if (Element.prototype.requestFullscreen) {
    // Save original
    const originalRequestFullscreen = Element.prototype.requestFullscreen;
    
    // Replace with version that catches and suppresses errors
    Element.prototype.requestFullscreen = function(options) {
      const promise = originalRequestFullscreen.call(this, options);
      
      // Return a promise that suppresses the error
      return promise.catch((err) => {
        console.log('[Fullscreen] Fullscreen not supported in this environment, continuing in window mode');
        // Don't throw - just return a rejected promise that won't cause alerts
        return Promise.resolve(); // Resolve instead of reject to prevent error dialogs
      });
    };
  }
  
  // Also suppress any alert dialogs about fullscreen errors
  const originalAlert = window.alert;
  window.alert = function(message) {
    // If it's a fullscreen error, suppress it
    if (typeof message === 'string' && 
        (message.includes('fullscreen') || 
         message.includes('Fullscreen') ||
         message.includes('NotAllowedError'))) {
      console.log('[Fullscreen] Suppressed fullscreen error dialog');
      return;
    }
    // Otherwise show the alert normally
    return originalAlert.call(window, message);
  };
})();
