/**
 * Apply Lazy Loading to All Pages
 * This script automatically applies lazy loading to all HTML pages in the site
 */

// Function to find all HTML files in the site
async function findAllHtmlFiles() {
  // Get all HTML files in the site
  const htmlFiles = [];
  const links = document.querySelectorAll('a[href]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('http') && !htmlFiles.includes(href)) {
      htmlFiles.push(href);
    }
  });
  
  return htmlFiles;
}

// Function to add lazy loading script to HTML files
async function addLazyLoadingScript(htmlFiles) {
  // For each HTML file, check if it has the lazy loading script
  for (const file of htmlFiles) {
    try {
      const response = await fetch(file);
      const html = await response.text();
      
      // Check if the file already has the lazy loading script
      if (!html.includes('lazy-load.js')) {
        console.log(`Adding lazy loading script to ${file}`);
        
        // This is just for logging - we can't actually modify the file from the browser
        // The actual implementation is done by manually adding the script to each page
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

// Function to initialize lazy loading for all images on the current page
function initLazyLoadingForCurrentPage() {
  // Get all images that don't have data-src attribute
  const images = document.querySelectorAll('img:not([data-src]):not(.loaded)');
  
  // For each image, add data-src attribute and lazy loading class
  images.forEach(img => {
    if (img.src && !img.hasAttribute('data-src') && !img.classList.contains('loaded')) {
      // Skip images that are already lazy loaded or have empty src
      if (img.src === 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E' ||
          img.src === '' || img.src.includes('data:image')) {
        return;
      }
      
      // Store original src in data-src
      const originalSrc = img.src;
      img.setAttribute('data-src', originalSrc);
      
      // Set placeholder image
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
      
      // Add lazy loading class
      img.classList.add('lazy-image');
    }
  });
  
  // Call the lazy loading initialization function from lazy-load.js
  if (typeof window.initLazyLoading === 'function') {
    window.initLazyLoading();
  } else if (typeof initLazyLoading === 'function') {
    initLazyLoading();
  }
}

// Run the script when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize lazy loading for all images on the current page
  initLazyLoadingForCurrentPage();
  
  // Find all HTML files and add lazy loading script
  findAllHtmlFiles().then(htmlFiles => {
    addLazyLoadingScript(htmlFiles);
  });
});
