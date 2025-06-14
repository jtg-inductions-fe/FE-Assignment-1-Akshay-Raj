import '../styles/main.scss';

const btnToggleMenu = document.getElementById('btn-toggle-menu');
const toggleMenuIcon = btnToggleMenu.querySelector('img');
const linksContainer = document.querySelector('.header__links-container');
const actionsContainer = document.querySelector('.header__actions');

/**
 * Function to close the nav menu
 * @param force forcefully close the nav menu
 */
function toggleNavMenu(force = false) {
    if (force) {
        // Close the menu
        toggleMenuIcon.src = '/assets/menu_open.svg';
        linksContainer.classList.toggle('header__links-container--open', false);
        actionsContainer.classList.toggle('header__actions--open', false);
        window.removeEventListener('resize', onWindowResize);
    } else {
        // Open the menu
        toggleMenuIcon.src = '/assets/menu_close.svg';
        linksContainer.classList.toggle('header__links-container--open', true);
        actionsContainer.classList.toggle('header__actions--open', true);
        window.addEventListener('resize', onWindowResize);
    }
}

function onWindowResize(e) {
    if (e.target.outerWidth >= 1280) {
        // Close the nav menu
        toggleNavMenu(true);
    }
}

// Toggle nav menu
btnToggleMenu.addEventListener('click', () => {
    const isOpen = linksContainer.classList.contains(
        'header__links-container--open',
    );
    toggleNavMenu(isOpen);
});
