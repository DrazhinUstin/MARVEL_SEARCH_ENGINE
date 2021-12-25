import {fetchData, destructureCreatorsData} from "./dataUtils.js";
import {displayCreators} from "./displayUtils.js";
import Controller from "./Controller.js";

const setupCreatorsSearch = (data) => {
    const loading = document.querySelector('.loading');
    const form = document.querySelector('.search-form');
    const input = form.querySelector('input');
    const select = document.getElementById('search-by-filter');
    const alphabetDOM = document.querySelector('.alphabet');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        loading.classList.remove('hide');
        const value = input.value.trim();
        const url = `https://gateway.marvel.com/v1/public/creators?${value ? `${select.value}=` + value + '&' : ''}limit=100&`;
        input.value = '';
        input.blur();
        const data = await fetchData(url);
        loading.classList.add('hide');
        if (data.code === 200 && data.data.results.length) {
            const creatorsData = destructureCreatorsData(data.data.results);
            controller.displayData(creatorsData);
            controller.getFilters(select.parentElement);
            controller.saveSession();
        } else if (data.code === 200 && !data.data.results.length) {
            alert('Sorry, nothing was found for your search...');
        } else {
            alert('Sorry, something went wrong...');
        }
    });

    alphabetDOM.addEventListener('click', (event) => {
        if (event.target.tagName !== 'SPAN') return;
        const value = event.target.textContent;
        clickWithValue(input, value);
    });

    populateAlphabet(alphabetDOM);
    const controller = new Controller(displayCreators, 100, 'creators');
    if (data.data) {
        controller.setFilters(select.parentElement, data.filters);
        controller.displayData(data.data);
        loading.classList.add('hide');
    } else {
        clickWithValue(input, 'a');
    }
};

const populateAlphabet = (alphabetDOM) => {
    const alphabet = [];
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i);
        alphabet.push(letter);
    }
    alphabetDOM.innerHTML = alphabet.map(item => `<span>${item}</span>`).join('');
}

const clickWithValue = (input, value = '') => {
    input.value = value;
    input.nextElementSibling.click();
};

export default setupCreatorsSearch;