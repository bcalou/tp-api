const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/`;

const pokemonMax = 31;
const movesMax = 400;

// FETCH ALL POKEMONS WITH API
const fetchPokemon = () => {
  for (let i = 1; i <= pokemonMax; i++) {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${i}`;

    fetch(API_URL)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        id = data.id;
        name = data.name;
        moves = data.moves.map(move => move.move.name)[0];
        player1(data.id);
        player2(data.id);
        generateAttack(data.moves.map(move => move.move.name)[0]);
      });
  }
};

// FETCH ALL DETAILS ATTACKS WITH API
const fetchSpecs = () => {
  for (let i = 1; i <= movesMax; i++) {
    const URL_SPECS = `https://pokeapi.co/api/v2/move/${moves}`;
    fetch(URL_SPECS)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        power = data.power;
      });
  }
};

// GENERATE RANDOM ATTACK
function generateAttack(moves) {
  let attackRandom = Math.floor(Math.random(`moves`) * movesMax) + 1;

  if (attackRandom > movesMax) {
    return attackRandom;
  }

  const URL_ATTACK = `https://pokeapi.co/api/v2/move/${attackRandom}`;

  fetch(URL_ATTACK)
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      power = data.power;
    });
}

// CREATE PLAYER1
function player1() {
  let numberRandom = Math.floor(Math.random(`id`) * pokemonMax) + 1;
  const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${numberRandom}`;

  fetch(URL_POKEMON)
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      id = data.id;
      name = data.name;
      moves = data.moves.map(move => move.move.name)[0];
    });

  const player1 = document.querySelector('.battle__player1');
  player1.innerHTML = '';

  createCardElement({
    type: 'h2',
    content: `#${id}`,
    parent: player1
  });

  createCardElement({
    type: 'p',
    content: `${name}`,
    parent: player1
  });

  createCardElement({
    type: 'p',
    content: `Attack : ${moves}`,
    parent: player1
  });

  // createCardElement({
  //   type: 'p',
  //   content: `Power : ${power}`,
  //   parent: player1
  // });

  createCardImage(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    player1
  );
}

// GENERATE PLAYER2
function player2() {
  let numberRandom = Math.floor(Math.random(`id`) * pokemonMax) + 1;
  const player2 = document.querySelector('.battle__player2');
  player2.innerHTML = `<h2>#${numberRandom}</h2>
   <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberRandom}.png">`;
}

// GENERATE OTHER POKEMONS
function generatePokemons() {
  document.querySelector('.generate').addEventListener('click', () => {
    fetchPokemon();
  });
}

// CREATE FUNCTION FOR ELEMENTS
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

// FUNCTIONS
fetchPokemon();
generatePokemons();
