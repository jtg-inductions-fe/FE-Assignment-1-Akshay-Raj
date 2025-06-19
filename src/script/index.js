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

    linksContainer.classList.toggle(
        'header__links-container--open',
        isMenuOpen,
    );
    actionsContainer.classList.toggle('header__actions--open', isMenuOpen);
}

/**
 * Debounce the function calls.
 *
 *  Debounces a function, delaying its execution until after a specified time
 *  has elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func The function to debounce.
 * @param {number} delay The delay in milliseconds before the function is executed.
 * @returns {Function} A debounced version of that function
 */
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * Scroll event listener
 *
 * Listens for the window scroll event and
 * adjusts the header vertical spacing.
 *
 * @returns {void}
 */
window.addEventListener(
    'scroll',
    debounce(() => {
        if (!headerContainer) return;
        const pageY = window.scrollY;
        headerContainer.classList.toggle(
            'header__container--scrolled-up',
            pageY >=
                headerContainer.clientHeight * constants.HEADER_HEIGHT_RATIO,
        );
    }, 30),
);

btnToggleMenu?.addEventListener('click', toggleNavMenu);
