/**
 * CSK Footer Web Component
 * A custom element that provides a reusable footer for the Centre Social Kariat website
 */
class CSKFooter extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root for encapsulation
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // When the element is added to the DOM
    this.render();
    this.setupEventListeners();
    
    // Apply initial translations if available
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    this.applyTranslations(currentLang);
  }
  
  setupEventListeners() {
    // Listen for language-updated events
    document.addEventListener('language-updated', (event) => {
      const { language, translations } = event.detail;
      this.applyTranslations(language, translations);
    });
  }

  render() {
    // Get the current year for copyright
    const currentYear = new Date().getFullYear();
    
    // Define the HTML and CSS for the footer
    this.shadowRoot.innerHTML = `
      <style>
        /* Footer Styling */
        :host {
          display: block;
          width: 100%;
          font-family: "Segoe UI", Arial, sans-serif;
        }
        
        .footer {
          background-color:rgba(44, 57, 70, 0.96);
          color: #fff;
          padding: 2rem 0;
        }
        
        .container {
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 15px;
        }
        
        .row {
          display: flex;
          flex-wrap: wrap;
          margin-right: -15px;
          margin-left: -15px;
        }
        
        .col {
          flex-basis: 0;
          flex-grow: 1;
          max-width: 100%;
          padding-right: 15px;
          padding-left: 15px;
        }
        
        /* Default mobile view (under 500px): all columns stacked */
        .col-footer {
          flex: 0 0 100%;
          max-width: 100%;
          margin-bottom: 2rem;
        }
        
        /* Medium screens (500px-900px): 2x2 grid layout */
        @media (min-width: 500px) {
          .col-footer {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
        
        /* Large screens (over 900px): all 4 columns side-by-side */
        @media (min-width: 900px) {
          .col-footer {
            flex: 0 0 25%;
            max-width: 25%;
          }
        }
        
        h5 {
          font-size: 1.25rem;
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        
        p {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        
        .list-unstyled {
          padding-left: 0;
          list-style: none;
          margin-top: 0;
          margin-bottom: 1rem;
        }
        
        .list-unstyled li {
          margin-bottom: 0.5rem;
        }
        
        footer a {
          color: #fff;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        footer a:hover {
          color: #f8f9fa;
          text-decoration: underline;
        }
        
        .footer-brand {
          color: #fff;
          text-decoration: none;
          font-weight: 600;
        }
        
        .footer-brand:hover {
          color: #f8f9fa;
          text-decoration: none;
        }
        
        .text-center {
          text-align: center;
        }
        
        .mt-3 {
          margin-top: 1rem;
        }
        
        .mb-0 {
          margin-bottom: 0;
        }
        
        /* Bootstrap Icons */
        .bi {
          display: inline-block;
          vertical-align: -0.1em;
          margin-right: 0.5rem;
          width: 1em;
          height: 1em;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          position: relative;
          top: 0.32em;
        }
        
        /* RTL support for icons */
        :host-context([dir="rtl"]) .bi {
          margin-right: 0;
          margin-left: 0.5rem;
        }
        
        .bi-geo-alt-fill {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-geo-alt-fill' viewBox='0 0 16 16'%3E%3Cpath d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z'/%3E%3C/svg%3E");
        }
        
        .bi-telephone-fill {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-telephone-fill' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z'/%3E%3C/svg%3E");
        }
        
        .bi-whatsapp {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-whatsapp' viewBox='0 0 16 16'%3E%3Cpath d='M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z'/%3E%3C/svg%3E");
        }
        
        .bi-envelope-fill {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-envelope-fill' viewBox='0 0 16 16'%3E%3Cpath d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z'/%3E%3C/svg%3E");
        }
        
        .bi-facebook {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-facebook' viewBox='0 0 16 16'%3E%3Cpath d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z'/%3E%3C/svg%3E");
        }
        
        .bi-instagram {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' class='bi bi-instagram' viewBox='0 0 16 16'%3E%3Cpath d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z'/%3E%3C/svg%3E");
        }
        
        .address-line2 {
          padding-left: 24px;
          display: block;
        }
        
        .footer-links li, .contact-list li {
          margin-bottom: 8px;
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
        }
        
        .contact-item i {
          margin-right: 10px;
          min-width: 20px;
        }
        
        .footer-map-container {
          margin-top: 0.5rem;
        }
        
        .footer-map {
          max-width: 80%;
          height: auto;
          border-radius: 8px;
          display: block;
        }
        
        /* Ensure all columns have the same vertical alignment */
        .col-footer {
          display: flex;
          flex-direction: column;
        }
        
        .col-footer h5 {
          margin-bottom: 1rem;
        }
        
        .footer-text {
          font-size: 0.9rem;
          line-height: 1.4;
          margin-bottom: 1rem;
          color: #f8f9fa;
        }

        .footer-image {
          width: 80%;
          height: auto;
          border-radius: 8px;
          margin-top: 0.5rem;
          margin-left: 0;
          margin-right: auto;
          display: block;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        
       
      </style>
      
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-footer">
              <h5><a href="index.html" class="footer-brand">Centre Social Kariat</a></h5>
              <ul class="list-unstyled footer-links">
                <li><a href="our-story.html" data-i18n="nav_about_csk">Our Story</a></li>
                <li><a href="programs.html" data-i18n="nav_programs">Programs</a></li>
                <li><a href="support-us.html" data-i18n="nav_support">Get Involved</a></li>
              </ul>
            </div>
            
            <div class="col-footer">
              <h5 data-i18n="footer_contact_info">Contact Info</h5>
              <ul class="list-unstyled contact-list">
                <li class="contact-item"><i class="bi bi-geo-alt-fill"></i> Rue Zagoura, n100, K.O.M Maroc 11000 Salé, Morocco</li>
                <li class="contact-item"><i class="bi bi-telephone-fill"></i> <a href="tel:+212695305592">+212 695305592</a></li>
                <li class="contact-item"><i class="bi bi-whatsapp"></i> <a href="https://wa.me/212695305592">212695305592</a></li>
                <li class="contact-item"><i class="bi bi-envelope-fill"></i> <a href="mailto:michielbrosky@hotmail.com">michielbrosky@hotmail.com</a></li>
                <li class="contact-item"><i class="bi bi-facebook"></i> <a href="https://facebook.com/TogetherCSK">@TogetherCSK</a></li>
                <li class="contact-item"><i class="bi bi-instagram"></i> <a href="https://instagram.com/centresocialkaria">centresocialkaria</a></li>
              </ul>
            </div>
            
            <div class="col-footer">
              <h5>Location</h5>
              <div class="footer-map-container">
                <img src="images/location.png" alt="CSK on the map" class="footer-map">
              </div>
            </div>
            
            <div class="col-footer">
              <h5>Getting Here</h5>
              <p class="footer-text">We are located on Rue Zagoura near Ave. Zarbia and Hassain stop on tram Line 2. Please stop by the centre for a coffee and to meet our families!</p>
              <img src="images/pic3.jpg" alt="CSK Community" class="footer-image">
            </div>
          </div>
          
          <div class="text-center mt-4">
            <p class="mb-0" data-i18n="footer_copyright">&copy; ${currentYear} Centre Social Kariat. All rights reserved.</p>
          </div>
        </div>
      </footer>
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
customElements.define('csk-footer', CSKFooter);
