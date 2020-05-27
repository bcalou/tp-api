const $searchBar = document.querySelector('.searching__input');
const $pokemonCards =document.querySelectorAll('.pokemon__card');
const $selectTypes = document.querySelector(".searching__select")
const numberOfPokemon = 807;

$searchBar.addEventListener('input', () => {
  $pokemonCards.forEach(pokemonCard =>{
    var pokemonName = pokemonCard.querySelector(".pokemon__name").textContent;
    if ($selectTypes.value == 0) {
      filterNameOnly(pokemonCard, pokemonName);
    }
    if ($selectTypes.value !== 0) {
      const pokemonTypes = pokemonCard.querySelectorAll(".type");
      filterNameAndTypes(pokemonCard, pokemonName, pokemonTypes);
    }
  })
  noResultDisplay();  
})

$selectTypes.addEventListener('change',()  =>{
  $pokemonCards.forEach(pokemonCard =>{
    const pokemonTypes = pokemonCard.querySelectorAll(".type");
    if($searchBar.value == ''){
      filterTypeOnly(pokemonCard, pokemonTypes);
    }
    if($searchBar.value !== ''){
      var pokemonName = pokemonCard.querySelector(".pokemon__name").textContent;
      filterNameAndTypes(pokemonCard, pokemonName, pokemonTypes);
    }
  }) 
  noResultDisplay();
})




function filterNameOnly(pokemonCard, pokemonName) {
  if(pokemonName.startsWith($searchBar.value.toLowerCase())){
    pokemonCard.classList.remove("hidden");
  }
  else{
    pokemonCard.classList.add('hidden');
  };
}

function filterTypeOnly(pokemonCard, pokemonTypes) {
  if(pokemonTypes.length === 1){
    if(pokemonTypes[0].textContent == $selectTypes.value){
    pokemonCard.classList.remove("hidden");
    }
    else if ($selectTypes.value ==0 ) {
      pokemonCard.classList.remove("hidden");
    }
    else{
      pokemonCard.classList.add('hidden');
    }
  }
  if(pokemonTypes.length === 2){
    if(pokemonTypes[0].textContent == $selectTypes.value || pokemonTypes[1].textContent == $selectTypes.value){
      pokemonCard.classList.remove("hidden");
      }
      else if ($selectTypes.value ==0 ) {
        pokemonCard.classList.remove("hidden");
      }
      else{
        pokemonCard.classList.add('hidden');
      }
  }
}

function filterNameAndTypes(pokemonCard, pokemonName, pokemonTypes) {
  if(pokemonTypes.length === 1){
    if(pokemonTypes[0].textContent == $selectTypes.value && pokemonName.startsWith($searchBar.value.toLowerCase())){
    pokemonCard.classList.remove("hidden");
    }
    else if ($selectTypes.value ==0 && pokemonName.startsWith($searchBar.value.toLowerCase())) {
      pokemonCard.classList.remove("hidden");
    }
    else{
      pokemonCard.classList.add('hidden');
    }
  }
  if(pokemonTypes.length === 2){
    if(pokemonTypes[0].textContent == $selectTypes.value  && pokemonName.startsWith($searchBar.value.toLowerCase()) || pokemonTypes[1].textContent == $selectTypes.value  && pokemonName.startsWith($searchBar.value.toLowerCase())){
      pokemonCard.classList.remove("hidden");
    }
      else if ($selectTypes.value ==0 && pokemonName.startsWith($searchBar.value.toLowerCase())) {
        pokemonCard.classList.remove("hidden");
      }
      else{
        pokemonCard.classList.add('hidden');
      }
  }
}

function noResultDisplay() {
  const $result = document.querySelector('.result');
  const $cardHidden = document.querySelectorAll(".pokemon__card.hidden");
  const $cardVisible = numberOfPokemon-$cardHidden.length;
  $result.classList.add('visible');
  if($cardHidden.length === numberOfPokemon){
    $result.textContent = 'No pokemon match your criteria ';
  }
  else {
    if ($cardVisible === 1) {
      $result.textContent = `${$cardVisible} pokemon match your criteria `;
    }
    else{
      $result.textContent = `${$cardVisible} pokemons match your criteria `;
    }
  }; 
}
