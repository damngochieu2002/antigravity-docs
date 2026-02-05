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
});
