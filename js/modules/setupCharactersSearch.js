import {fetchData, destructureCharactersData} from "./dataUtils.js";
import {displayCharacters, toggleLoading} from "./displayUtils.js";
import Controller from "./Controller.js";

const setupCharactersSearch = (immediateLaunch) => {
    const form = document.querySelector('.search-form');
    const input = form.querySelector('input');
    let charactersData;

    const controller = new Controller(displayCharacters, 10);
    controller.setupPagination();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        toggleLoading();
        const value = input.value.trim();
        const url = `https://gateway.marvel.com/v1/public/characters?${value ? `nameStartsWith=` + value + '&' : ''}limit=100&`;
        input.value = '';
        input.blur();
        const data = await fetchData(url);
        toggleLoading();
        if (data.code === 200 && data.data.results.length) {
            charactersData = destructureCharactersData(data.data.results);
            controller.displayData(charactersData);
        } else if (data.code === 200 && !data.data.results.length) {
            alert('Sorry, nothing was found for your search...');
        } else {
            alert('Sorry, something went wrong...');
        }
    });

    if (immediateLaunch) {
        input.required = false;
        input.nextElementSibling.click();
        input.required = true;
    }
};

export default setupCharactersSearch;