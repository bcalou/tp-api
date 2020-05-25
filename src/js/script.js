const baseURL = 'https://api.rawg.io/api/';
const main = document.querySelector('main');

const url = ''.concat(baseURL);
fetch(url)
.then(result => result.json())
.then(data => {
    // code
});