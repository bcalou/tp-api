# TP API

## Installation

```
npm install
npm run dev
localhost:1234/index.html
```

## But de l'application en une phrase

Trouver des jeux

## URL de l'API utilisée

Doc: https://rawg.io/apidocs/ & https://api.rawg.io/docs
baseURL: https://api.rawg.io/api/

## Liste des routes sollicitées

- https://api.rawg.io/api/games?{parameters}
- https://api.rawg.io/api/games/{id}

## Fonctionnement détaillé de l'application

L'application permet de trouver des jeux,
On peut les trier par date de sortie, popularité et notes, et par plateformes.
Au clique sur un jeu on est redirigé vers une page avec une image du jeu, son titre, les plateformes sur lesquels il est disponible et une description du jeu.
