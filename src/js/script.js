const baseURL = 'https://api.rawg.io/api/';
const main = document.querySelector('main');

const url = ''.concat(baseURL, 'games?ordering=-rating&page_size=10');
fetch(url)
.then(result => result.json())
.then((data) => {
    data.results.forEach(game => {
        main.textContent+= `[${game.name}-(${game.rating})]-`;
    });
});