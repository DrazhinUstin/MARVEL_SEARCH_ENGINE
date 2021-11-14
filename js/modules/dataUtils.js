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
        if (data.code === 200) {
            return data.data.results.length ? data.data.results : alert('Sorry, nothing was found for your search...');
        } else if (data.code === 409) {
            alert('You must pass a four-digit number if you set the series year filter.');
        } else {
            alert('Sorry, something went wrong...');
        }
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

const destructureHeroesData = (data) => {
    return data.map(item => {
        const {id, name, description, comics: {available: comics}, events: {available: events}, series: {available: series}, stories: {available: stories},  thumbnail: {extension, path}, urls: [{url}]} = item;
        const image = `${path}.${extension}`;
        return {id, name, description, comics, events, series, stories, image, url};
    });
};

const destructureComicsData = (data) => {
    return data.map(item => {
        const {id, format, title, description, characters: {items: characters}, creators: {items: creators}, pageCount, thumbnail: {extension, path}, urls: [{url}]} = item;
        const image = `${path}.${extension}`;
        return {id, format, title, description, characters, creators, pageCount, image, url};
    });/* .sort((a, b) => {
        if (a.title > b.title) return 1;
        else if (a.title < b.title) return -1;
        else return 0;
    }); */
};

export {fetchData, paginateData, destructureHeroesData, destructureComicsData};
