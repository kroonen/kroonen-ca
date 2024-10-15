document.addEventListener('DOMContentLoaded', () => {
    // Menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');

    if (menuToggle && menuItems) {
        menuToggle.addEventListener('click', () => {
            menuItems.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = menuToggle.contains(event.target) || menuItems.contains(event.target);
            if (!isClickInsideMenu && menuItems.classList.contains('active')) {
                menuItems.classList.remove('active');
            }
        });
    }

    // Copyright update
    const copyrightElement = document.getElementById('copyright');
    if (copyrightElement) {
        const year = new Date().getFullYear();
        copyrightElement.innerHTML = `© ${year} Robin Kroonen | A core initiative of <a href="https://www.kroonen.ai" target="_blank" rel="noopener noreferrer">Kroonen.ai</a>, dedicated to advancing AI-driven creativity and computational research.`;
    }
});
