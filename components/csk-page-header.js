/**
 * CSK Page Header Web Component
 * A custom element that provides a reusable page header with title overlay for the Centre Social Kariat website
 */
class CSKPageHeader extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root for encapsulation
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Get attributes
    const title = this.getAttribute('title') || '';
    const image = this.getAttribute('image') || '';
    const titleKey = this.getAttribute('title-key') || '';
    
    // When the element is added to the DOM
    this.render(title, image, titleKey);
    
    // Apply initial translations if available
    if (titleKey) {
      const currentLang = localStorage.getItem('preferredLanguage') || 'en';
      this.applyTranslations(currentLang);
    }
    
    // Listen for language-updated events
    document.addEventListener('language-updated', (event) => {
      const { language, translations } = event.detail;
      this.applyTranslations(language, translations);
    });
  }

  render(title, image, titleKey) {
    // Define the HTML and CSS for the page header
    this.shadowRoot.innerHTML = `
      <style>
        /* Page Header Styling */
        :host {
          display: block;
          width: 100%;
          margin-top: 45px; /* Space for navbar */
          font-family: "Segoe UI", Arial, sans-serif;
        }
        
        .page-header {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }
        
        .page-header-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7);
        }
        
        .page-header-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(202, 202, 202, 0.26);
          z-index: 1;
        }
        
        .page-title {
          color: #fff;
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          margin: 0;
          padding: 0 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          font-family: "Segoe UI", Arial, sans-serif;
        }
        
        /* RTL Support */
        :host-context([dir="rtl"]) .page-title {
          /* RTL-specific styles if needed */
        }
        
        /* Responsive adjustments */
        @media (max-width: var(--breakpoint-md)) {
          .page-header {
            height: 200px;
          }
          
          .page-title {
            font-size: 2rem;
          }
        }
      </style>
      
      <div class="page-header">
        <img src="${image}" alt="${title}" class="page-header-image">
        <div class="page-header-overlay">
          <h1 class="page-title" ${titleKey ? `data-i18n="${titleKey}"` : ''}>${title}</h1>
        </div>
      </div>
    `;
  }
  
  /**
   * Apply translations to elements within the shadow DOM
   * @param {string} lang - The language code
   * @param {Object} translations - Optional translations object
   */
  applyTranslations(lang, translations) {
    // If translations not provided, try to get them from window.translations
    const translationData = translations || (window.translations && window.translations[lang]);
    
    if (!translationData) {
      console.warn(`No translations found for language: ${lang}`);
      return;
    }
    
    // Apply translations to elements with data-i18n attribute in shadow DOM
    this.shadowRoot.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translationData[key]) {
        element.textContent = translationData[key];
      }
    });
  }
}

// Define the custom element
customElements.define('csk-page-header', CSKPageHeader);
