import {fetchData, paginateData, destructureHeroesData, destructureComicsData} from "./modules/dataUtils.js";
import {displayCharacter, displayComics, displayPagination, setActivePage, displayItemsCount, toggleLoading} from "./modules/displayUtils.js";

document.addEventListener('DOMContentLoaded', async () => {
    const paginationDOM = document.querySelector('.pagination');
    const filtersDOM = document.querySelector('.filters-form');
    const formatFilter = document.getElementById('comic-format-filter');
    const variantFilter = document.getElementById('variant-comics-filter');
    const titleFilter = document.getElementById('comic-title-filter');
    const startYearFilter = document.getElementById('start-year-filter');
    const getComicsBtn = document.getElementById('get-comics-btn');
    const openFiltersBtn = document.getElementById('open-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const id = window.location.search.slice(4);
    const characterUrl = `https://gateway.marvel.com/v1/public/characters/${id}?`;
    const comicsUrl = `https://gateway.marvel.com/v1/public/characters/${id}/comics?`;
    let comicsData;
    let characterData = await fetchData(characterUrl);
    if (!characterData) return;
    characterData = destructureHeroesData(characterData);
    document.title = `Marvel Heroes || ${characterData[0].name}`;
    displayCharacter(characterData);

    getComicsBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        toggleLoading();
        const formatValue = formatFilter.value;
        const variantValue = variantFilter.checked;
        const titleValue = titleFilter.value.trim();
        const yearValue = startYearFilter.value.trim();
        const fullComicsUrl = `${comicsUrl}${formatValue !== 'all' ? 'format=' + formatValue + '&' : ''}formatType=comic${variantValue ? '&noVariants=' + variantValue : ''}${titleValue ? '&titleStartsWith=' + titleValue : ''}${yearValue ? '&startYear=' + yearValue : ''}&limit=100&`;
        const data = await fetchData(fullComicsUrl);
        toggleLoading();
        if (!data) return;
        comicsData = destructureComicsData(data);
        displayItemsCount(data);
        if (comicsData.length > 12) {
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

    openFiltersBtn.addEventListener('click', (event) => {
        event.preventDefault();
        filtersDOM.classList.toggle('active');
        if (filtersDOM.classList.contains('active')) openFiltersBtn.textContent = 'hide filters';
        else openFiltersBtn.textContent = 'show filters';
    });

    clearFiltersBtn.addEventListener('click', (event) => {
        event.preventDefault();
        formatFilter.value = 'all';
        variantFilter.checked = false;
        titleFilter.value = '';
        startYearFilter.value = '';
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
