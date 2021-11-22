import {fetchData, destructureCharactersData} from "./modules/dataUtils.js";
import {displayCharacter} from "./modules/displayUtils.js";
import setupComicsSearch from "./modules/setupComicsSearch.js";
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', async () => {
    const id = window.location.search.slice(4);
    const characterUrl = `https://gateway.marvel.com/v1/public/characters/${id}?`;
    const comicsUrl = `https://gateway.marvel.com/v1/public/characters/${id}/comics?`;
    let characterData = await fetchData(characterUrl);
    if (!characterData) return;
    characterData = destructureCharactersData(characterData);
    document.title = `Marvel Heroes || ${characterData[0].name}`;
    displayCharacter(characterData);
    setupComicsSearch(comicsUrl);
    setupNavigation();
});
