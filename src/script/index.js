import '../styles/main.scss';

const btnToggleMenu = document.getElementById('btn-toggle-menu');
const toggleMenuIcon = btnToggleMenu.querySelector('img');
const linksContainer = document.querySelector('.header__links-container');
const actionsContainer = document.querySelector('.header__actions');

/**
 * Opens or closes the navigation menu and updates related UI elements.
 *
 * @param {boolean} [force=false] - If true, forces the menu to close; if false, opens the menu.
 */
function toggleNavMenu(force = false) {
    if (force) {
        // Close the menu
        toggleMenuIcon.src = '/assets/menu_open.svg';
        btnToggleMenu.setAttribute('aria-label', 'Open menu');
        linksContainer.classList.toggle('header__links-container--open', false);
        actionsContainer.classList.toggle('header__actions--open', false);
        window.removeEventListener('resize', onWindowResize);
    } else {
        // Open the menu
        toggleMenuIcon.src = '/assets/menu_close.svg';
        btnToggleMenu.setAttribute('aria-label', 'Close menu');
        linksContainer.classList.toggle('header__links-container--open', true);
        actionsContainer.classList.toggle('header__actions--open', true);
        window.addEventListener('resize', onWindowResize);
    }
}

/**
 * Handles window resize events to manage the visibility and accessibility of the navigation menu toggle button.
 *
 * If the window width is 1280 pixels or wider, hides the toggle button and closes the navigation menu. If the width drops below 1280 pixels and the toggle button is hidden, it makes the button visible again.
 *
 * @param {UIEvent} e - The window resize event.
 */
function onWindowResize(e) {
    if (e.target.outerWidth >= 1280) {
        // Close the nav menu
        btnToggleMenu.setAttribute('aria-hidden', 'true');
        toggleNavMenu(true);
    } else if (btnToggleMenu.getAttribute('aria-hidden') === 'true') {
        btnToggleMenu.setAttribute('aria-hidden', 'false');
    }
}

// Toggle nav menu
btnToggleMenu.addEventListener('click', () => {
    const isOpen = linksContainer.classList.contains(
        'header__links-container--open',
    );
    toggleNavMenu(isOpen);
});
