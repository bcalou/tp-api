const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/`;

const pokemonMax = 31;
const movesMax = 741;

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
const fetchSpecs = () => {
  for (let i = 1; i <= movesMax; i++) {
    const URL_SPECS = `https://pokeapi.co/api/v2/move/${moves}`;

    fetch(URL_SPECS)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data.power);
      });
  }
};
fetchSpecs();
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

  const URL_ATTACK = `https://pokeapi.co/api/v2/move/${moves}`;

  fetch(URL_ATTACK)
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      power = data.power;
    });

  const player1 = document.querySelector('.battle__player1');
  player1.innerHTML = `<h2>#${id}</h2> <h3>${name}</h3> <h4>${moves}</h4>
  <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png">`;
}

function player2() {
  let numberRandom = Math.floor(Math.random(`id`) * pokemonMax) + 1;
  const player2 = document.querySelector('.battle__player2');
  player2.innerHTML = `<h2>#${numberRandom}</h2>
   <img src="https://pokeres.bastionbot.org/images/pokemon/${numberRandom}.png">`;
}

function generatePokemons() {
  document.querySelector('.generate').addEventListener('click', () => {
    fetchPokemon();
  });
}

fetchPokemon();
// fetchSpecs();
generatePokemons();

// ontest_combos": {
//   "normal": {
//       "use_before": [{
//           "name": "double-slap",
//           "url": "http://pokeapi.co/api/v2/move/3/"
//       }, {
//           "name": "headbutt",
//           "url": "http://pokeapi.co/api/v2/move/29/"
//       }, {
//           "name": "feint-attack",
//           "url": "http://pokeapi.co/api/v2/move/185/"
//       }],

// function getRandom(player) {
//   let numberRandom = Math.floor(Math.random(`id`) * pokemonMax) + 1;
//   const URL_POKEMON = `https://pokeapi.co/api/v2/pokemon/${numberRandom}`;

//   fetch(URL_POKEMON)
//     .then(resp => {
//       return resp.json();
//     })
//     .then(data => {
//       id = data.id;
//       name = data.name;
//     });
//   const players = document.querySelector(`.battle__${player}`);
//   players.innerHTML = `<h2>#${numberRandom}</h2>
//    <img src="https://pokeres.bastionbot.org/images/pokemon/${numberRandom}.png">`;
// }

// function firstPlayer() {
//   getRandom(player1);
// }

// function seccondPlayer() {
//   getRandom(player2);
// }
