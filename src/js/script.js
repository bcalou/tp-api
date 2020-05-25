var pokemonList = document.createDocumentFragment();
const numberOfPokemon = 807;

for (let i = 1; i <= numberOfPokemon; i++) {
    const pokemonCard = document.createElement('div');
    pokemonCard.id = i;
    pokemonList.appendChild(pokemonCard);
}

document.querySelector('main').appendChild(pokemonList);

for (let i = 1; i <= numberOfPokemon; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    fetch(url)
    .then(result => result.json())
    .then(data => getPokemonInfos(data));
}

function getPokemonInfos(data) {
    const pokemonInfosFragment = document.createDocumentFragment();

    const pokemonName = document.createElement('p');
    pokemonName.textContent = `${data.id}. ${data.name}`;
    pokemonInfosFragment.appendChild(pokemonName);

    const pokemonArtwork = document.createElement('img');
    pokemonArtwork.src = ` https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
    pokemonInfosFragment.appendChild(pokemonArtwork);

    const pokemonHeight = document.createElement('p');
    pokemonHeight.textContent = `Height: ${data.height} ft`;
    pokemonInfosFragment.appendChild(pokemonHeight);

    const pokemonWeight = document.createElement('p');
    pokemonWeight.textContent = `Weight: ${data.weight} lbs`;
    pokemonInfosFragment.appendChild(pokemonWeight);

    document.getElementById(data.id).appendChild(pokemonInfosFragment);    
}