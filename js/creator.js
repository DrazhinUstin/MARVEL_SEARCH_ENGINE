import {fetchData, destructureCreatorsData, getFromSessionStorage} from "./modules/dataUtils.js";
import {displayCreator, display404} from "./modules/displayUtils.js";
import setupComicsSearch from "./modules/setupComicsSearch.js";
import setupNavigation from './modules/setupNavigation.js';

document.addEventListener('DOMContentLoaded', async () => {
    setupNavigation();
    const loading = document.querySelector('.loading');
    const id = window.location.search.slice(4);
    const creatorUrl = `https://gateway.marvel.com/v1/public/creators/${id}?`;
    const comicsUrl = `https://gateway.marvel.com/v1/public/creators/${id}/comics?`;
    let creatorData;
    const sessionData =  getFromSessionStorage('comicsByCreator');
    if (sessionData.id === id) {
        creatorData = sessionData.creator;
        document.title = `${creatorData[0].name} | Marvel Search Engine`;
        displayCreator(creatorData);
        setupComicsSearch(comicsUrl, 'comicsByCreator', sessionData);
    } else {
        const data = await fetchData(creatorUrl);
        if (data && data.code === 200) {
            creatorData = destructureCreatorsData(data.data.results);
            document.title = `${creatorData[0].name} | Marvel Search Engine`;
            displayCreator(creatorData);
            setupComicsSearch(comicsUrl, 'comicsByCreator', {id, creator: creatorData});
        } else {
            display404();
        }
    }
    loading.classList.add('hide');
});