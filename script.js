document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Video modal functionality
    const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.getElementById('videoModal');
const modalIframe = document.getElementById('modalIframe');
const closeModal = document.getElementById('closeModal');

videoCards.forEach(card => {
  card.addEventListener('click', function () {
    const videoId = this.getAttribute('data-video-id');
    const youtubeURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modalIframe.src = youtubeURL;
    videoModal.classList.add('active');
  });
});

closeModal.addEventListener('click', function () {
  videoModal.classList.remove('active');
  modalIframe.src = '';
});

videoModal.addEventListener('click', function (e) {
  if (e.target === videoModal) {
    videoModal.classList.remove('active');
    modalIframe.src = '';
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) {
    videoModal.classList.remove('active');
    modalIframe.src = '';
  }
});

    
    // Mobile reviews carousel (for screens smaller than 768px)
    const reviewCards = document.querySelectorAll('.review-card');
    
    function setReviewsForMobile() {
      if (window.innerWidth <= 768) {
        let currentReviewIndex = 0;
        
        // Show only the first review initially
        reviewCards.forEach((card, index) => {
          if (index === 0) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        
        // Create dots container if it doesn't exist
        let dotsContainer = document.querySelector('.carousel-dots');
        if (!dotsContainer) {
          dotsContainer = document.createElement('div');
          dotsContainer.className = 'carousel-dots';
          document.querySelector('.reviews-container').after(dotsContainer);
          
          // Create dots based on number of reviews
          reviewCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = index === 0 ? 'dot active' : 'dot';
            
            dot.addEventListener('click', function() {
              currentReviewIndex = index;
              updateReviewCarousel();
            });
            
            dotsContainer.appendChild(dot);
          });
        }
        
        // Function to update review carousel
        function updateReviewCarousel() {
          reviewCards.forEach((card, index) => {
            card.style.display = index === currentReviewIndex ? 'block' : 'none';
          });
          
          const dots = dotsContainer.querySelectorAll('.dot');
          dots.forEach((dot, index) => {
            if (index === currentReviewIndex) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }
        
        // Add swipe events for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        const reviewsContainer = document.querySelector('.reviews-container');
        
        reviewsContainer.addEventListener('touchstart', e => {
          touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        reviewsContainer.addEventListener('touchend', e => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        }, false);
        
        function handleSwipe() {
          const minSwipeDistance = 50;
          if (touchEndX < touchStartX - minSwipeDistance) {
            // Swipe left, show next review
            currentReviewIndex = (currentReviewIndex + 1) % reviewCards.length;
            updateReviewCarousel();
          } else if (touchEndX > touchStartX + minSwipeDistance) {
            // Swipe right, show previous review
            currentReviewIndex = (currentReviewIndex - 1 + reviewCards.length) % reviewCards.length;
            updateReviewCarousel();
          }
        }
        
        // Auto-rotate reviews every 5 seconds
        setInterval(() => {
          currentReviewIndex = (currentReviewIndex + 1) % reviewCards.length;
          updateReviewCarousel();
        }, 5000);
      } else {
        // For desktop, remove dots and show all reviews
        reviewCards.forEach(card => {
          card.style.display = 'block';
        });
        
        const dotsContainer = document.querySelector('.carousel-dots');
        if (dotsContainer) {
          dotsContainer.remove();
        }
      }
    }
    
    // Initialize on load and window resize
    setReviewsForMobile();
    window.addEventListener('resize', setReviewsForMobile);
  });
