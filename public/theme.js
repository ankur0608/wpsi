try {
  // Restore theme (dark/light)
  var t = localStorage.getItem('wpsi-theme');
  if (t === 'light') {
    document.documentElement.classList.add('light-mode');
    document.documentElement.classList.remove('dark-mode');
  } else {
    document.documentElement.classList.add('dark-mode');
    document.documentElement.classList.remove('light-mode');
  }
  // Restore appearance settings
  var appearance = localStorage.getItem('wpsi-settings-appearance');
  if (appearance) {
    var parsed = JSON.parse(appearance);
    if (parsed.reducedMotion) document.documentElement.classList.add('reduced-motion');
    if (parsed.compactCards) document.documentElement.classList.add('compact-mode');
    if (parsed.accent) document.documentElement.classList.add('theme-' + parsed.accent.toLowerCase());
  } else {
    document.documentElement.classList.add('theme-indigo');
  }
} catch(e) {}
