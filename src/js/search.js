const $searchBar = document.querySelector('.input__name');
const numberOfPokemon = 807;
if ($searchBar !== null) {
  $searchBar.addEventListener('input', () => {
    document.querySelectorAll('.pokemon__card').forEach(pokemonCard =>{
      var pokemonName = pokemonCard.querySelector(".pokemon__name").textContent;
      if(!pokemonName.startsWith($searchBar.value.toLowerCase())){
        pokemonCard.classList.add("hidden");
      }
      else{
        pokemonCard.classList.remove('hidden');
      };
    })
    if(document.querySelectorAll(".pokemon__card.hidden").length ===numberOfPokemon){
      document.querySelector('.noResult').classList.add('visible');
    }
    else {
      document.querySelector('.noResult').classList.remove('visible');
  };  
  })
}
