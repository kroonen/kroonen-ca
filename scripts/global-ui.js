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
        copyrightElement.textContent = `© ${year} Robin Kroonen`;
    }
});