import {paginateData, getDataFromStorage, saveDatatoStorage} from "./modules/dataUtils.js";
import {displayComics, displayPagination, setActivePage, displayItemsCount} from "./modules/displayUtils.js";

document.addEventListener('DOMContentLoaded', () => {
    const favoritesDOM = document.querySelector('.section > div:first-child');
    const clearFavoritesBtn = document.getElementById('clear-favorites-btn');
    const paginationDOM = document.querySelector('.pagination');
    let favoritesData = getDataFromStorage('favorites');

    if (!favoritesData.length) {
        favoritesDOM.innerHTML = ` <div class="message">You don't have favorite comics yet...</div>`;
        clearFavoritesBtn.remove();
        return;
    }

    displayItemsCount(favoritesData);
    if (favoritesData.length > 12) {
        favoritesData = paginateData(favoritesData, 12);
        displayComics(favoritesData[0]);
        displayPagination(favoritesData);
        paginationDOM.classList.add('active');
    } else {
        paginationDOM.innerHTML = '';
        paginationDOM.classList.remove('active');
        displayComics(favoritesData);
    }

    paginationDOM.addEventListener('click', event => {
        if (event.target.tagName === 'SPAN') {
            let step = event.target.textContent - 1;
            displayComics(favoritesData[step]);
            setActivePage(step);
            return;
        }
        if (event.target.closest('.next-btn')) {
            const pages = [...paginationDOM.querySelectorAll('span')];
            const activePage = pages.find(page => page.classList.contains('active'));
            let step = pages.indexOf(activePage);
            step++;
            if (step > pages.length - 1) step = 0;
            displayComics(favoritesData[step]);
            setActivePage(step);
            return;
    
        }
        if (event.target.closest('.prev-btn')) {
            const pages = [...paginationDOM.querySelectorAll('span')];
            const activePage = pages.find(page => page.classList.contains('active'));
            let step = pages.indexOf(activePage);
            step--;
            if (step < 0) step = pages.length - 1;
            displayComics(favoritesData[step]);
            setActivePage(step);
            return;
        }
    });

    clearFavoritesBtn.onclick = () => {
        favoritesDOM.innerHTML = ` <div class="message">You don't have favorite comics yet...</div>`;
        clearFavoritesBtn.remove();
        favoritesData = [];
        saveDatatoStorage('favorites', favoritesData);
    };
});