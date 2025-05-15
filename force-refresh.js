// No-cache solution for translations
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const version = urlParams.get('v');
    const nocache = urlParams.get('nocache');
    
    // Force a hard refresh if nocache parameter is present
    if (nocache) {
        // Clear browser cache for this page
        window.location.reload(true);
        return;
    }
    
    // Store the version in localStorage
    const storedVersion = localStorage.getItem('siteVersion');
    
    if (version && version !== storedVersion) {
        localStorage.setItem('siteVersion', version);
        // Force reload with cache clearing
        window.location.reload(true);
    }
    
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    console.log('Page loaded with timestamp: ' + timestamp);
    
    // Get current language or default to English
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Force immediate update of all translations
    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang] && translations[currentLang][key]) {
                // Force DOM update by setting innerHTML
                element.innerHTML = translations[currentLang][key];
            }
        });
        console.log('Translations applied with timestamp: ' + timestamp);
    }
    
    // Apply translations immediately
    applyTranslations();
    
    // And again after a short delay to ensure everything is loaded
    setTimeout(applyTranslations, 100);
});
