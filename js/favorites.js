import {getFromLocalStorage, saveToLocalStorage, getFromSessionStorage} from "./modules/dataUtils.js";
import {displayComics, hidePreloader} from "./modules/displayUtils.js";
import setupNavigation from "./modules/setupNavigation.js";
import Controller from "./modules/Controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const favoritesDOM = document.querySelector('.section.main > div:first-child');
    const favoritesCountDOM = [...document.querySelectorAll('.favorites-count')];
    const clearFavoritesBtn = document.getElementById('clear-favorites-btn');
    let favoritesData = getFromLocalStorage('favorites');
    let sessionData = getFromSessionStorage('favorites');

    const controller = new Controller(displayComics, 12, 'favorites');
    controller.setupPagination();

    if (!favoritesData.length) {
        favoritesDOM.innerHTML = ` <div class="message">You don't have favorite comics yet...</div>`;
        clearFavoritesBtn.remove();
    } else {
        sessionData.step ? controller.displayData(favoritesData, sessionData.step) : controller.displayData(favoritesData, 0);
    }
    favoritesDOM.nextElementSibling.classList.remove('hidden');

    clearFavoritesBtn.onclick = (event) => {
        event.preventDefault();
        favoritesDOM.innerHTML = ` <div class="message">You don't have favorite comics yet...</div>`;
        clearFavoritesBtn.remove();
        favoritesData = [];
        favoritesCountDOM.forEach(elem => elem.textContent = favoritesData.length);
        saveToLocalStorage('favorites', favoritesData);
    };

    setupNavigation();
});

window.addEventListener('load', hidePreloader);