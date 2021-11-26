import {fetchData, destructureCharactersData} from "./modules/dataUtils.js";
import {displayCharacter, display404, toggleLoading} from "./modules/displayUtils.js";
import setupComicsSearch from "./modules/setupComicsSearch.js";
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', async () => {
    toggleLoading();
    const id = window.location.search.slice(4);
    const characterUrl = `https://gateway.marvel.com/v1/public/characters/${id}?`;
    const comicsUrl = `https://gateway.marvel.com/v1/public/characters/${id}/comics?`;
    let data = await fetchData(characterUrl);
    let characterData;
    if (data && data.code === 200) {
        characterData = destructureCharactersData(data.data.results);
        document.title = `Marvel Heroes || ${characterData[0].name}`;
        displayCharacter(characterData);
        setupComicsSearch(comicsUrl);
    } else {
        display404();
    }
    setupNavigation();
    toggleLoading();
});
