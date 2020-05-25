console.log('Hello world');

const API_GEN3 = `https://pokeapi.co/api/v2/generation/3/`;

const fetchPokemon = () => {
  for (let i = 1; i <= 15; i++) {
    const API_URL = `https://pokeapi.co/api/v2/pokemon/${i}`;

    fetch(API_URL)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        getIdPokemon(
          data.name,
          data.id,
          data.types.map(type => type.type.name),
          i
        );
        // getColors(data.types.map(type => type.type.name));
        // console.log(data);
      });
  }
};

function getIdPokemon(name, id, type, i) {
  document.querySelector('.content').innerHTML += ` 
   <div class="container">
  <h2 class="container__name">${name}</h2>
  <img src="https://pokeres.bastionbot.org/images/pokemon/${i}.png">
  
  <p class="container__id">${id}</p>
  <p class="container__id">${type}</p>
  
</div>`;
}

// function getColors(type) {
//   const colors = {
//     fire: '#f56',
//     poison: '#ff6'
//   };
//   const container = document.querySelector('.container__id');
//   const color = colors[`${type}`];
//   container.style.color = color;
// }

fetchPokemon();
// getColors();
