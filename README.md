# TP API

## Installation

```
npm install
npm run dev
```

## But de l'application en une phrase

Vous permet d'avoir accés a un certain nombres de pokémon

## URL de l'API utilisée

URL: https://pokeapi.co/api/v2

## Liste des routes sollicitées

- Au moment du chargement de la page une requête est envoyée à l'API afin d'afficher un certain nombre de   pokemon

  // affiche rles donnée du pokémon
  const Api_Url = "https://pokeapi.co/api/v2/pokemon";
  fetch(`${Api_Url}/${index + 1}`)
  
  //afficher l'image du pokémon
  img class="container__imgPokemon" src="https://pokeres.bastionbot.org/images/pokemon/${element.id}.png"

- Lors du click sur le bouton "see more" on rappel l'API: fetch(${Api_Url}/${index + 1}) en plus d'avoir le nom et l'image on fait apparaitre son poid et ça taille
on filtre le contenus que nous a renvoyé la permière requête pour afficher seulement l'item sur lequel l'utilisateur a clické


- lors de la recherche dans la search bar 
  on va filtrer l'API selon le name du pokemon via la value contenu dans l'input:

    search.addEventListener("click", event => {
      event.preventDefault();
      const searchPokemon = DATA.filter(el => el.name.includes($input.value));
      removeButtonsListeners();
      showPokemon(searchPokemon);
  });

## Fonctionnement détaillé de l'application

Que peux faire votre prototype ?

Mon prototype permet de faire une recherche de pokémon via la search bar
mais aussi au click sur le bouton "see more" d'avoir accés à d'autre information en relation avec le pokemon voulu comme son poids et sa taille.


## -> fonction à venir:

- Rajouter les types des pokémon et les accorder avec leurs couleurs