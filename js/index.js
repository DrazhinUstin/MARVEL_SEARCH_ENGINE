import {fetchData, destructureCharactersData, destructureComicsData, getDataFromStorage} from "./modules/dataUtils.js";
import {setupCarousel, populateCarousel} from "./modules/setupCarousel.js";
import setupSlider from "./modules/setupSlider.js";

document.addEventListener('DOMContentLoaded', async () => {
    setupSlider();

    const favoritesDOM = document.querySelector('.favorites .carousel-wrapper');
    const favoritesCountDOM = document.querySelector('.favorites-count');
    const watchFavoritesBtn = document.getElementById('watch-favorites-btn');
    const comicsDOM = document.querySelector('.comics .carousel-wrapper');
    const charactersDOM = document.querySelector('.characters .carousel-wrapper');

    const favoritesData = getDataFromStorage('favorites');
    favoritesCountDOM.textContent = favoritesData.length;
    if (!favoritesData.length) {
        favoritesDOM.innerHTML = ` <div class="message">You don't have favorite comics yet...</div>`
        watchFavoritesBtn.textContent = 'Add favorites';
        watchFavoritesBtn.href = 'comics.html';
    } else if (favoritesData.length < 4) {
        populateCarousel(favoritesDOM, favoritesData, null);
        favoritesDOM.lastElementChild.remove();
        favoritesDOM.lastElementChild.remove();
    } else {
        populateCarousel(favoritesDOM, favoritesData.slice(0, 10), null);
        setupCarousel(favoritesDOM);
    }

    const comicsUrl = 'https://gateway.marvel.com/v1/public/comics?dateDescriptor=lastWeek&limit=10&';
    let comicsData = await fetchData(comicsUrl);
    if (!comicsData) return;
    comicsData = destructureComicsData(comicsData);
    populateCarousel(comicsDOM, comicsData, null);
    setupCarousel(comicsDOM);

    const charactersUrl = 'https://gateway.marvel.com/v1/public/characters?limit=10&';
    let charactersData = await fetchData(charactersUrl);
    if (!charactersData) return;
    charactersData = destructureCharactersData(charactersData);
    populateCarousel(charactersDOM, null, charactersData);
    setupCarousel(charactersDOM);
});