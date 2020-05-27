//create const to stock URL from API
const Api_Url = "https://pokeapi.co/api/v2/pokemon";
const $container = document.querySelector('.container');
const search = document.querySelector(".searchBar__click");
const $input = document.querySelector('.searchBar__input[name=pokemon]');

let DATA = [];

// retrieve data from API
Promise.all(
  Array.from(
    { length: 50 },
    (_, index) => fetch(`${Api_Url}/${index + 1}`)
    .then(value => value.json())
    )
    )
    .then(values => {
      DATA = values;
      showPokemon(DATA);
      console.log(DATA);
    })
    .catch((error) => {
      console.log(error);
    });

let $buttons = [];
let events = [];

function removeButtonsListeners() {
  // Avoid memory leak
  $buttons.forEach((button, index) => {
    button.removeEventListener("click", events[index]);
  });
  $buttons = [];
  events= [];
}

//this function do a request to show all the pokemon dynamically in HTML
function showPokemon(pokemon) {

  // append card to html
  $container.innerHTML = pokemon.map(element => {
    events.push(() => showInfo(element));
    return `
      <div class="container__cardsPokemon">
        <p class="container__namePokemon">${element.name}</p>
        <img class="container__imgPokemon" src="https://pokeres.bastionbot.org/images/pokemon/${element.id}.png"/>
        <button class="container__button">see more</button>
      </div>`;
  }).join('');

  // register event listeners
  $buttons = Array.from(document.querySelectorAll(".container__button"));
  $buttons.forEach((button, index) => {
    button.addEventListener("click", events[index]);
  });
}

function showInfo(pokemon) {
  removeButtonsListeners();

  $container.innerHTML = 
  `
    <section class="container__infos">
    <a href=""><button>retour au menu</button></a>
    <div class="container__cardsPokemon">
      <h2 class="container__namePokemon">${pokemon.name}</h2>
      <img class="container__imgPokemon" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
      <div class="container__descriptions">
        <p class="container__caract">${pokemon.weight} weight</p>
        <p class="container__caract">${pokemon.height} height</p>
      </div>
    </div>
    </section>`;
}

search.addEventListener("click", event => {
  event.preventDefault();
  const searchPokemon = DATA.filter(el => el.name.includes($input.value));
  removeButtonsListeners();
  showPokemon(searchPokemon);
});