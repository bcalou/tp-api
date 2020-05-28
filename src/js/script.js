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
    pokemonCard.classList.add('card')
    pokemonCard.id = i;
    pokemonList.appendChild(pokemonCard);
}

document.querySelector('.cards').appendChild(pokemonList);

for (let i = 1; i <= numberOfPokemon; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    fetch(url)
    .then(result => result.json())
    .then(data => getPokemonInfos(data));
}

function getPokemonInfos(data) {
    const pokemonInfosFragment = document.createDocumentFragment();
    createName(data, pokemonInfosFragment);
    createCardImage(
        'card__img',
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
        pokemonInfosFragment
    );
    createTypes(data, pokemonInfosFragment);
    createDetails(data, pokemonInfosFragment);
    document.getElementById(data.id).appendChild(pokemonInfosFragment); 
}



//function that allows you to create name in the card 

function createName(data, pokemonInfosFragment) {
    createCardElement({
        type: 'p',
        content: `${data.name}`,
        class: 'card__name',
        parent: pokemonInfosFragment
    })
}

//Function which allows to create the types of each pokémon with their color backgrounds and a border radient according to the type
function createTypes(data, pokemonInfosFragment){
    const pokemonType = document.createElement('div');
    const pokemonCard = document.getElementById(`${data.id}`)
    pokemonType.classList.add('card__types');
    const typesArray = data.types.map(type => type.type.name)
    typesArray.forEach(typeName => {
        const pokemonTypeName =document.createElement('p');
        pokemonTypeName.classList.add('card__type',`${typeName}`)
        pokemonTypeName.textContent = `${typeName}`;
        pokemonType.appendChild(pokemonTypeName)
    });
    pokemonInfosFragment.appendChild(pokemonType);
    createBorderRadientType(typesArray, pokemonCard)

}

// function that allows you to create a border gradient according to the type of pokémon
function createBorderRadientType(typesArray, pokemonCard) {
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
}

// function that allows you to create details on the map such as height and weight

function createDetails(data, pokemonInfosFragment) {
    const pokemonDetails = document.createElement('div');
    createCardElement({
        type: 'p',
        content: `Height: ${data.height} ft`,
        class: 'card__height',
        parent: pokemonDetails
    })
    createCardElement({
        type: 'p',
        content: `Weight: ${data.weight} lbs`,
        class: 'card__weight',
        parent: pokemonDetails
    })
    pokemonInfosFragment.appendChild(pokemonDetails);  
}



//function that allows you to quickly create elements

//create tag like div or p or other
function createCardElement(elementCards) {
    const element = document.createElement(elementCards.type);
  
    element.textContent = elementCards.content;
  
    if (elementCards.class) {
      element.setAttribute('class', elementCards.class);
    }
    if (elementCards.parent) {
      elementCards.parent.appendChild(element);
    }
    return element;
}

//create img
function createCardImage(className, src, parent) {
    const image = document.createElement('img');
    image.setAttribute('class', className);
    image.setAttribute('src', src);
    parent.appendChild(image);
}