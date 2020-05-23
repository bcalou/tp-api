const APIurl = 'https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json';
const pokemons = [];

fetch(APIurl)
    .then(blob => blob.json())
    .then(data => pokemons.push(...data.pokemon));

    function foundPokemon(search, pokemons) {
        return pokemons.filter(pokemon => {
            const regex = new RegExp(search, 'gi');
            return pokemon.name.match(regex) || pokemon.type.find(type => type.match(regex));
        });
    }

    function result() {
        const tabResult = foundPokemon(this.value, pokemons);
        const html = tabResult.map(pokemon => {
            return `
                <li>
                <img src="${pokemon.img}" alt"" width="50" height="50"/>
                <span>${pokemon.name}</span>
                <span>${pokemon.height}</span>
                <span>${pokemon.weight}</span>
                </li>
            `;
        }).join('');
        resultUl.innerHTML = html;
    }

    const input = document.querySelector('input');
    const resultUl = document.querySelector('ul');

    input.addEventListener('change', result);
    input.addEventListener('keyup', result);