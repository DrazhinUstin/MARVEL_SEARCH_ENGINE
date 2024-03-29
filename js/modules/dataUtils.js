const fetchData = async (url) => {
    const public_key = 'ee7bb436c44cca33edb8b1306f53d692';
    const private_key = '978e5d092463cd3062b5e1304a826d169a9196c0';
    try {
        const ts = new Date().getTime();
        const stringToHash = `${ts}${private_key}${public_key}`;
        const hash = CryptoJS.MD5(stringToHash);
        const fullUrl = `${url}ts=${ts}&apikey=${public_key}&hash=${hash}`;
        const response = await fetch(fullUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const paginateData = (data, amountPerPage) => {
    const amount = data.length;
    const newArray= [];
    for (let i = 0; i < amount; i += amountPerPage) {
        const subArray = data.slice(i, i + amountPerPage);
        newArray.push(subArray);
    }
    return newArray;
};

const destructureCharactersData = (data) => {
    return data.map(item => {
        const {id, name, description, comics: {available: comics}, events: {available: events}, series: {available: series}, stories: {available: stories},  thumbnail: {extension, path}, urls: [{url}]} = item;
        const image = `${path}.${extension}`;
        return {id, name, description, comics, events, series, stories, image, url};
    });
};

const destructureComicsData = (data) => {
    return data.map(item => {
        const {id, format, title, issueNumber, description, characters: {items: characters}, creators: {items: creators}, pageCount, thumbnail: {extension, path}, urls: [{url}]} = item;
        const image = `${path}.${extension}`;
        return {id, format, title, issueNumber, description, characters, creators, pageCount, image, url};
    });
};

const destructureCreatorsData = (data) => {
    return data.map(item => {
        const {id, fullName: name, comics: {available: comics}, events: {available: events}, series: {available: series}, stories: {available: stories},  thumbnail: {extension, path}, urls: [{url}]} = item;
        const image = `${path}.${extension}`;
        return {id, name, comics, events, series, stories, image, url};
    });
};

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

const saveToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromSessionStorage = (key) => {
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : {};
};

export {fetchData, paginateData, destructureCharactersData, destructureComicsData, destructureCreatorsData, saveToLocalStorage, getFromLocalStorage, saveToSessionStorage, getFromSessionStorage};
