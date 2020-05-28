
    let list = document.getElementById("list-pokemon");
    function Pokemon(id, num) {
        fetch(`https://pokeapi.co/api/v2/pokemon/5${id}`)
        .then(function (response)  {
            response.json ()
            .then (function(pokemon) {
                newPokemon (pokemon, num)
             })
        })
    }
    
    function Pokemons() {
        var firstId = Math.round(Math.random() * 150)
        var secondId = Math.round(Math.random() * 150)
    
        Pokemon(firstId , 1)
        Pokemon(secondId , 2)
    }
    
    
    
    function newPokemon(pokemon, num) {
        let item = list.querySelector(`#pokemon-${num}`)
        let image = item.getElementsByTagName("img")[0]
        image.setAttribute("src", pokemon.sprites.front_default)
    
        let name = item.getElementsByTagName("p")[0]
        name.textContent = pokemon.name
    }
    Pokemons()

    
