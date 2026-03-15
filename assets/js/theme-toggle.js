const btn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');
btn.onclick = function() {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')) {
    icon.className = 'fas fa-moon'; // moon icon for light mode
  } else {
    icon.className = 'fa-regular fa-sun'; // sun icon for dark mode
  }
};
