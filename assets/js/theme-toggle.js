(function () {
  var toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  var saved = localStorage.getItem('theme');
  var userOverride = !!saved;
  var current = saved || (prefersDark.matches ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    toggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  toggle.addEventListener('click', function () {
    current = current === 'dark' ? 'light' : 'dark';
    userOverride = true;
    localStorage.setItem('theme', current);
    applyTheme(current);
  });

  prefersDark.addEventListener('change', function (e) {
    if (!userOverride) {
      current = e.matches ? 'dark' : 'light';
      applyTheme(current);
    }
  });

  applyTheme(current);
}());
