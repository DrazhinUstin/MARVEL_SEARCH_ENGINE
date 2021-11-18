const displayHeroes = (data) => {
    const charactersDOM = document.querySelector('.characters-wrapper');
    charactersDOM.innerHTML = data.map(item => {
        return `<article class="character">
                    <div>
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div>
                        <h4>${item.name}</h4>
                        <p>
                            ${item.description.trim() ? item.description : 'No description provided...'}
                        </p>
                        <a href="character.html?id=${item.id}" class="btn" target="_blank">View profile</a>
                    </div>
                </article>`;
    }).join('');
};

const displayComics = (data) => {
    const comicsDOM = document.querySelector('.comics-wrapper');
    comicsDOM.innerHTML = data.map(item => {
        return ` <article>
                    <img src="${item.image}" alt="comic-image">
                    <div>
                        <h4>${item.title}</h4>
                        <a href="comic.html?id=${item.id}" target="_blank">Watch</a>
                    </div>
                </article>`;
    }).join('');
};

const displayCharacter = (data) => {
    const characterDOM = document.querySelector('.character');
    const titleDOM = document.querySelector('.title h3');
    characterDOM.innerHTML = data.map(item => {
        return `<div>
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div>
                    <p>${item.description.trim() ? item.description : 'No description provided...'}</p>
                    <h4>Comics: <span>${item.comics}</span></h4>
                    <h4>Series: <span>${item.series}</span></h4>
                    <h4>Stories: <span>${item.stories}</span></h4>
                    <h4>Events: <span>${item.events}</span></h4>
                    <a href="${item.url}" class="border-btn yellow" target="_blank">Visit Marvel profile</a>
                </div>`;
    }).join('');
    titleDOM.textContent = data[0].name;
};

const displayComic = (data) => {
    const comicDOM = document.querySelector('.comic');
    const titleDOM = document.querySelector('.title h3');
    comicDOM.innerHTML = data.map(item => {
        return `<div>
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div>
                    <p>${item.description ? item.description : 'No description provided...'}</p>
                    <h4>Format: <span>${item.format}</span></h4>
                    <h4>Number of pages: <span>${item.pageCount}</span></h4>
                    <h4>Characters:</h4>
                    <ul>
                        ${item.characters.length ? item.characters.map(character => {
                            const index = character.resourceURI.lastIndexOf('/')
                            const id = character.resourceURI.slice(index + 1)
                            return `<li><a href="character.html?id=${id}" target="_blank">${character.name}</a></li>`
                        }).join('') : '<p>No characters provided...</p>'}
                    </ul>
                    <a href="${item.url}" class="border-btn yellow" target="_blank">Visit marvel profile</a>
                </div>`;
    }).join('');
    titleDOM.textContent = data[0].title;
};

const displayPagination = (data) => {
    const paginationDOM = document.querySelector('.pagination');
    paginationDOM.innerHTML = `<button class="prev-btn">
                                <i class="fas fa-angle-double-left"></i>
                            </button>
                            ${data.map((_, index) => `<span class="${index === 0 ? 'active' : ''}">${index + 1}</span>`).join('')}
                            <button class="next-btn">
                                <i class="fas fa-angle-double-right"></i>
                            </button>`;
};

const setActivePage = (step) => {
    const paginationDOM = document.querySelector('.pagination');
    const pages = paginationDOM.querySelectorAll('span');
    pages.forEach((page, index) => index === step ? page.classList.add('active') : page.classList.remove('active')); 
};

const displayItemsCount = (data) => {
    const itemsCountDOM = document.querySelector('.items-count');
    itemsCountDOM.innerHTML = `Total items: <span>${data.length}</span>`;
    itemsCountDOM.classList.add('active');
};

const toggleLoading = () => {
    const loading = document.querySelector('.loading');
    loading.classList.toggle('show');
};

const populateCarousel = (carouselDOM, data) => {
    const carousel = carouselDOM.querySelector('.carousel');
    carousel.innerHTML = data.map(item => {
        return ` <div class="slide">
                    <img src="${item.image}" alt="${item.name}">
                    <footer><a href="comic.html?id=${item.id}">Watch</a></footer>
                </div>`;
    }).join('');
};

export {displayHeroes, displayComics, displayCharacter, displayComic, displayPagination, setActivePage, displayItemsCount, toggleLoading, populateCarousel};