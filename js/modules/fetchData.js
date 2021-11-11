const fetchData = async (value) => {
    const public_key = 'ee7bb436c44cca33edb8b1306f53d692';
    const private_key = '978e5d092463cd3062b5e1304a826d169a9196c0';
    try {
        const ts = new Date().getTime();
        const stringToHash = `${ts}${private_key}${public_key}`;
        const hash = CryptoJS.MD5(stringToHash);
        const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${value}&limit=100&ts=${ts}&apikey=${public_key}&hash=${hash}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.data.results.length) {
            const result = data.data.results.map(item => {
                const {id, name, description, thumbnail: {extension, path}, urls: [{url}]} = item;
                const image = `${path}.${extension}`;
                return {id, name, description, image, url};
            });
            return result.length > 10 ? paginateData(result) : result;
        } else {
            alert('Sorry, but there is no such hero...');
            return null;
        }
    } catch (error) {
        console.log(error);
    }
};

const paginateData = (data) => {
    const amount = data.length;
    const amountPerPage = 10;
    const newArray= [];
    for (let i = 0; i < amount; i += amountPerPage) {
        const subArray = data.slice(i, i + amountPerPage);
        newArray.push(subArray);
    }
    return newArray;
};

export default fetchData;
