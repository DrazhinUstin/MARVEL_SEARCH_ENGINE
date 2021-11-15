import {fetchData, destructureComicsData} from './modules/dataUtils.js';
import {displayComic} from './modules/displayUtils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const id = window.location.search.slice(4);
    const comicUrl = `https://gateway.marvel.com/v1/public/comics/${id}?`;
    let comicData =  await fetchData(comicUrl);
    comicData = destructureComicsData(comicData);
    document.title = `Marvel Heroes || ${comicData[0].title}`;
    displayComic(comicData);
});