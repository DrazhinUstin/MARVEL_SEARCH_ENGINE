import {fetchData, destructureCharactersData} from "./dataUtils.js";
import {displayCharacters} from "./displayUtils.js";
import Controller from "./Controller.js";

const setupCharactersSearch = (data) => {
    const loading = document.querySelector('.loading');
    const form = document.querySelector('.search-form');
    const input = form.querySelector('input');
    let charactersData;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        loading.classList.remove('hide');
        const value = input.value.trim();
        const url = `https://gateway.marvel.com/v1/public/characters?${value ? `nameStartsWith=` + value + '&' : ''}limit=100&`;
        input.value = '';
        input.blur();
        const data = await fetchData(url);
        loading.classList.add('hide');
        if (data.code === 200 && data.data.results.length) {
            charactersData = destructureCharactersData(data.data.results);
            controller.displayData(charactersData, 0);
            controller.saveSession();
        } else if (data.code === 200 && !data.data.results.length) {
            alert('Sorry, nothing was found for your search...');
        } else {
            alert('Sorry, something went wrong...');
        }
    });

    const controller = new Controller(displayCharacters, 10, 'characters');
    controller.setupPagination();
    if (data.data) {
        let charactersData = data.data;
        controller.displayData(charactersData, data.step);
        loading.classList.add('hide');
    } else {
        input.nextElementSibling.click();
        input.required = true;
    }
};

export default setupCharactersSearch;