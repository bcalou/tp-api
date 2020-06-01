# TP API

## Installation

```
npm install
npm run dev
```

## But de l'application en une phrase

Trouver la recette souhaiter du jour 

## URL de l'API utilisée

https://api.spoonacular.com

## Liste des routes sollicitées

- https://api.spoonacular.com/recipes/search?query=banana&number=6&apiKey=XXXX
- https://api.spoonacular.com/recipes/474033/analyzedInstructions?apiKey=XXXX
- https://api.spoonacular.com/recipes/474033/ingredientWidget.json?apiKey=XXXX

## Fonctionnement détaillé de l'application

- Sur la bar recherche (search) => Chercher les recettes souhaiter avec le nom des recette ou les ingredients. example: pasta, banana, etc.
- Trouver les recettes proposées depuis la bar recherche.
- Trouver les details des recettes (nom, image, les ingredients, les temps de cuisson et les étapes de cuisson.
