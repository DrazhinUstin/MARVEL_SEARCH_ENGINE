import {fetchData, paginateData, destructureCharactersData} from "./dataUtils.js";
import {displayCharacters, displayPagination, setActivePage, displayItemsCount, toggleLoading} from "./displayUtils.js";

const setupCharactersSearch = (immediateLaunch) => {
    const form = document.querySelector('.search-form');
    const input = form.querySelector('input');
    const paginationDOM = document.querySelector('.pagination');
    let charactersData;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        toggleLoading();
        const value = input.value.trim();
        const url = `https://gateway.marvel.com/v1/public/characters?${value ? `nameStartsWith=` + value + '&' : ''}limit=100&`;
        input.value = '';
        input.blur();
        charactersData = await fetchData(url);
        toggleLoading();
        if (!charactersData) return;
        charactersData = destructureCharactersData(charactersData);
        displayItemsCount(charactersData);
        if (charactersData.length > 10) {
            charactersData = paginateData(charactersData, 10);
            displayCharacters(charactersData[0]);
            displayPagination(charactersData);
            paginationDOM.classList.add('active');
        } else {
            paginationDOM.innerHTML = '';
            paginationDOM.classList.remove('active');
            displayCharacters(charactersData);
        }
    });

    paginationDOM.addEventListener('click', event => {
        if (event.target.tagName === 'SPAN') {
            let step = event.target.textContent - 1;
            displayCharacters(charactersData[step]);
            setActivePage(step);
            return;
        }
        if (event.target.closest('.next-btn')) {
            const pages = [...paginationDOM.querySelectorAll('span')];
            const activePage = pages.find(page => page.classList.contains('active'));
            let step = pages.indexOf(activePage);
            step++;
            if (step > pages.length - 1) step = 0;
            displayCharacters(charactersData[step]);
            setActivePage(step);
            return;
    
        }
        if (event.target.closest('.prev-btn')) {
            const pages = [...paginationDOM.querySelectorAll('span')];
            const activePage = pages.find(page => page.classList.contains('active'));
            let step = pages.indexOf(activePage);
            step--;
            if (step < 0) step = pages.length - 1;
            displayCharacters(charactersData[step]);
            setActivePage(step);
            return;
        }
    });

    if (immediateLaunch) {
        input.required = false;
        input.nextElementSibling.click();
        input.required = true;
    }
};

export default setupCharactersSearch;