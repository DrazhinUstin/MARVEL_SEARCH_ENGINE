import {fetchData, paginateData, destructureHeroesData} from "./modules/dataUtils.js";
import {displayHeroes, displayPagination, setActivePage} from "./modules/displayUtils.js";
import setupSlider from "./modules/setupSlider.js";

const form = document.querySelector('.search-form');
const input = form.querySelector('input');
const paginationDOM = document.querySelector('.pagination');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${value}&limit=100&`;
    input.blur();
    form.classList.add('disabled');
    heroesData = await fetchData(url);
    input.value = '';
    form.classList.remove('disabled');
    if (!heroesData) return;
    heroesData = destructureHeroesData(heroesData);
    if (heroesData.length > 10) {
        heroesData = paginateData(heroesData, 10);
        displayHeroes(heroesData[0]);
        displayPagination(heroesData);
        paginationDOM.classList.add('active');
    } else {
        paginationDOM.innerHTML = '';
        paginationDOM.classList.remove('active');
        displayHeroes(heroesData);
    }
});

paginationDOM.addEventListener('click', event => {
    if (event.target.tagName === 'SPAN') {
        let step = event.target.textContent - 1;
        displayHeroes(heroesData[step]);
        setActivePage(step);
        return;
    }
    if (event.target.closest('.next-btn')) {
        const pages = [...paginationDOM.querySelectorAll('span')];
        const activePage = pages.find(page => page.classList.contains('active'));
        let step = pages.indexOf(activePage);
        step++;
        if (step > pages.length - 1) step = 0;
        displayHeroes(heroesData[step]);
        setActivePage(step);
        return;

    }
    if (event.target.closest('.prev-btn')) {
        const pages = [...paginationDOM.querySelectorAll('span')];
        const activePage = pages.find(page => page.classList.contains('active'));
        let step = pages.indexOf(activePage);
        step--;
        if (step < 0) step = pages.length - 1;
        displayHeroes(heroesData[step]);
        setActivePage(step);
        return;
    }
});

let heroesData;
setupSlider();