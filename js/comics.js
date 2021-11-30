import {getFromSessionStorage} from "./modules/dataUtils.js";
import setupComicsSearch from './modules/setupComicsSearch.js';
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    const comicsUrl = `https://gateway.marvel.com/v1/public/comics?`;
    const data = getFromSessionStorage('comics');
    if (Object.keys(data).length) {
        setupComicsSearch(comicsUrl, true, data);
    } else {
        setupComicsSearch(comicsUrl, true);
    }
});