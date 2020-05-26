console.log('Hello world');
//create const to stock URL from API
const Api_Url = "https://pokeapi.co/api/v2/pokemon"
const $container = document.getElementById('container')
const pokemonForm = document.querySelector("form");
const $input = document.querySelector('.searchBar__input[name=pokemon]')

//this function do a request to get object from API
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


//this function do a request to show all the pokemon dynamically in HTML
function showPokemon(pokemon) {
    $container.innerHTML = 
    pokemon.map((element) => {
      // console.log(element)
      return`
        <div class="container__cardsPokemon">
          <p class="container__namePokemon">${element.name}</p>
          <img class="container__imgPokemon" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.indexOf(element)+1}.png"/>
          <button class="container__button" onclick="getThePokemon('${element.url}')">see more</button>
        </div>
      `
    }).join('');
  }
//this function get all the img associate to the index of all pokemon id
window.getThePokemon = function(URL){
  try {
    return fetch(URL)
    .then(res => res.json())
    .then(data => console.log(data))
  } catch (error) {
    console.log(error)
  }
}


// const $addPokemon = document.querySelector('.searchBar__click')


function searchPokemon(){
  str = $input.value;
  if (str.length > 0) {
    $input.value = "";
    console.log(str)
  }
}


pokemonForm.addEventListener("submit", function(event) {
  event.preventDefault();
  searchPokemon()
  showPokemon(event)
});

