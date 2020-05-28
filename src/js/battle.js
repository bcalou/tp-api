const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/`;

const pokemonMax = 200;
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
      });
  }
};

// GENERATE RANDOM ATTACK
function generateAttack(player) {
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
      attackName = data.name;
      player1(data.power, data.name);
    });
}
generateAttack(player1);
generateAttack(player2);

// CREATE PLAYER1
function player1() {
  let numberRandom = Math.floor(Math.random(`id`) * pokemonMax) + 1;

  const player1 = document.querySelector('.battle__player1');
  player1.innerHTML = '';

  createCardElement({
    type: 'p',
    class: 'battle__pokemon',
    content: `#${numberRandom}`,
    parent: player1
  });

  // createCardElement({
  //   type: 'p',
  //   class: 'battle__attacks',
  //   content: `Attack : ${attackName}`,
  //   parent: player1
  // });

  createCardElement({
    type: 'p',
    class: 'battle__attacks',
    content: `Attack : ${moves}`,
    parent: player1
  });

  createCardElement({
    type: 'p',
    class: 'battle__powers',
    content: `Power: ${power}`,
    parent: player1
  });

  createCardImage(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberRandom}.png`,
    player1
  );
}

// GENERATE PLAYER2
function player2() {
  let numberRandom = Math.floor(Math.random(`id`) * pokemonMax) + 1;

  const player2 = document.querySelector('.battle__player2');
  player2.innerHTML = `<h2 class="battle__pokemon">#${numberRandom}</h2> <h3 class="battle__attacks">ATTACk : ${attackName}</h3> <h3 class="battle__powers"> Power:${power}</h3>
   <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numberRandom}.png">`;
}

// GENERATE OTHER POKEMONS
function generatePokemons() {
  document.querySelector('.generate').addEventListener('click', () => {
    fetchPokemon();
    generateAttack(player2);
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
