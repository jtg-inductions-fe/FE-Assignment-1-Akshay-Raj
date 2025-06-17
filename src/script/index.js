import '../styles/main.scss';

const headerContainer = document.querySelector('.header__container');
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

function onWindowResize(e) {
    if (e.target.outerWidth >= 1280) {
        // Close the nav menu
        btnToggleMenu.setAttribute('aria-hidden', 'true');
        toggleNavMenu(true);
    } else if (btnToggleMenu.getAttribute('aria-hidden') === 'true') {
        btnToggleMenu.setAttribute('aria-hidden', 'false');
    }
}

function onWindowScroll() {
    const pageY = window.scrollY;
    headerContainer.classList.toggle(
        'header__container--scrolled-up',
        pageY >= headerContainer.clientHeight * 0.5,
    );
}

window.addEventListener('scroll', onWindowScroll);

// Toggle nav menu
btnToggleMenu.addEventListener('click', () => {
    const isOpen = linksContainer.classList.contains(
        'header__links-container--open',
    );
    toggleNavMenu(isOpen);
});
