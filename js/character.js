import {fetchData, destructureCharactersData, getFromSessionStorage} from "./modules/dataUtils.js";
import {displayCharacter, display404} from "./modules/displayUtils.js";
import setupComicsSearch from "./modules/setupComicsSearch.js";
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', async () => {
    setupNavigation();
    const loading = document.querySelector('.loading');
    const id = window.location.search.slice(4);
    const characterUrl = `https://gateway.marvel.com/v1/public/characters/${id}?`;
    const comicsUrl = `https://gateway.marvel.com/v1/public/characters/${id}/comics?`;
    let characterData;
    const sessionData =  getFromSessionStorage('comicsByCharacter');
    if (sessionData.id === id) {
        characterData = sessionData.character;
        document.title = `Marvel Heroes || ${characterData[0].name}`;
        displayCharacter(characterData);
        setupComicsSearch(comicsUrl, 'comicsByCharacter', sessionData);
    } else {
        const data = await fetchData(characterUrl);
        if (data && data.code === 200) {
            characterData = destructureCharactersData(data.data.results);
            document.title = `Marvel Heroes || ${characterData[0].name}`;
            displayCharacter(characterData);
            setupComicsSearch(comicsUrl, 'comicsByCharacter', {id: id, character: characterData});
        } else {
            display404();
        }
    }
    loading.classList.add('hide');
});
