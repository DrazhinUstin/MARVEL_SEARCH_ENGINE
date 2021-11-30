import {fetchData, destructureCharactersData, destructureComicsData, getFromLocalStorage} from "./modules/dataUtils.js";
import {hidePreloader} from "./modules/displayUtils.js";
import {setupCarousel, populateCarousel} from "./modules/setupCarousel.js";
import setupSlider from "./modules/setupSlider.js";
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', async () => {
    setupNavigation();
    const favoritesDOM = document.querySelector('.favorites .carousel-wrapper');
    const watchFavoritesBtn = document.getElementById('watch-favorites-btn');
    const favoritesData = getFromLocalStorage('favorites');

    if (!favoritesData.length) {
        favoritesDOM.innerHTML = `<div class="message">You don't have favorite comics yet...</div>`;
        watchFavoritesBtn.textContent = 'Add favorites';
        watchFavoritesBtn.href = 'comics.html';
    } else if (favoritesData.length < 4) {
        populateCarousel(favoritesDOM, favoritesData);
        favoritesDOM.lastElementChild.remove();
        favoritesDOM.lastElementChild.remove();
    } else {
        populateCarousel(favoritesDOM, favoritesData.slice(0, 10));
        setupCarousel(favoritesDOM);
    }

    const urls = ['https://gateway.marvel.com/v1/public/comics?dateDescriptor=lastWeek&limit=10&', 'https://gateway.marvel.com/v1/public/characters?limit=10&'];
    const wrappers = [...document.querySelectorAll('section.section')].filter(item => item !== favoritesDOM.parentElement);

    Promise.allSettled(urls.map(async (url, index) => {
        let data = await fetchData(url);
        if (!data || data.code !== 200 || !data.data.results.length) {
            wrappers[index].remove();
            return;
        }
        data = index === 0 ? destructureComicsData(data.data.results) : destructureCharactersData(data.data.results);
        populateCarousel(wrappers[index], data);
        setupCarousel(wrappers[index]);
    }));
});

window.addEventListener('load', () => {
    hidePreloader();
    setupSlider();
});