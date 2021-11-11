import fetchData from "./modules/fetchData.js";
import setupSlider from "./modules/setupSlider.js";

const form = document.querySelector('.search-form');
const input = form.querySelector('input');
const paginationDOM = document.querySelector('.pagination');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const value = input.value.trim();
    input.blur();
    form.classList.add('disabled');
    heroesData = await fetchData(value);
    input.value = '';
    form.classList.remove('disabled');
    if (!heroesData) return;
    if (Array.isArray(heroesData[0])) {
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

const displayHeroes = (data) => {
    const wrapper = document.querySelector('.search-result');
    wrapper.innerHTML = data.map(item => {
        return `<article>
                    <div>
                        <img src="${item.image}" alt="hero-image">
                    </div>
                    <div class="description">
                        <h3>${item.name}</h3>
                        <p>
                            ${item.description.trim() ? item.description : 'No description provided...'}
                        </p>
                        <a href="hero.html?id=${item.id}" target="_blank">View profile</a>
                    </div>
                </article>`;
    }).join('');
};

const displayPagination = (data) => {
    paginationDOM.innerHTML = `<button class="prev-btn">
                                <i class="fas fa-angle-double-left"></i>
                            </button>
                            ${data.map((_, index) => `<span class="${index === 0 ? 'active' : ''}">${index + 1}</span>`).join('')}
                            <button class="next-btn">
                                <i class="fas fa-angle-double-right"></i>
                            </button>`;
};

const setActivePage = (step) => {
    const pages = paginationDOM.querySelectorAll('span');
    pages.forEach((page, index) => index === step ? page.classList.add('active') : page.classList.remove('active')); 
};

let heroesData;
setupSlider();