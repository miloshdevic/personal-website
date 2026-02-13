document.addEventListener('DOMContentLoaded', () => {
    console.log("Personal Website Scripts Initialized");

    // --- Theme Switcher Logic ---
    const initTheme = () => {
        const themeToggle = document.getElementById('theme-toggle');
        const themeText = document.getElementById('theme-text');
        const body = document.body;

        if (!themeToggle) return;

        const setTheme = (theme) => {
            body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);

            if (themeText) {
                themeText.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
            }
            console.log(`Theme set to: ${theme}`);
        };

        // Load preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    };

    initTheme();

    // --- Scroll Observation ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
