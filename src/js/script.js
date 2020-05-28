const baseURL = 'https://api.rawg.io/api/';

const games = document.querySelector('.games');
const gamesFragment = document.createDocumentFragment();

var ordering = document.getElementById('ordering');
var orderingValue = ordering.value;

var platforms = document.getElementById('platforms');
var platformsValue = platforms.value;

fetchGames();

ordering.addEventListener('change', () => {
    orderingValue = ordering.value;
    fetchGames();
});

platforms.addEventListener('change', () => {
    platformsValue = platforms.value;
    fetchGames();
});

function fetchGames() {
    ordering.disabled = true;
    platforms.disabled = true;
    games.innerHTML = '';
    const url = ''.concat(baseURL, 'games?ordering=', orderingValue, '&parent_platforms=', platformsValue,'&page_size=20');
    fetch(url)
    .then(result => result.json())
    .then(data => {
        createGames(data);
        createLinks();
        ordering.disabled = false;
        platforms.disabled = false;
    });
}

function createGames(data) {
    data.results.forEach(result => {
        if (result.background_image) {
            const game = createElement({
                type: 'a',
                id: result.id,
                class: 'game',
                href: 'infos.html',
                parent: gamesFragment,
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

function createLinks() {
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            localStorage.setItem('id', link.id);
        });
    });
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