// Smooth scroll for anchor links (if needed later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-in animation when sections appear
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});
sections.forEach(sec => {
  sec.classList.add("fade-in");
  observer.observe(sec);
});

// Lightbox effect for review images
document.querySelectorAll('.review-grid img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.alt = img.alt;
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      overlay.remove();
    });
  });
});
