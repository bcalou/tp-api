var pokemonList = document.createDocumentFragment();
const numberOfPokemon = 807;
const colors={
    bug : "#285436",
     dark : "#000100",
     dragon : "#46919f",
     electric : "#e7e805",
     fairy : "#a41c4c",
     fighting :"#a64219",
     fire : "#ba2724",
     flying : "#507089",
     ghost : "#383774",
     grass : "#008842",
    ground : "#b6791f",
     ice : "#8cd5f5",
     normal : "#815c66",
     poison : "#6e2a9f",
    psychic : "#b22f7b",
     rock : "#561c05",
     steel : "#677e76",
    water : "#0452e3",
};

const main_types = Object.keys(colors);

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



    const pokemonType = document.createElement('div');
    const pokemonCard = document.getElementById(`${data.id}`)
    pokemonType.classList.add('pokemon__types');
    const typesArray = data.types.map(type => type.type.name)
    typesArray.forEach(typeName => {
        const pokemonTypeName =document.createElement('p');
        pokemonTypeName.classList.add('type',`${typeName}`)
        pokemonTypeName.textContent = `${typeName}`;
        pokemonType.appendChild(pokemonTypeName)
    });
    
    const type = main_types.find(type => typesArray[0].indexOf(type) > -1);
    const firstTypeColor = colors[type];
    if(typesArray.length===1){
        pokemonCard.style.borderColor = firstTypeColor
    }
    else{
        const type = main_types.find(type => typesArray[1].indexOf(type) > -1);
        const SecTypeColor = colors[type];
        pokemonCard.style.borderImageSource = `linear-gradient(90deg, ${firstTypeColor},${SecTypeColor}`;
    }
    
    
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
