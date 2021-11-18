import {fetchData, paginateData, destructureHeroesData, getDataFromStorage, destructureComicsData} from "./modules/dataUtils.js";
import {displayHeroes, displayPagination, setActivePage, displayItemsCount, toggleLoading, populateCarousel} from "./modules/displayUtils.js";
import setupSlider from "./modules/setupSlider.js";
import setupCarousel from "./modules/setupCarousel.js";

const form = document.querySelector('.search-form');
const input = form.querySelector('input');
const paginationDOM = document.querySelector('.pagination');
const favoritesCountDOM = document.querySelector('.favorites-count');
const favoritesDOM = document.querySelector('.favorites .carousel-wrapper');
const comicsDOM = document.querySelector('.comics .carousel-wrapper');
const watchFavoritesBtn = document.getElementById('watch-favorites-btn');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    toggleLoading();
    const value = input.value.trim();
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&limit=100&`;
    input.value = '';
    input.blur();
    heroesData = await fetchData(url);
    toggleLoading();
    if (!heroesData) return;
    heroesData = destructureHeroesData(heroesData);
    displayItemsCount(heroesData);
    if (heroesData.length > 10) {
        heroesData = paginateData(heroesData, 10);
        displayHeroes(heroesData[0]);
        displayPagination(heroesData);
        paginationDOM.classList.add('active');
    } else {
        paginationDOM.innerHTML = '';
        paginationDOM.classList.remove('active');
        displayHeroes(heroesData);
    }
});

paginationDOM.addEventListener('click', event => {
    if (event.target.tagName === 'SPAN') {
        let step = event.target.textContent - 1;
        displayHeroes(heroesData[step]);
        setActivePage(step);
        return;
    }
    if (event.target.closest('.next-btn')) {
        const pages = [...paginationDOM.querySelectorAll('span')];
        const activePage = pages.find(page => page.classList.contains('active'));
        let step = pages.indexOf(activePage);
        step++;
        if (step > pages.length - 1) step = 0;
        displayHeroes(heroesData[step]);
        setActivePage(step);
        return;

    }
    if (event.target.closest('.prev-btn')) {
        const pages = [...paginationDOM.querySelectorAll('span')];
        const activePage = pages.find(page => page.classList.contains('active'));
        let step = pages.indexOf(activePage);
        step--;
        if (step < 0) step = pages.length - 1;
        displayHeroes(heroesData[step]);
        setActivePage(step);
        return;
    }
});

let heroesData;
setupSlider();

document.addEventListener('DOMContentLoaded', async () => {
    const favorites = getDataFromStorage('favorites');
    favoritesCountDOM.textContent = favorites.length;
    if (!favorites.length) {
        favoritesDOM.innerHTML = ` <div class="message">You don't have favorite comics yet...</div>`
        watchFavoritesBtn.textContent = 'Find favorites';
        watchFavoritesBtn.href = '###';
    } else if (favorites.length < 4) {
        populateCarousel(favoritesDOM, favorites);
        favoritesDOM.lastElementChild.remove();
        favoritesDOM.lastElementChild.remove();
    } else {
        populateCarousel(favoritesDOM, favorites);
        setupCarousel(favoritesDOM);
    }

    let comicsUrl = 'https://gateway.marvel.com/v1/public/comics?dateDescriptor=lastWeek&limit=10&';
    let comicsData = await fetchData(comicsUrl);
    comicsData = destructureComicsData(comicsData);
    populateCarousel(comicsDOM, comicsData);
    setupCarousel(comicsDOM);
});