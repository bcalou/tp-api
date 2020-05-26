const $searchBar = document.querySelector('.search__name');

if ($searchBar !== null) {
  $searchBar.addEventListener('input', () => {
    const $pokemonCard = document.querySelectorAll('.container');

    $pokemonCard.forEach(pokemonCard => {
      const pokemonName = pokemonCard.querySelector('.container__name')
        .textContent;
      if (!pokemonName.startsWith($searchBar.value.toLowerCase())) {
        pokemonCard.classList.add('hidden');
      } else {
        pokemonCard.classList.remove('hidden');
      }
    });
  });
}
