const displayHeroes = (data) => {
    const wrapper = document.querySelector('.search-result');
    wrapper.innerHTML = data.map(item => {
        return `<article class="character">
                    <div>
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div>
                        <h3>${item.name}</h3>
                        <p>
                            ${item.description.trim() ? item.description : 'No description provided...'}
                        </p>
                        <a href="character.html?id=${item.id}" class="btn" target="_blank">View profile</a>
                    </div>
                </article>`;
    }).join('');
};

const displayComics = (data) => {
    const wrapper = document.querySelector('.comics-wrapper');
    wrapper.innerHTML = data.map(item => {
        return ` <article>
                    <img src="${item.image}" alt="comic-image">
                    <div>
                        <h4>${item.title}</h4>
                        <a href="comic.html?${item.id}">Watch</a>
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
                    <a href="${item.url}" class="border-btn" target="_blank">Visit Marvel profile</a>
                </div>`;
    }).join('');
    titleDOM.textContent = data[0].name;
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

export {displayHeroes, displayComics, displayCharacter, displayPagination, setActivePage};