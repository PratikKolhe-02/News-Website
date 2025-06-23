document.addEventListener('DOMContentLoaded', function() {
    // Update date and time
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Mobile menu toggle - fixed event listener
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // Read more buttons functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real implementation, this would navigate to the full article
            alert('This would navigate to the full article in a real implementation');
        });
    });
    
    // Newsletter form submission - fixed event listener
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Search functionality - fixed event listener
    const searchForm = document.querySelector('.search-bar');
    
    if (searchForm) {
        const searchButton = searchForm.querySelector('button');
        
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input[type="text"]');
            const query = searchInput.value.trim();
            
            if (query) {
                // In a real implementation, this would redirect to search results
                alert(`Searching for: ${query}`);
                searchInput.value = '';
            } else {
                alert('Please enter a search term');
            }
        });
        
        // Also handle form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="text"]');
            const query = searchInput.value.trim();
            
            if (query) {
                alert(`Searching for: ${query}`);
                searchInput.value = '';
            } else {
                alert('Please enter a search term');
            }
        });
    }
    
    // Navigation active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.menu li a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // News ticker animation reset
    const tickerList = document.getElementById('ticker-list');
    
    if (tickerList) {
        function resetTickerAnimation() {
            tickerList.style.animation = 'none';
            void tickerList.offsetWidth; // Trigger reflow
            tickerList.style.animation = 'ticker 20s linear infinite';
        }
        
        // Reset animation every minute to prevent lag
        setInterval(resetTickerAnimation, 60000);
    }
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});