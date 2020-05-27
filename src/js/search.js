const $searchBar = document.querySelector('.input__name');
const $pokemonCards =document.querySelectorAll('.pokemon__card');
const selectTypes = document.querySelector(".select__types")
const numberOfPokemon = 807;



$searchBar.addEventListener('input', () => {
  $pokemonCards.forEach(pokemonCard =>{
    var pokemonName = pokemonCard.querySelector(".pokemon__name").textContent;
    if (selectTypes.value == 0) {
      if(pokemonName.startsWith($searchBar.value.toLowerCase())){
        pokemonCard.classList.remove("hidden");
      }
      else{
        pokemonCard.classList.add('hidden');
      };
    }
    if (selectTypes.value !== 0) {
      const pokemonTypes = pokemonCard.querySelectorAll(".type");
      if(pokemonTypes.length === 1){
        if(pokemonTypes[0].textContent == selectTypes.value && pokemonName.startsWith($searchBar.value.toLowerCase())){
        pokemonCard.classList.remove("hidden");
        }
        else if (selectTypes.value ==0 && pokemonName.startsWith($searchBar.value.toLowerCase())) {
          pokemonCard.classList.remove("hidden");
        }
        else{
          pokemonCard.classList.add('hidden');
        }
      }
      if(pokemonTypes.length === 2){
        if(pokemonTypes[0].textContent == selectTypes.value  && pokemonName.startsWith($searchBar.value.toLowerCase()) || pokemonTypes[1].textContent == selectTypes.value  && pokemonName.startsWith($searchBar.value.toLowerCase())){
          pokemonCard.classList.remove("hidden");
        }
          else if (selectTypes.value ==0 && pokemonName.startsWith($searchBar.value.toLowerCase())) {
            pokemonCard.classList.remove("hidden");
          }
          else{
            pokemonCard.classList.add('hidden');
          }
      }
      
    }
  })
  noResultDisplay();  
})





selectTypes.addEventListener('change',()  =>{
  $pokemonCards.forEach(pokemonCard =>{
    const pokemonTypes = pokemonCard.querySelectorAll(".type");
    if($searchBar.value == ''){
      if(pokemonTypes.length === 1){
        if(pokemonTypes[0].textContent == selectTypes.value){
        pokemonCard.classList.remove("hidden");
        }
        else if (selectTypes.value ==0 ) {
          pokemonCard.classList.remove("hidden");
        }
        else{
          pokemonCard.classList.add('hidden');
        }
      }
      if(pokemonTypes.length === 2){
        if(pokemonTypes[0].textContent == selectTypes.value || pokemonTypes[1].textContent == selectTypes.value){
          pokemonCard.classList.remove("hidden");
          }
          else if (selectTypes.value ==0 ) {
            pokemonCard.classList.remove("hidden");
          }
          else{
            pokemonCard.classList.add('hidden');
          }
      }
    }
    if($searchBar.value !== ''){
      var pokemonName = pokemonCard.querySelector(".pokemon__name").textContent;
      if(pokemonTypes.length === 1){
        if(pokemonTypes[0].textContent == selectTypes.value && pokemonName.startsWith($searchBar.value.toLowerCase())){
        pokemonCard.classList.remove("hidden");
        }
        else if (selectTypes.value ==0 && pokemonName.startsWith($searchBar.value.toLowerCase())) {
          pokemonCard.classList.remove("hidden");
        }
        else{
          pokemonCard.classList.add('hidden');
        }
      }
      if(pokemonTypes.length === 2){
        if(pokemonTypes[0].textContent == selectTypes.value  && pokemonName.startsWith($searchBar.value.toLowerCase()) || pokemonTypes[1].textContent == selectTypes.value  && pokemonName.startsWith($searchBar.value.toLowerCase())){
          pokemonCard.classList.remove("hidden");
          }
          else if (selectTypes.value ==0 && pokemonName.startsWith($searchBar.value.toLowerCase())) {
            pokemonCard.classList.remove("hidden");
          }
          else{
            pokemonCard.classList.add('hidden');
          }
      }
    }
  }) 
  noResultDisplay();
})

  

function noResultDisplay() {
  const $noResult = document.querySelector('.noResult');
  if(document.querySelectorAll(".pokemon__card.hidden").length ===numberOfPokemon){
    $noResult.classList.add('visible');
  }
  else {
    $noResult.classList.remove('visible');
  }; 
}
