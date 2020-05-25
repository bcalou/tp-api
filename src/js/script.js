var pokemonList = document.createDocumentFragment();
const numberOfPokemon = 807;

for (let i = 1; i <= numberOfPokemon; i++) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon__card')
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
    pokemonName.classList.add('pokemon__name')
    pokemonName.textContent = `${data.name}`;
    pokemonInfosFragment.appendChild(pokemonName);

    const pokemonArtwork = document.createElement('img');
    pokemonArtwork.src = ` https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
    pokemonInfosFragment.appendChild(pokemonArtwork);

    const pokemonType = document.createElement('p');
    pokemonType.textContent = data.types.map(type => type.type.name).join(' ');
    pokemonInfosFragment.appendChild(pokemonType);

    const pokemonDetails = document.createElement('div');
    const pokemonHeight = document.createElement('p');
    const pokemonWeight = document.createElement('p');
    pokemonHeight.textContent = `Height: ${data.height} ft`;
    pokemonWeight.textContent = `Weight: ${data.weight} lbs`;
    pokemonDetails.appendChild(pokemonHeight);
    pokemonDetails.appendChild(pokemonWeight);
    pokemonInfosFragment.appendChild(pokemonDetails);


    document.getElementById(data.id).appendChild(pokemonInfosFragment); 
}
