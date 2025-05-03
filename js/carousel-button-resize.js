/**
 * Carousel Button Text Resize
 * Detects when carousel button text wraps to multiple lines and applies a class to reduce font size
 */
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if text has wrapped to multiple lines
    function checkButtonTextWrapping() {
        const carouselButtons = document.querySelectorAll('.carousel-caption .btn-carousel');
        
        carouselButtons.forEach(button => {
            // Get the computed height of the button
            const buttonHeight = button.offsetHeight;
            // Get the line height (approximate single line height)
            const computedStyle = window.getComputedStyle(button);
            const lineHeight = parseFloat(computedStyle.lineHeight);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);
            
            // Calculate the total padding
            const totalPadding = paddingTop + paddingBottom;
            
            // If button height minus padding is significantly greater than line height, text has wrapped
            if ((buttonHeight - totalPadding) > (lineHeight * 1.5)) {
                button.classList.add('wrapped-text');
            } else {
                button.classList.remove('wrapped-text');
            }
        });
    }
    
    // Check on page load
    checkButtonTextWrapping();
    
    // Check on window resize
    window.addEventListener('resize', checkButtonTextWrapping);
    
    // Check when language changes (as text length may change)
    document.addEventListener('language-updated', function() {
        // Small delay to ensure DOM has updated with new text
        setTimeout(checkButtonTextWrapping, 100);
    });
    
    // For carousel slide events
    const carousel = document.getElementById('homeCarousel');
    if (carousel) {
        carousel.addEventListener('slid.bs.carousel', checkButtonTextWrapping);
    }
});
