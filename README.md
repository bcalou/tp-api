# TP API

## Installation

```
npm install
npm run dev
```

## But de l'application en une phrase

En manque d'idées pour votre repas? 'Keskon Mange' vous propose des milliers d'idées de recettes

## URL de l'API utilisée

https://spoonacular.com/food-api/

## Liste des routes sollicitées

- Après avoir renseigné un des champs du formulaire, un requette est envoyée à l'api via la route search, qui peut contenir différents critères et renvoi un tableau de recettes.
- lors de l'ajout d'une recette aux favoris, une nouvelle requette est envoyée en précisant l'id de la recette et permettant d'avoir toutes les infos de cette recette

## Fonctionnement détaillé de l'application

- Ceci est une application monopage codée sans frameworks.
- L'utilisateur peut chercher une recette parmis des milliers, selon différents critères.
- Puis il peut consulter une recette en détail ou l'ajouter à sa liste de favoris. Celle ci est mise en memoire grâce au localstorage.

https://keskon-mange.netlify.app
