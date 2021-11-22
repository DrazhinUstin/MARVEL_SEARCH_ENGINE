import setupCharactersSearch from './modules/setupCharactersSearch.js';
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', () => {
    setupCharactersSearch(true);
    setupNavigation();
});