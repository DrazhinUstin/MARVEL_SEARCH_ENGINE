import {getFromSessionStorage} from "./modules/dataUtils.js";
import setupCreatorsSearch from './modules/setupCreatorsSearch.js';
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    const sessionData = getFromSessionStorage('creators');
    setupCreatorsSearch(sessionData);
});