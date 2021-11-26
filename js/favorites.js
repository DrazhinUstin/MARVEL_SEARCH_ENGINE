import {getDataFromStorage, saveDatatoStorage} from "./modules/dataUtils.js";
import {displayComics} from "./modules/displayUtils.js";
import setupNavigation from "./modules/setupNavigation.js";
import Controller from "./modules/Controller.js";

document.addEventListener('DOMContentLoaded', () => {
    const favoritesDOM = document.querySelector('.section.main > div:first-child');
    const favoritesCountDOM = [...document.querySelectorAll('.favorites-count')];
    const clearFavoritesBtn = document.getElementById('clear-favorites-btn');
    let favoritesData = getDataFromStorage('favorites');

    const controller = new Controller(displayComics, 12);
    controller.setupPagination();

    if (!favoritesData.length) {
        favoritesDOM.innerHTML = ` <div class="message">You don't have favorite comics yet...</div>`;
        clearFavoritesBtn.remove();
    } else {
        controller.displayData(favoritesData);
    }
    favoritesDOM.nextElementSibling.classList.remove('hidden');

    clearFavoritesBtn.onclick = (event) => {
        event.preventDefault();
        favoritesDOM.innerHTML = ` <div class="message">You don't have favorite comics yet...</div>`;
        clearFavoritesBtn.remove();
        favoritesData = [];
        favoritesCountDOM.forEach(elem => elem.textContent = favoritesData.length);
        saveDatatoStorage('favorites', favoritesData);
    };

    setupNavigation();
});