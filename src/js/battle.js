const API_GEN3 = `https://pokeapi.co/api/v2/generation/3/`;
const pokemonMax = 300;

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
        player1(data.id);
        player2(data.id);
      });
  }
};

function player1() {
  let numberRandom = Math.floor(Math.random(`id`) * pokemonMax) + 1;
  const player1 = document.querySelector('.battle__player1');
  player1.innerHTML = `<h2>#${numberRandom}</h2> 
  <img src="https://pokeres.bastionbot.org/images/pokemon/${numberRandom}.png">`;
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
generatePokemons();
