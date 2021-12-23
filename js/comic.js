import {fetchData, destructureComicsData, getFromLocalStorage, saveToLocalStorage} from './modules/dataUtils.js';
import {displayComic, display404} from './modules/displayUtils.js';
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', async () => {
    setupNavigation();
    const loading = document.querySelector('.loading');
    const addToFavoritesBtn = document.getElementById('add-to-favorites-btn');
    const favoritesCountDOM = [...document.querySelectorAll('.favorites-count')];
    let favoritesData = getFromLocalStorage('favorites');
    const id = +window.location.search.slice(4);
    const comicUrl = `https://gateway.marvel.com/v1/public/comics/${id}?`;
    let data = await fetchData(comicUrl);
    let comicData;
    if (data && data.code === 200) {
        comicData = destructureComicsData(data.data.results);
        document.title = `${comicData[0].title} | Marvel Search Engine`;
        displayComic(comicData);
        checkIfInFavorites();
    } else {
        display404();
    }
    loading.classList.add('hide');

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
        saveToLocalStorage('favorites', favoritesData);
    });

    function checkIfInFavorites () {
        const isInFavorites = favoritesData.find(item => item.id === id);
        if (isInFavorites) {
            addToFavoritesBtn.textContent = 'Remove from favorites';
            addToFavoritesBtn.classList.remove('blue');
        }
    }
});