// Navigation and content switching
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        sections.forEach(s => s.classList.remove('active'));
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
            target.classList.add('animate-in');
        }

        // Update active states
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
        });
        sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.section);
        });
    });

    // Sidebar link clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.section);
        });
    });

    // Hero buttons
    document.querySelectorAll('[data-navigate]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(btn.dataset.navigate);
        });
    });

    // Show home by default
    showSection('home');

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-value');

    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const rawText = el.getAttribute('data-target-value');
                const end = parseInt(rawText.replace(/\D/g, ''));
                const hasPlus = rawText.includes('+');

                let startTimestamp = null;
                const duration = 2000; // 2 seconds

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                    // Ease out cubic
                    const easeProgress = 1 - Math.pow(1 - progress, 3);

                    const current = Math.floor(easeProgress * end);
                    el.innerText = current + (hasPlus ? '+' : '');

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        // Ensure final value is exact
                        el.innerText = rawText;
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    };

    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });

    stats.forEach(stat => {
        // Save original value to data attribute and reset to 0
        stat.setAttribute('data-target-value', stat.innerText);
        const hasPlus = stat.innerText.includes('+');
        stat.innerText = '0' + (hasPlus ? '+' : '');

        statsObserver.observe(stat);
    });
});
