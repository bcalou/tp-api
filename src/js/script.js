console.log('Hello world');

const Api_Url = "https://pokeapi.co/api/v2/pokemon"
const $container = document.getElementById('container')


function getPokemons(){
  try {
    return fetch(`${Api_Url}/?limit=50`)
    .then(Response => Response.json())
    .then(data => showPokemon(data.results))
  }
    catch (error) {
    console.error(error)
  }
}
getPokemons()

function showPokemon(pokemon) {
  // console.log(pokemon)
    $container.innerHTML = 
    pokemon.map((element) => {
      console.log(element)
      return`
        <div class="container__cardsPokemon">
          <p class="container__namePokemon">${element.name}</p>
          <img class="container__imgPokemon" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.indexOf(element)+1}.png"/>
          <button class="container__button" onclick="getThePokemon('${element.url}')">see more</button>
        </div>
      `
    }).join('');
}

window.getThePokemon = function(URL){
  try {
    return fetch(URL)
    .then(res => res.json())
    .then(data => console.log(data))
  } catch (error) {
    console.log(error)
  }
}
