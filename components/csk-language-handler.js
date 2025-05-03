/**
 * CSK Language Handler Component
 * A utility component that manages translations and language switching across the site
 */
class CSKLanguageHandler extends HTMLElement {
  constructor() {
    super();
    this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
  }

  connectedCallback() {
    // When the element is added to the DOM
    // Wait a short moment to ensure translations.js is fully loaded
    setTimeout(() => {
      this.setupEventListeners();
      // Apply the current language
      this.applyLanguage(this.currentLang);
      console.log('Language handler initialized with language:', this.currentLang);
      console.log('Available translations:', window.translations ? Object.keys(window.translations) : 'None');
    }, 100);
  }

  setupEventListeners() {
    // Listen for language-change events from the navbar
    document.addEventListener('language-change', (event) => {
      const lang = event.detail.language;
      this.applyLanguage(lang);
    });

    // Also listen for clicks directly on language buttons as a fallback
    document.querySelectorAll('#lang-en, #lang-fr, #lang-ar').forEach(btn => {
      btn.addEventListener('click', (event) => {
        const lang = event.target.id.replace('lang-', '');
        this.applyLanguage(lang);
      });
    });
  }

  applyLanguage(lang) {
    // Ensure translations are available
    if (!window.translations) {
      console.error('Translations not available. Make sure translations.js is loaded before language-handler.js');
      return;
    }

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    this.currentLang = lang;
    
    // Handle RTL for Arabic
    if (lang === 'ar') {
      document.body.classList.add('rtl');
      document.dir = 'rtl';
    } else {
      document.body.classList.remove('rtl');
      document.dir = 'ltr';
    }
    
    console.log(`Applying translations for language: ${lang}`);
    console.log('Translation keys available:', window.translations[lang] ? Object.keys(window.translations[lang]).length : 'None');
    
    // Apply translations to regular DOM elements (outside shadow DOM)
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (window.translations[lang] && window.translations[lang][key]) {
        element.textContent = window.translations[lang][key];
      }
    });
    
    // Apply translations to attributes (like placeholders, alt text, etc.)
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      const data = element.getAttribute('data-i18n-attr').split(',');
      data.forEach(item => {
        const [attr, key] = item.trim().split(':');
        if (window.translations[lang] && window.translations[lang][key]) {
          element.setAttribute(attr, window.translations[lang][key]);
        }
      });
    });
    
    // Apply translations to web components by dispatching an event
    const event = new CustomEvent('language-updated', {
      bubbles: true,
      composed: true,
      detail: { language: lang, translations: window.translations[lang] }
    });
    document.dispatchEvent(event);
    
    // Update active state in language switcher buttons across all components
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.id === `lang-${lang}`) {
        btn.classList.add('active');
      }
    });
    
    // Also directly access the shadow DOM of each component to apply translations
    document.querySelectorAll('csk-navbar, csk-footer').forEach(component => {
      if (component.shadowRoot) {
        component.shadowRoot.querySelectorAll('[data-i18n]').forEach(element => {
          const key = element.getAttribute('data-i18n');
          if (window.translations[lang] && window.translations[lang][key]) {
            element.textContent = window.translations[lang][key];
          }
        });
      }
    });
    
    console.log(`Language switched to: ${lang}`);
  }
}

// Define the custom element
customElements.define('csk-language-handler', CSKLanguageHandler);
