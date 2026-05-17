const btn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');
const kalshiImg = document.getElementById('kalshi-project-img');
const realtimeImg = document.getElementById('realtime-project-img');
const bcbsImg = document.getElementById('bcbs-project-img');
btn.onclick = function() {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')) {
    icon.className = 'fas fa-moon';
    if (kalshiImg) kalshiImg.src = 'images/predict_proj_opt.jpg';
    if (realtimeImg) realtimeImg.src = 'images/system_architecture_white_opt.jpg';
    if (bcbsImg) bcbsImg.src = 'images/bcbs_system_arch_opt.jpg';
  } else {
    icon.className = 'fa-regular fa-sun';
    if (kalshiImg) kalshiImg.src = 'images/predict_proj_dark_opt.jpg';
    if (realtimeImg) realtimeImg.src = 'images/system_architecture_opt.png';
    if (bcbsImg) bcbsImg.src = 'images/bcbs_system_arch_black_opt.jpg';
  }
};
