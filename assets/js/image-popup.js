// Image Popup (Lightbox) Script
document.addEventListener('DOMContentLoaded', function () {
  // Create the lightbox overlay if it doesn't exist
  if (!document.getElementById('img-lightbox')) {
    const overlay = document.createElement('div');
    overlay.id = 'img-lightbox';
    overlay.style.display = 'none';
    overlay.style.position = 'fixed';
    overlay.style.zIndex = '9999';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    const img = document.createElement('img');
    img.id = 'img-lightbox-img';
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '90vh';
    img.style.boxShadow = '0 0 20px #000';

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  }

  // Attach click event to all images with class 'popup-img'
  document.querySelectorAll('.popup-img').forEach(function (img) {
    img.addEventListener('click', function () {
      const lightbox = document.getElementById('img-lightbox');
      const lightboxImg = document.getElementById('img-lightbox-img');
      lightboxImg.src = this.src;
      lightbox.style.display = 'flex';
    });
  });
});