const API_GEN3 = `https://pokeapi.co/api/v2/generation/3/`;
const pokemonMax = 800;

const fetchPokemon = () => {
  for (let i = 750; i <= pokemonMax; i++) {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${i}`;

    fetch(API_URL)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        getPokemon(
          data.name,
          data.id,
          data.types.map(type => type.type.name).join(' | '),
          i
        );
      });
  }
};

function getPokemon(name, id, type, i) {
  document.querySelector('.content').innerHTML += ` 
   <div class="container">
  <h2 class="container__name">${name}</h2>
  <img src="https://pokeres.bastionbot.org/images/pokemon/${i}.png">
  
  <p class="container__id">#${id}</p>
  <p class="container__type">${type}</p>
  
</div>`;
}

fetchPokemon();
