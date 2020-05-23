# TP API

## Installation

```
npm install parcel
npm run dev
```

## But de l'application en une phrase

Afficher les informations du film que vous recherchez (titre, date, résumé, popularité, images, acteurs)

## URL de l'API utilisée

https://developers.themoviedb.org/3

## Liste des routes sollicitées

- Rechercher un film : https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={title}&page=1&language=fr-FR

- Récupérer la clé de la bande-annonce du film : http://api.themoviedb.org/3/movie/{movieId}/videos?api_key={api_key}&language=fr-FR

- Récupérer la liste des personnages du film : https://api.themoviedb.org/3/movie/{movieId}/credits?api_key={api_key}&language=fr-FR

- Récupérer l'acteur correspondant au personnage du film : https://api.themoviedb.org/3/person/{characterId}?api_key={api_key}&language=fr-FR

## Fonctionnement détaillé de l'application

L'application va permettre à l'utilisateur de renseigner le nom d'un film dont il souhaite connaître les informations.

Lorsqu'il va cliquer sur Chercher, des appels successifs à l'API de themoviedb seront effectués pour récupérer toutes les informations importantes du site, à savoir :

- Titre
- Date de sortie
- Résumé
- Image de la jaquette
- Fond d'image
- Popularité du film
- Acteurs (personnage joué, vrai nom, biographie) => Pour afficher la biographie, sur desktop, passer la souris sur la case correspondant au personnage. Sur mobile, cliquez simplement dessus
- Bande annonce

Exemple de films : Avatar, Intouchables, Seul sur mars

Si le film n'est pas trouvé, un message d'erreur sera affiché
