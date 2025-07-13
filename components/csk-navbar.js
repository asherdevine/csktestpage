/**
 * CSK Navbar Web Component
 * A custom element that provides a reusable navigation bar for the Centre Social Kariat website
 */
class CSKNavbar extends HTMLElement {
  // Define static constants for breakpoints that match CSS variables in styles.css
  static BREAKPOINT_XS = 0;       // Matches --breakpoint-xs
  static BREAKPOINT_SM = 576;     // Matches --breakpoint-sm
  static BREAKPOINT_MD = 768;     // Matches --breakpoint-md
  static BREAKPOINT_LG = 992;     // Matches --breakpoint-lg
  static BREAKPOINT_XL = 1200;    // Matches --breakpoint-xl
  static BREAKPOINT_XXL = 1400;   // Matches --breakpoint-xxl
  
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

  render() {
    // Define the HTML and CSS for the navbar
    this.shadowRoot.innerHTML = `
      <style>
        /* Navbar Styling */
        :host {
          display: block;
          width: 100%;
          z-index: 1030;
          font-family: "Segoe UI", Arial, sans-serif;
        }
        
        .navbar {
          background-color: #f8f9fa;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1030;
          padding: 0 1rem;
          height: 45px; /* Default height for sm and smaller screens */
        }
        
        /* Medium height navbar on md screens */
        @media (min-width: ${CSKNavbar.BREAKPOINT_MD}px) and (max-width: ${CSKNavbar.BREAKPOINT_LG - 0.02}px) {
          .navbar {
            height: 55px;
          }
        }
        
        /* Tallest navbar on large and larger screens */
        @media (min-width: ${CSKNavbar.BREAKPOINT_LG}px) {
          .navbar {
            height: 65px;
          }
        }
        
        .container {
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-and-lang-container {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        
        .navbar-brand {
          color: #333333;
          font-weight: 500;
          text-decoration: none;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          font-family: "Segoe UI", Arial, sans-serif;
          height: 45px; /* Match navbar height on sm and smaller screens */
        }
        
        /* Medium height brand on md screens */
        @media (min-width: ${CSKNavbar.BREAKPOINT_MD}px) and (max-width: ${CSKNavbar.BREAKPOINT_LG - 0.02}px) {
          .navbar-brand {
            height: 55px;
          }
        }
        
        /* Tallest brand on large screens */
        @media (min-width: ${CSKNavbar.BREAKPOINT_LG}px) {
          .navbar-brand {
            height: 65px;
          }
        }
        
        .navbar-brand img {
          height: 25px; /* Default size for small screens */
          margin-right: 10px;
        }
        
        /* Larger logo on medium and larger screens */
        @media (min-width: ${CSKNavbar.BREAKPOINT_MD}px) and (max-width: ${CSKNavbar.BREAKPOINT_LG - 0.02}px) {
          .navbar-brand img {
            height: 30px;
          }
        }
        
        /* Largest logo on large screens */
        @media (min-width: ${CSKNavbar.BREAKPOINT_LG}px) {
          .navbar-brand img {
            height: 35px;
          }
        }
        
        .brand-text {
          white-space: normal; /* Allow text to wrap */
          display: flex;
          flex-direction: row; /* Default to row (single line) */
          align-items: baseline;
          line-height: 1;
          font-size: 1.2rem;
          padding-top: 3px;
          margin-left: 10px;
        }
        
        /* Hide brand text on extra small (xs) screens */
        @media (max-width: ${CSKNavbar.BREAKPOINT_SM}px) {
          .brand-text {
            display: none;
          }
        }
        
        .brand-text span {
          display: inline;
          margin-right: 5px;
        }
        
        .brand-text span:last-child {
          margin-right: 0;
        }
        
        .navbar-nav {
          display: flex;
          flex-direction: row;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }
        
        .nav-item {
          margin-right: 1rem;
          display: flex;
          align-items: center;
        }
        
        .nav-link {
          padding: 0 0.75rem;
          margin: 0;
          display: flex;
          align-items: center;
          height: 45px; /* Full height of navbar */
          text-decoration: none;
          color: #333;
          transition: color 0.2s ease;
          font-size: 1rem;
          font-family: inherit;
          white-space: nowrap; /* Prevent text wrapping */
        }
        
        /* RTL support for nav links in mobile view */
        :host-context([dir="rtl"]) .nav-link {
          padding-right: 0.5rem;
        }
        
        .nav-link:hover {
          color: rgba(0, 0, 0, 0.7);
        }
        
        /* Active indicator styles removed */
        
        .dropdown {
          position: relative;
          height: 45px; /* Full height of navbar */
          display: flex;
          align-items: center;
        }
        
        .dropdown-toggle {
          background: none;
          border: none;
          color: #333333;
          font-weight: 600;
          cursor: pointer;
          padding: 0 0.75rem;
          margin: 0;
          display: flex;
          align-items: center;
          font-size: 1rem;
          font-family: inherit;
        }
        
        .navbar-nav .dropdown-toggle {
          padding: 0 0.75rem;
          margin: 0;
          display: flex;
          align-items: center;
          height: 45px; /* Full height of navbar */
          font-size: 1rem;
          font-family: inherit;
          white-space: nowrap; /* Prevent text wrapping */
        }
        
        @media (max-width: ${CSKNavbar.BREAKPOINT_LG}px) {
          .navbar-nav .dropdown-toggle {
            height: auto; /* Reset height for mobile view */
            padding: 0 0.75rem;
          }
          
          .dropdown {
            height: auto; /* Reset height for mobile view */
            display: block;
          }
        }
        
        .language-switcher .dropdown-toggle {
          display: flex;
          align-items: center;
          padding: 0.5rem 0.75rem;
          margin-right: 10px; /* Add margin to separate from hamburger */
          background-color: transparent;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          color: #333;
          text-decoration: none;
          transition: background-color 0.2s ease;
          position: relative;
          height: auto; /* Keep original height for language dropdown */
        }
        
        /* RTL margin for language picker */
        :host-context([dir="rtl"]) .dropdown-toggle {
          margin-right: 0;
          margin-left: 10px;
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          display: none;
          min-width: 8rem;
          padding: 0.5rem 0;
          margin: 0rem 0 0;
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 0.25rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
          z-index: 1000;
          list-style-type: none; /* Remove bullet points */
        }
        
        .dropdown-menu.show {
          display: block;
        }
        
        /* This style block is now handled above */
        
        /* RTL margin for language picker */
        :host-context([dir="rtl"]) .dropdown-toggle {
          margin-right: 0;
          margin-left: 10px;
        }
        
        .dropdown-item {
          display: block;
          width: 100%;
          padding: 0rem 0rem; /* Minimized left padding to align with edge */
          clear: both;
          font-weight: 400;
          color: #212529;
          text-align: inherit;
          white-space: nowrap;
          background-color: transparent;
          border: 0;
          text-decoration: none;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }
        
        .language-switcher {
          display: flex;
          align-items: center;
          margin-left: 1.5rem;
          padding-right: 3.5rem; /* Padding from right edge of screen */
        }
        
        .lang-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          margin-left: 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: inherit;
        }
        
        .lang-btn.active {
          background-color: rgba(74, 124, 89, 0.2);
        }
        
        /* Bootstrap Icons */
        .bi {
          display: inline-block;
          vertical-align: -0.125em;
        }
        
        .bi-chevron-down {
          width: 1em;
          height: 1em;
          margin-left: 0.25rem;
        }
        
        .bi-chevron-down::before {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid currentColor;
        }
        
        /* Hamburger Menu Icon */
        .navbar-toggler {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin: 0;
          width: 30px;
          height: 30px;
          position: relative;
        }
        
        .navbar-toggler-icon,
        .navbar-toggler-icon::before,
        .navbar-toggler-icon::after {
          display: block;
          width: 30px; /* Longer lines */
          height: 2px; /* Thinner lines */
          background-color: #222222; /* Darker color to match image */
          border-radius: 1px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          transition: transform 0.2s ease;
        }
        
        .navbar-toggler-icon {
          top: 50%;
          transform: translate(-50%, -50%);
        }
        
        .navbar-toggler-icon::before {
          content: '';
          top: -10px; /* More spacing between lines */
        }
        
        .navbar-toggler-icon::after {
          content: '';
          bottom: -10px; /* More spacing between lines */
        }
        
        /* Hamburger animation for open state */
        .navbar-toggler.active .navbar-toggler-icon {
          background-color: transparent;
        }
        
        .navbar-toggler.active .navbar-toggler-icon::before {
          transform: translateX(-50%) rotate(45deg);
          top: 0;
        }
        
        .navbar-toggler.active .navbar-toggler-icon::after {
          transform: translateX(-50%) rotate(-45deg);
          bottom: 0;
        }
        
        /* RTL Support */
        :host-context([dir="rtl"]) .navbar-brand img {
          margin-right: 0;
          margin-left: 10px;
        }
        
        :host-context([dir="rtl"]) .dropdown-toggle i {
          margin-left: 0;
          margin-right: 0.25rem;
        }
        
        :host-context([dir="rtl"]) .nav-link {
          text-align: right;
        }
        
        :host-context([dir="rtl"]) .dropdown-menu {
          text-align: right;
        }
        
        /* Responsive adjustments */
        @media (max-width: ${CSKNavbar.BREAKPOINT_LG}px) {
          .navbar-toggler {
            display: flex;
            position: absolute;
            top: 0;
            right: 15px;
            height: 45px; /* Match navbar height for sm and smaller screens */
            align-items: center;
            justify-content: center;
            padding-right: 80px;
            box-sizing: border-box;
          }
          
          @media (min-width: ${CSKNavbar.BREAKPOINT_MD}px) and (max-width: ${CSKNavbar.BREAKPOINT_LG - 0.02}px) {
            .navbar-toggler {
              height: 55px; /* Match navbar height for md screens */
            }
          }
          
          /* RTL support for mobile menu */
          :host-context([dir="rtl"]) .navbar-toggler {
            right: auto;
            left: 15px;
          }
          
          /* RTL padding for language picker in narrow view */
          :host-context([dir="rtl"]) .nav-and-lang-container {
            padding-right: 0;
            padding-left: 70px; /* Space for hamburger icon in RTL mode */
          }
          
          .nav-and-lang-container {
            justify-content: flex-end;
            padding-right: 70px; /* Further increased space for the hamburger icon */
            height: 100%; /* Match the height of the navbar */
            display: flex;
            align-items: center;
          }
          
          .nav-container {
            position: absolute;
            top: 45px; /* Match navbar height for sm and smaller screens */
            left: 0;
            width: 100%;
            background-color: #f8f9fa;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            padding-right: 1.5rem; /* Extra padding to account for scrollbar */
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1029;
            text-align: left;
            box-sizing: border-box; /* Ensure padding is included in width calculation */
          }
          
          /* Adjust dropdown position for md screens */
          @media (min-width: ${CSKNavbar.BREAKPOINT_MD}px) and (max-width: ${CSKNavbar.BREAKPOINT_LG - 0.02}px) {
            .nav-container {
              top: 55px; /* Match navbar height for md screens */
            }
          }
          
          /* Adjust dropdown position for lg screens */
          @media (min-width: ${CSKNavbar.BREAKPOINT_LG}px) {
            .nav-container {
              top: 65px; /* Match navbar height for lg screens */
            }
          }
          
          /* RTL support for dropdown menu */
          :host-context([dir="rtl"]) .nav-container {
            text-align: right;
            padding-right: 2.5rem; /* Extra padding for RTL text and scrollbar */
            padding-left: 1.5rem; /* Add padding on the left for balance */
          }
          
          :host-context([dir="rtl"]) .dropdown-menu {
            padding-left: 0;
            padding-right: 1rem;
          }
          
          .nav-container.show {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          
          .navbar-nav {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          }
          
          .nav-item {
            margin-right: 0;
            margin-bottom: 0.75rem;
            width: 100%;
            height: auto; /* Reset height for mobile view */
            display: block;
          }
          
          .nav-link {
            display: block;
            width: 100%;
            padding: 0.5rem 0.75rem;
            height: auto; /* Reset height for mobile view */
            align-items: flex-start;
          }
          
          .dropdown-menu {
            position: static;
            box-shadow: none;
            border: none;
            padding-left: 1rem;
            width: 100%;
          }
          
          .dropdown-item {
            padding: 0.5rem 0;
          }
          
          .language-switcher {
            margin-left: 0;
            padding-right: 1rem; /* Add padding from right edge in mobile view */
            height: 40px; /* Increased height for taller navbar */
            display: flex;
            align-items: center;
          }
        }
      </style>
      
      <nav class="navbar">
        <div class="container">
          <a class="navbar-brand" href="index.html">
            <img src="images/csklogo2.png" alt="CSK Logo" />
            <div class="brand-text">
              <span>Centre</span>
              <span>Social</span>
              <span>Kariat</span>
            </div>
          </a>
          
          <!-- Always visible on all screen sizes -->
          <div class="nav-and-lang-container">
            <!-- Navigation container - hidden on small screens until toggled -->
            <div class="nav-container">
              <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="index.html#home" data-i18n="nav_home">Home</a></li>
                <li class="nav-item dropdown">
                  <button class="dropdown-toggle" id="aboutDropdown">
                    <span data-i18n="nav_about">About</span> <i class="bi bi-chevron-down"></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="aboutDropdown">
                    <li><a class="dropdown-item" href="our-story.html" data-i18n="nav_about_page">Our Story</a></li>
                    <li><a class="dropdown-item" href="youth-stories.html" data-i18n="nav_gallery">Youth Stories</a></li>
                    <li><a class="dropdown-item" href="land-campaign.html" data-i18n="land_campaign_title">Land Campaign</a></li>
                  </ul>
                </li>
                <li class="nav-item"><a class="nav-link" href="programs.html" data-i18n="nav_programs">Programs</a></li>
                <li class="nav-item"><a class="nav-link" href="location.html" data-i18n="nav_location">Location</a></li>
                <li class="nav-item"><a class="nav-link" href="support-us.html" data-i18n="nav_support">Support Us</a></li>
              </ul>
            </div>
            
            <!-- Language switcher - always visible -->
            <div class="language-switcher">
              <button id="lang-en" class="lang-btn" title="English">EN</button>
              <button id="lang-fr" class="lang-btn" title="Français">FR</button>
              <button id="lang-ar" class="lang-btn" title="العربية">ع</button>
            </div>
          </div>
          
          <!-- Hamburger menu button - only visible on small screens, positioned at the right -->
          <button class="navbar-toggler" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    `;
  }

  setupEventListeners() {
    // Set up dropdown toggle
    const dropdownToggle = this.shadowRoot.querySelector('.dropdown-toggle');
    const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');
    
    if (dropdownToggle && dropdownMenu) {
      dropdownToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (event) => {
        if (!this.contains(event.target)) {
          dropdownMenu.classList.remove('show');
        }
      });
    }
    
    // Set up RTL support
    this.setupRTLSupport();
    
    // Set up hamburger menu toggle
    const navbarToggler = this.shadowRoot.querySelector('.navbar-toggler');
    const navContainer = this.shadowRoot.querySelector('.nav-container');
    
    if (navbarToggler && navContainer) {
      navbarToggler.addEventListener('click', () => {
        navbarToggler.classList.toggle('active');
        navContainer.classList.toggle('show');
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (event) => {
        if (!this.contains(event.target) && navContainer.classList.contains('show')) {
          navbarToggler.classList.remove('active');
          navContainer.classList.remove('show');
        }
      });
      
      // Close mobile menu if window is resized to desktop size
      window.addEventListener('resize', () => {
        if (window.innerWidth > CSKNavbar.BREAKPOINT_LG && navContainer.classList.contains('show')) {
          navbarToggler.classList.remove('active');
          navContainer.classList.remove('show');
        }
      });
    }
    
    // Active nav link functionality removed
    
    // Setup language switcher buttons
    this.setupLanguageSwitcher();
    
    // Listen for language-updated events
    document.addEventListener('language-updated', (event) => {
      const { language, translations } = event.detail;
      this.applyTranslations(language, translations);
    });
  }
  
  // setActiveNavLink function removed
  
  setupLanguageSwitcher() {
    // Get language buttons
    const langButtons = this.shadowRoot.querySelectorAll('.lang-btn');
    
    // Get current language from localStorage or default to 'en'
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Set active class on current language button
    langButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.id === `lang-${currentLang}`) {
        btn.classList.add('active');
      }
      
      // Add click event to language buttons
      btn.addEventListener('click', () => {
        const lang = btn.id.replace('lang-', '');
        
        // Update active state immediately for better UX
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Dispatch a custom event that can be listened to outside the shadow DOM
        const event = new CustomEvent('language-change', {
          bubbles: true,
          composed: true,
          detail: { language: lang }
        });
        this.dispatchEvent(event);
      });
    });
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
    
    // Update RTL support when language changes
    if (lang === 'ar') {
      this.handleRTL(true);
    } else {
      this.handleRTL(false);
    }
  }
  
  /**
   * Set up RTL support for the navbar
   */
  setupRTLSupport() {
    // Initial RTL setup based on current language
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    if (currentLang === 'ar') {
      this.handleRTL(true);
    }
    
    // Watch for changes to the dir attribute on the document
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'dir') {
          const isRTL = document.dir === 'rtl';
          this.handleRTL(isRTL);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
  }
  
  /**
   * Handle RTL-specific styling
   * @param {boolean} isRTL - Whether the current direction is RTL
   */
  handleRTL(isRTL) {
    const navContainer = this.shadowRoot.querySelector('.nav-container');
    const navLinks = this.shadowRoot.querySelectorAll('.nav-link');
    const dropdownMenu = this.shadowRoot.querySelector('.dropdown-menu');
    
    if (navContainer) {
      navContainer.style.textAlign = isRTL ? 'right' : 'left';
      // Add extra padding for RTL text to prevent cutting off and account for scrollbar
      if (isRTL) {
        navContainer.style.paddingRight = '2.5rem'; // Increased to account for scrollbar
        navContainer.style.paddingLeft = '1.5rem'; // Balance padding
      } else {
        navContainer.style.paddingRight = '1.5rem'; // Account for scrollbar in LTR mode too
        navContainer.style.paddingLeft = '1rem';
      }
    }
    
    // Apply RTL styles to nav links
    navLinks.forEach(link => {
      link.style.textAlign = isRTL ? 'right' : 'left';
      // Add padding for RTL text
      if (isRTL) {
        link.style.paddingRight = '0.5rem';
      }
    });
    
    // Apply RTL styles to dropdown menu
    if (dropdownMenu) {
      dropdownMenu.style.textAlign = isRTL ? 'right' : 'left';
      if (isRTL) {
        dropdownMenu.style.paddingRight = '1.5rem'; // Increased padding
        dropdownMenu.style.paddingLeft = '0';
      } else {
        dropdownMenu.style.paddingLeft = '1rem';
        dropdownMenu.style.paddingRight = '0';
      }
    }
  }
}

// Define the custom element
customElements.define('csk-navbar', CSKNavbar);
