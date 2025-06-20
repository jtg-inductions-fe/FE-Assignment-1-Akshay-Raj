import '../styles/main.scss';
import * as constants from './constants.js';

const headerContainer = document.querySelector('.header__container');
const btnToggleMenu = document.getElementById('btn-toggle-menu');
const toggleMenuIcon = btnToggleMenu?.querySelector('.icon-menu');
const linksContainer = document.querySelector('.header__links-container');
const actionsContainer = document.querySelector('.header__actions');

let isMenuOpen = false;

/**
 * Toggles the navigation menu's visibility.
 *
 * This function updates the menu's state, toggles the menu icon,
 * and updates the aria attributes for accessibility.
 *
 * @returns {void}
 */
function toggleNavMenu() {
    if (
        !btnToggleMenu ||
        !toggleMenuIcon ||
        !linksContainer ||
        !actionsContainer
    )
        return;

    isMenuOpen = !isMenuOpen;

    btnToggleMenu.setAttribute('aria-expanded', isMenuOpen.toString());
    toggleMenuIcon.classList.toggle('icon-menu--open', !isMenuOpen);
    toggleMenuIcon.classList.toggle('icon-menu--close', isMenuOpen);

    linksContainer.setAttribute('aria-hidden', (!isMenuOpen).toString());
    linksContainer.classList.toggle(
        'header__links-container--open',
        isMenuOpen,
    );
    actionsContainer.setAttribute('aria-hidden', (!isMenuOpen).toString());
    actionsContainer.classList.toggle('header__actions--open', isMenuOpen);
}

/**
 * Scroll event listener
 *
 * Listens for the window scroll event and
 * adjusts the header vertical spacing.
 *
 */
window.addEventListener('scroll', () => {
    if (!headerContainer) return;
    const pageY = window.scrollY;
    headerContainer.classList.toggle(
        'header__container--scrolled-up',
        pageY >= headerContainer.clientHeight * constants.HEADER_HEIGHT_RATIO,
    );
});

btnToggleMenu?.addEventListener('click', toggleNavMenu);
