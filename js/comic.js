import {fetchData, destructureComicsData, getDataFromStorage, saveDatatoStorage} from './modules/dataUtils.js';
import {displayComic} from './modules/displayUtils.js';
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', async () => {
    const addToFavoritesBtn = document.getElementById('add-to-favorites-btn');
    const favoritesCountDOM = [...document.querySelectorAll('.menu-favorites-count')];
    let favoritesData = getDataFromStorage('favorites');
    const id = +window.location.search.slice(4);
    const comicUrl = `https://gateway.marvel.com/v1/public/comics/${id}?`;
    let comicData =  await fetchData(comicUrl);
    if (!comicData) return;
    comicData = destructureComicsData(comicData);
    document.title = `Marvel Heroes || ${comicData[0].title}`;
    displayComic(comicData);
    checkIfInFavorites();
    setupNavigation();

    addToFavoritesBtn.addEventListener('click', (event) => {
        event.preventDefault();
        switch (addToFavoritesBtn.textContent) {
            case 'Add to favorites':
                addToFavoritesBtn.textContent = 'Remove from favorites';
                addToFavoritesBtn.classList.remove('blue');
                favoritesData.push(comicData[0]);
                break;
            case 'Remove from favorites':
                addToFavoritesBtn.textContent = 'Add to favorites';
                addToFavoritesBtn.classList.add('blue');
                favoritesData = favoritesData.filter(item => item.id !== id);
                break;
        }
        favoritesCountDOM.forEach(elem => elem.textContent = favoritesData.length);
        saveDatatoStorage('favorites', favoritesData);
    });

    function checkIfInFavorites () {
        const result = favoritesData.find(item => item.id === id);
        if (result) {
            addToFavoritesBtn.textContent = 'Remove from favorites';
            addToFavoritesBtn.classList.remove('blue');
        }
    }
});