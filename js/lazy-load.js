/**
 * Lazy Loading Utility for Centre Social Kariat Website
 * Implements lazy loading for images to improve page load performance
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize lazy loading for all images with data-src attribute
  initLazyLoading();
  
  // Initialize lazy loading for background images with data-bg attribute
  initBackgroundLazyLoading();
});

/**
 * Initialize lazy loading for standard images
 */
window.initLazyLoading = function() {
  // Use IntersectionObserver if available
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          
          // Stop observing the image once loaded
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Start loading when image is 50px from viewport
      threshold: 0.01 // Trigger when at least 1% of the image is visible
    });
    
    // Get all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      // Add a placeholder blur-up effect
      img.classList.add('lazy-image');
      // Start observing the image
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    loadImagesImmediately();
  }
}

/**
 * Initialize lazy loading for background images
 */
window.initBackgroundLazyLoading = function() {
  if ('IntersectionObserver' in window) {
    const bgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const bg = element.getAttribute('data-bg');
          
          if (bg) {
            element.style.backgroundImage = `url(${bg})`;
            element.removeAttribute('data-bg');
            element.classList.add('bg-loaded');
          }
          
          // Stop observing the element once loaded
          observer.unobserve(element);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    // Get all elements with data-bg attribute
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    lazyBackgrounds.forEach(element => {
      // Add a placeholder blur-up effect
      element.classList.add('lazy-background');
      // Start observing the element
      bgObserver.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    loadBackgroundsImmediately();
  }
}

/**
 * Fallback function to load images immediately for browsers without IntersectionObserver
 */
window.loadImagesImmediately = function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
    }
  });
}

/**
 * Fallback function to load background images immediately for browsers without IntersectionObserver
 */
window.loadBackgroundsImmediately = function() {
  const lazyBackgrounds = document.querySelectorAll('[data-bg]');
  lazyBackgrounds.forEach(element => {
    const bg = element.getAttribute('data-bg');
    if (bg) {
      element.style.backgroundImage = `url(${bg})`;
      element.removeAttribute('data-bg');
    }
  });
}

/**
 * Utility function to convert regular images to lazy loaded images
 * This can be called from other components or scripts
 */
window.convertToLazyImages = function() {
  const images = document.querySelectorAll('img:not([data-src]):not(.loaded)');
  images.forEach(img => {
    if (img.src && !img.hasAttribute('data-src') && !img.classList.contains('loaded')) {
      img.setAttribute('data-src', img.src);
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      img.classList.add('lazy-image');
    }
  });
  
  // Re-initialize lazy loading
  initLazyLoading();
};
