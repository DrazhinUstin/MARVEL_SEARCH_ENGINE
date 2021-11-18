import {fetchData, paginateData, destructureComicsData} from "./dataUtils.js";
import {displayComics, displayPagination, setActivePage, displayItemsCount, toggleLoading} from "./displayUtils.js";

const setupComicsSearch = (comicsUrl) => {
    const paginationDOM = document.querySelector('.pagination');
    const filtersDOM = document.querySelector('.filters-form');
    const titleFilter = document.getElementById('comic-title-filter');
    const startYearFilter = document.getElementById('start-year-filter');
    const formatFilter = document.getElementById('comic-format-filter');
    const formatTypeFilter = document.getElementById('comic-format-type-filter');
    const dateDescriptorFilter = document.getElementById('comic-date-descriptor-filter');
    const variantFilter = document.getElementById('variant-comics-filter');
    const openFiltersBtn = document.getElementById('open-filters-btn');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    let comicsData;

    applyFiltersBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        toggleLoading();
        const format = formatFilter.value;
        const formatType = formatTypeFilter.value;
        const variant = variantFilter.checked;
        const date = dateDescriptorFilter.value;
        const title = titleFilter.value.trim();
        const year = startYearFilter.value.trim();
        const fullComicsUrl = `${comicsUrl}${format !== 'all' ? 'format=' + format + '&' : ''}${formatType !== 'all' ? 'formatType=' + formatType + '&' : ''}${variant ? 'noVariants=' + variant + '&' : ''}${date !== 'all' ? 'dateDescriptor=' + date + '&' : ''}${title ? 'titleStartsWith=' + title + '&' : ''}${year ? 'startYear=' + year + '&' : ''}limit=100&`;
        const data = await fetchData(fullComicsUrl);
        toggleLoading();
        if (!data) return;
        comicsData = destructureComicsData(data);
        displayItemsCount(comicsData);
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
        formatTypeFilter.value = 'all';
        variantFilter.checked = false;
        dateDescriptorFilter.value = 'all';
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
};

export default setupComicsSearch;