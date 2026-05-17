const btn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');
const kalshiImg    = document.getElementById('kalshi-project-img');
const realtimeImg  = document.getElementById('realtime-project-img');
const musicSyncImg = document.getElementById('music-sync-project-img');
const spotifyImg   = document.getElementById('spotify-project-img');
const bcbsImg      = document.getElementById('bcbs-project-img');
btn.onclick = function() {
  document.body.classList.toggle('light-theme');
  if (document.body.classList.contains('light-theme')) {
    icon.className = 'fas fa-moon';
    if (kalshiImg)    kalshiImg.src    = 'images/kalshi_light_opt.jpg';
    if (realtimeImg)  realtimeImg.src  = 'images/realtime_light_opt.jpg';
    if (musicSyncImg) musicSyncImg.src = 'images/music_sync_light_opt.jpg';
    if (spotifyImg)   spotifyImg.src   = 'images/spotify_light_opt.jpg';
    if (bcbsImg)      bcbsImg.src      = 'images/healthcare_light_opt.jpg';
  } else {
    icon.className = 'fa-regular fa-sun';
    if (kalshiImg)    kalshiImg.src    = 'images/kalshi_dark_opt.jpg';
    if (realtimeImg)  realtimeImg.src  = 'images/realtime_dark_opt.jpg';
    if (musicSyncImg) musicSyncImg.src = 'images/music_sync_dark_opt.jpg';
    if (spotifyImg)   spotifyImg.src   = 'images/spotify_dark_opt.jpg';
    if (bcbsImg)      bcbsImg.src      = 'images/healthcare_dark_opt.jpg';
  }
};
