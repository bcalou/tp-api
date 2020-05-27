const baseURL = 'https://api.rawg.io/api/';

const games = document.querySelector('.games');
var ordering = document.getElementById('ordering');
const gamesFragment = document.createDocumentFragment();
var orderingValue = ordering.value;
fetchGames();

ordering.addEventListener('change', () => {
    orderingValue = ordering.value;
    fetchGames();
});

function fetchGames() {
    ordering.disabled = true;
    games.innerHTML = '';
    const url = ''.concat(baseURL, 'games?ordering=', orderingValue ,'&page_size=20');
    fetch(url)
    .then(result => result.json())
    .then(data => {
        createGames(data);
        ordering.disabled = false;
    });
}

function createGames(data) {
    data.results.forEach(result => {
        if (result.background_image) {
            const game = createElement({
                type: 'div',
                class: 'game',
                parent: gamesFragment
            });
            
            createElement({
                type: 'img',
                class: 'game-img',
                src: result.background_image,
                alt: result.name,
                parent: game,
            });
            createElement({
                type: 'p',
                class: 'game-title',
                text: result.name,
                parent: game,
            });
        }
    });
    games.appendChild(gamesFragment);
}

function createElement(options) {
    const element = document.createElement(options.type);
    if (options.class) {
        element.setAttribute('class', options.class);
    }
    if (options.text) {
        element.textContent = options.text;
    }
    if (options.href) {
        element.href = options.href;
    }
    if (options.id) {
        element.id = options.id;
    }
    if (options.data_src) {
        spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
        element.setAttribute('data-src', spriteURL);
    } 
    if (options.parent) {
        options.parent.appendChild(element);
    }
    if (options.src) {
        element.src = options.src;
    }
    if (options.alt) {
        element.setAttribute('alt', options.alt);
    }
    return element;
}