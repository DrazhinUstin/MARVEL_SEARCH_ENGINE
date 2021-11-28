import {getFromSessionStorage} from "./modules/dataUtils.js";
import setupCharactersSearch from './modules/setupCharactersSearch.js';
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', () => {
    const data = getFromSessionStorage('characters');
    if (Object.keys(data).length) {
        setupCharactersSearch(data);
    } else {
        setupCharactersSearch();
    }
    setupNavigation();
});