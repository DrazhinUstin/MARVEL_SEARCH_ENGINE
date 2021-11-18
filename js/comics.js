import setupComicsSearch from './modules/setupComicsSearch.js';

document.addEventListener('DOMContentLoaded', () => {
    const comicsUrl = `https://gateway.marvel.com/v1/public/comics?`;
    setupComicsSearch(comicsUrl);
});