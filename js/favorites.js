import {getFromLocalStorage, saveToLocalStorage, getFromSessionStorage} from "./modules/dataUtils.js";
import {displayComics, hidePreloader} from "./modules/displayUtils.js";
import setupNavigation from "./modules/setupNavigation.js";
import Controller from "./modules/Controller.js";

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    const favoritesDOM = document.querySelector('.section.main > div:first-child');
    const favoritesCountDOM = [...document.querySelectorAll('.favorites-count')];
    const clearFavoritesBtn = document.getElementById('clear-favorites-btn');
    const message = `<div class="message"><p>You don't have favorite comics yet...</p><img src="./images/spider.png" alt="spider-icon"/></div>`;
    let favoritesData = getFromLocalStorage('favorites');
    let sessionData = getFromSessionStorage('favorites');

    clearFavoritesBtn.addEventListener('click', event => {
        event.preventDefault();
        favoritesDOM.innerHTML = message;
        clearFavoritesBtn.remove();
        favoritesData = [];
        favoritesCountDOM.forEach(elem => elem.textContent = favoritesData.length);
        saveToLocalStorage('favorites', favoritesData);
    });

    if (!favoritesData.length) {
        favoritesDOM.innerHTML = message;
        clearFavoritesBtn.remove();
    } else {
        const controller = new Controller(displayComics, 12, 'favorites');
        controller.setupPagination();
        sessionData.step ? controller.displayData(favoritesData, sessionData.step) : controller.displayData(favoritesData, 0);
        controller.saveSession();
    }
    favoritesDOM.nextElementSibling.classList.remove('hidden');
});

window.addEventListener('load', hidePreloader);