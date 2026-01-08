(function(){
  function setUIHeightVar(){
    var ui = document.querySelector('.b6-ui');
    if (!ui) return;
    var h = ui.offsetHeight || 0;
    document.documentElement.style.setProperty('--b6uiH', h + 'px');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setUIHeightVar, {once: true});
  } else {
    setUIHeightVar();
  }
  window.addEventListener('resize', setUIHeightVar);
})();