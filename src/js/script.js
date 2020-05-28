const $cardContainer = document.querySelector('.cards');
const pokemonMax = 800;

const fetchPokemon = () => {
  for (let i = 1; i <= pokemonMax; i++) {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${i}`;

    fetch(API_URL)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        getPokemon(
          data.name,
          data.id,
          data.types.map(type => type.type.name)[0],
          i
        );
      });
  }
};

function getPokemon(name, id, type, i) {
  document.querySelector('.cards').innerHTML += '';
  const card = createCardElement({
    type: 'div',
    content: '',
    class: `card card--${type}`,
    parent: $cardContainer
  });

  createCardElement({
    type: 'h2',
    content: `${name}`,
    class: 'card__name',
    parent: card
  });

  createCardImage(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    card
  );

  createCardElement({
    type: 'p',
    content: `#${id}`,
    class: 'card__id',
    parent: card
  });

  createCardElement({
    type: 'p',
    content: `${type}`,
    class: 'card__type',
    parent: card
  });
}

function createCardElement(elementCards) {
  const element = document.createElement(elementCards.type);

  element.textContent = elementCards.content;

  if (elementCards.class) {
    element.setAttribute('class', elementCards.class);
  }
  if (elementCards.parent) {
    elementCards.parent.appendChild(element);
  }
  return element;
}

function createCardImage(src, parent) {
  const image = document.createElement('img');

  image.setAttribute('src', src);
  parent.appendChild(image);
}

fetchPokemon();
