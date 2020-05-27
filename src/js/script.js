console.log('Hello world');
//create const to stock URL from API
const Api_Url = "https://pokeapi.co/api/v2/pokemon"
const $container = document.querySelector('.container')
const $infoContainer = document.querySelector('.container__info')
const $infoContent = document.querySelector('.container__infos')
const $infoTitle = document.querySelector('.container__infoTitle')
const search = document.querySelector(".searchBar__click")
const $input = document.querySelector('.searchBar__input[name=pokemon]')


//this function do a request to get object from API
getPokemons()
function getPokemons(){
  try {
    return fetch(`${Api_Url}/?limit=id`)
    .then(Response => Response.json())
    .then(data => {
      showPokemon(data.results)
      showData(data.results)
    })
  }
    catch (error) {
    console.error(error)
  }
}
let DATA = []
function showData(data) {
  DATA.push(...data)
  // console.log(DATA)
}

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


window.getThePokemon = function(URL){
  try {
    return fetch(URL)
    .then(res => res.json())
    .then(data => showInfo(data))
  } catch (error) {
    console.log(error)
  }
}

function showInfo(infos){
  $container.innerHTML = 
    `
    <section class="container__infos">
    <a href=""><button>retour au menu</button></a>
    <div class="container__cardsPokemon">
      <h2 class="container__namePokemon">${infos.name}</h2>
      <img class="container__imgPokemon" src="https://pokeres.bastionbot.org/images/pokemon/${infos.id}.png"/>
      <div class="container__descriptions">
        <p class="container__caract">${infos.weight} weight</p>
        <p class="container__caract">${infos.height} height</p>
      </div>
    </div>
    </section>
    `
  console.log(infos)
}

// const $addPokemon = document.querySelector('.searchBar__click')

search.addEventListener("click", function(event) {
  event.preventDefault();
  str = $input.value;
    const searchPokemon = DATA.filter(el => {
      return el.name.includes(str)
    })
    showPokemon(searchPokemon)
});