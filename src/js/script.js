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
          data.types.map(type => type.type.name)[0],
          i
        );
      });
  }
};

function getPokemon(name, id, type, i) {
  document.querySelector('.cards').innerHTML += ` 
   <div class="card card--${type}">
  <h2 class="card__name">${name}</h2>
  <img src="https://pokeres.bastionbot.org/images/pokemon/${i}.png">
  
  <p class="card__id">#${id}</p>
  <p class="card__type">${type}</p>
  
</div>`;
}

fetchPokemon();
