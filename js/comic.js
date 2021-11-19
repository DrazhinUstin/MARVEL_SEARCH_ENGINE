import {fetchData, destructureComicsData, getDataFromStorage, saveDatatoStorage} from './modules/dataUtils.js';
import {displayComic} from './modules/displayUtils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const addToFavoritesBtn = document.getElementById('add-to-favorites-btn');
    let favorites = getDataFromStorage('favorites');
    const id = +window.location.search.slice(4);
    const comicUrl = `https://gateway.marvel.com/v1/public/comics/${id}?`;
    let comicData =  await fetchData(comicUrl);
    if (!comicData) return;
    comicData = destructureComicsData(comicData);
    document.title = `Marvel Heroes || ${comicData[0].title}`;
    displayComic(comicData);
    checkIfInFavorites();

    addToFavoritesBtn.addEventListener('click', (event) => {
        event.preventDefault();
        switch (addToFavoritesBtn.textContent) {
            case 'Add to favorites':
                addToFavoritesBtn.textContent = 'Remove from favorites';
                addToFavoritesBtn.classList.remove('blue');
                favorites.push(comicData[0]);
                break;
            case 'Remove from favorites':
                addToFavoritesBtn.textContent = 'Add to favorites';
                addToFavoritesBtn.classList.add('blue');
                favorites = favorites.filter(item => item.id !== id);
                break;
        }
        saveDatatoStorage('favorites', favorites);
    });

    function checkIfInFavorites () {
        const result = favorites.find(item => item.id === id);
        if (result) {
            addToFavoritesBtn.textContent = 'Remove from favorites';
            addToFavoritesBtn.classList.remove('blue');
        }
    }
});