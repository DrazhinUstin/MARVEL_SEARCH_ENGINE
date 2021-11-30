import {getFromSessionStorage} from "./modules/dataUtils.js";
import setupCharactersSearch from './modules/setupCharactersSearch.js';
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    const sessionData = getFromSessionStorage('characters');
    setupCharactersSearch(sessionData);
});