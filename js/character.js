import {fetchData, paginateData, destructureHeroesData, destructureComicsData} from "./modules/dataUtils.js";
import {displayCharacter, displayComics, displayPagination, setActivePage} from "./modules/displayUtils.js";

document.addEventListener('DOMContentLoaded', async () => {
    const paginationDOM = document.querySelector('.pagination');
    const getComicsBtn = document.getElementById('get-comics-btn');
    const id = window.location.search.slice(4);
    const characterUrl = `https://gateway.marvel.com:443/v1/public/characters/${id}?`;
    const comicsUrl = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?formatType=comic&limit=100&`;
    let comicsData;
    let characterData = await fetchData(characterUrl);
    if (!characterData) return;
    characterData = destructureHeroesData(characterData);
    document.title = `Marvel Heroes || ${characterData[0].name}`;
    displayCharacter(characterData);

    getComicsBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        comicsData = await fetchData(comicsUrl);
        if (!comicsData) return;
        comicsData = destructureComicsData(comicsData);
        if (comicsData.length > 10) {
            comicsData = paginateData(comicsData, 12);
            displayComics(comicsData[0]);
            displayPagination(comicsData);
            paginationDOM.classList.add('active');
        } else {
            paginationDOM.innerHTML = '';
            paginationDOM.classList.remove('active');
            displayComics(comicsData);
        }
    });

    paginationDOM.addEventListener('click', event => {
        if (event.target.tagName === 'SPAN') {
            let step = event.target.textContent - 1;
            displayComics(comicsData[step]);
            setActivePage(step);
            return;
        }
        if (event.target.closest('.next-btn')) {
            const pages = [...paginationDOM.querySelectorAll('span')];
            const activePage = pages.find(page => page.classList.contains('active'));
            let step = pages.indexOf(activePage);
            step++;
            if (step > pages.length - 1) step = 0;
            displayComics(comicsData[step]);
            setActivePage(step);
            return;
    
        }
        if (event.target.closest('.prev-btn')) {
            const pages = [...paginationDOM.querySelectorAll('span')];
            const activePage = pages.find(page => page.classList.contains('active'));
            let step = pages.indexOf(activePage);
            step--;
            if (step < 0) step = pages.length - 1;
            displayComics(comicsData[step]);
            setActivePage(step);
            return;
        }
    });
});    
