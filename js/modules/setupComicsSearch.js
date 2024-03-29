import {fetchData, destructureComicsData} from "./dataUtils.js";
import {displayComics} from "./displayUtils.js";
import Controller from "./Controller.js";

const setupComicsSearch = (comicsUrl, key, data) => {
    const loading = document.querySelector('.loading');
    const filtersDOM = document.querySelector('.filters-form');
    const titleFilter = document.getElementById('comic-title-filter');
    const startYearFilter = document.getElementById('start-year-filter');
    const issueNumberFilter = document.getElementById('issue-number-filter');
    const formatFilter = document.getElementById('comic-format-filter');
    const formatTypeFilter = document.getElementById('comic-format-type-filter');
    const dateDescriptorFilter = document.getElementById('comic-date-descriptor-filter');
    const variantFilter = document.getElementById('variant-comics-filter');
    const openFiltersBtn = document.getElementById('open-filters-btn');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    applyFiltersBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        loading.classList.remove('hide');
        const format = formatFilter.value;
        const formatType = formatTypeFilter.value;
        const variant = variantFilter.checked;
        const date = dateDescriptorFilter.value;
        const title = titleFilter.value.trim();
        const year = startYearFilter.value.trim();
        const issueNumber = issueNumberFilter.value.trim();
        const fullComicsUrl = `${comicsUrl}${format !== 'all' ? 'format=' + format + '&' : ''}${formatType !== 'all' ? 'formatType=' + formatType + '&' : ''}${variant ? 'noVariants=' + variant + '&' : ''}${date !== 'all' ? 'dateDescriptor=' + date + '&' : ''}${title ? 'titleStartsWith=' + title + '&' : ''}${year ? 'startYear=' + year + '&' : ''}${issueNumber ? 'issueNumber=' + issueNumber + '&' : ''}limit=100&`;
        const data = await fetchData(fullComicsUrl);
        loading.classList.add('hide');
        if (data.code === 200 && data.data.results.length) {
            const comicsData = destructureComicsData(data.data.results);
            controller.getFilters(filtersDOM);
            controller.displayData(comicsData);
            controller.saveSession();
        } else if (data.code === 200 && !data.data.results.length) {
            alert('Sorry, nothing was found for your search...');
        } else if (data.code === 409) {
            alert(data.status);
        } else {
            alert('Sorry, something went wrong...');
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
        formatTypeFilter.value = 'all';
        variantFilter.checked = false;
        dateDescriptorFilter.value = 'all';
        titleFilter.value = '';
        startYearFilter.value = '';
        issueNumberFilter.value = '';
    });

    const controller = new Controller(displayComics, 12, key);
    if (data.id) {
        controller.id = data.id;
        data.character ? controller.character = data.character : controller.creator = data.creator;
    };
    controller.setupPagination();
    if (data.data) {
        controller.setFilters(filtersDOM, data.filters);
        controller.displayData(data.data, data.step);
        loading.classList.add('hide');
    } else if (key === 'comics') {
        applyFiltersBtn.click();
    }
};

export default setupComicsSearch;