const displayCharacters = (data) => {
    const charactersDOM = document.querySelector('.characters-wrapper');
    charactersDOM.innerHTML = data.map(item => {
        return `<article class="article">
                    <div>
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div>
                        <h4>${item.name}</h4>
                        <p>
                            ${item.description.trim() ? item.description : 'No description provided...'}
                        </p>
                        <a href="character.html?id=${item.id}" class="btn">View profile</a>
                    </div>
                </article>`;
    }).join('');
};

const displayComics = (data) => {
    const comicsDOM = document.querySelector('.comics-wrapper');
    comicsDOM.innerHTML = data.map(item => {
        return `<article>
                    <img src="${item.image}" alt="${item.title}">
                    <div>
                        <h4>${item.title}</h4>
                        <a href="comic.html?id=${item.id}">Watch</a>
                    </div>
                </article>`;
    }).join('');
};

const displayCreators = (data) => {
    const creatorsDOM = document.querySelector('.creators-wrapper');
    creatorsDOM.innerHTML = data.map(item => {
        return `<article>
                    <a href="creator.html?id=${item.id}">${item.name}</a>
                </article>`;
    }).join('');
};

const displayCharacter = (data) => {
    const characterDOM = document.querySelector('.article.character');
    characterDOM.innerHTML = data.map(item => {
        return `<div>
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div>
                    ${item.description.trim() ? '<p>' + item.description + '</p>' : ''}
                    <h4>Comics: <span>${item.comics}</span></h4>
                    <h4>Series: <span>${item.series}</span></h4>
                    <h4>Stories: <span>${item.stories}</span></h4>
                    <h4>Events: <span>${item.events}</span></h4>
                    <a href="${item.url}" class="border-btn yellow" target="_blank">Visit Marvel profile</a>
                </div>`;
    }).join('');
    displayHeader(data[0]);
    characterDOM.nextElementSibling.classList.remove('hidden');
};

const displayComic = (data) => {
    const comicDOM = document.querySelector('.article.comic');
    comicDOM.innerHTML = data.map(item => {
        return `<div>
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div>
                    ${item.description ? '<p>' + checkForTags(item.description) + '</p>' : ''}
                    <h4>Format: <span>${item.format}</span></h4>
                    ${item.issueNumber ? '<h4>Issue number: <span>' + item.issueNumber + '</span></h4>' : ''}
                    ${item.pageCount ? '<h4>Number of pages: <span>' + item.pageCount + '</span></h4>' : ''}
                    ${item.characters.length ?  '<h4>Characters:</h4><ul>' + item.characters.map(character => {
                        return `<li><a class="btn blue" href="character.html?id=${getItemID(character.resourceURI)}">${character.name}</a></li>`
                    }).join('') + '</ul>' : ''}
                    ${item.creators.length ?  '<h4>Creators:</h4><ul>' + item.creators.map(creator => {
                        return `<li><a class="btn red" href="creator.html?id=${getItemID(creator.resourceURI)}">${creator.name}, ${creator.role}</a></li>`
                    }).join('') + '</ul>' : ''}
                    <a href="${item.url}" class="border-btn yellow" target="_blank">Visit marvel profile</a>
                </div>`;
    }).join('');
    displayHeader(data[0]);
    comicDOM.nextElementSibling.classList.remove('hidden');

    function checkForTags (string) {
        if (!string.includes('<ul>')) return string;
        const div = document.createElement('div');
        div.innerHTML = string;
        return div.textContent;
    }

    function getItemID (url) {
        const index = url.lastIndexOf('/');
        return url.slice(index + 1);
    }
};

const displayCreator = (data) => {
    const creatorDOM = document.querySelector('.article.creator');
    creatorDOM.innerHTML = data.map(item => {
        return `<div>
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div>
                    <h4>Comics: <span>${item.comics}</span></h4>
                    <h4>Series: <span>${item.series}</span></h4>
                    <h4>Stories: <span>${item.stories}</span></h4>
                    <h4>Events: <span>${item.events}</span></h4>
                    <a href="${item.url}" class="border-btn yellow" target="_blank">Visit Marvel profile</a>
                </div>`;
    }).join('');
    displayHeader(data[0]);
    creatorDOM.nextElementSibling.classList.remove('hidden');
};

const displayHeader = (data) => {
    const stagesDOM = document.querySelector('.stages .section');
    const newStage = document.createElement('a');
    const cutString = makeStringShorter(data.title || data.name);
    newStage.href = data.url;
    newStage.textContent = cutString;
    stagesDOM.append(newStage);

    const titleDOM = document.querySelector('.title h3');
    titleDOM.textContent = data.title || data.name;

    function makeStringShorter (string) {
        if (string.length <= 20) return string;
        return `${string.substring(0, 17).trim()}...`;
    }
};

const display404 = () => {
    const errorDOM = document.querySelector('.section.main');
    errorDOM.innerHTML = `
        <div class="title">
            <h3>Page not found...</h3>
        </div>
        <div class="message">
            <img src="./images/robot.png" alt="robot-icon">
        </div>
        <div class="btn-container">
            <a href="index.html" class="border-btn">Back home</a>
        </div>`;
};

const displayPagination = (data, step) => {
    const paginationDOM = document.querySelector('.pagination');
    if (!data) {
        paginationDOM.innerHTML = '';
        paginationDOM.classList.remove('active');
        return;
    }
    paginationDOM.innerHTML = `<button class="prev-btn">
                                <i class="fas fa-angle-double-left"></i>
                            </button>
                            ${data.map((_, index) => `<span class="${index === step ? 'active' : ''}">${index + 1}</span>`).join('')}
                            <button class="next-btn">
                                <i class="fas fa-angle-double-right"></i>
                            </button>`;
    paginationDOM.classList.add('active');
};

const displayItemsCount = (data) => {
    const itemsCountDOM = document.querySelector('.items-count');
    itemsCountDOM.innerHTML = `Total items: <span>${data.length}</span>`;
    itemsCountDOM.classList.add('active');
};

const hidePreloader = () => {
    const preloader = document.querySelector('.preloader');
    preloader.addEventListener('transitionend', () => preloader.remove());
    preloader.classList.add('hide');
};

export {displayCharacters, displayComics, displayCreators, displayCharacter, displayComic, displayCreator, display404, displayPagination, displayItemsCount, hidePreloader};