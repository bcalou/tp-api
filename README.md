# TP API
https://movinfo-api.netlify.app
## Installation

```
npm install
npm run dev
```

## But de l'application en une phrase

Obtenir divers informations sur un film recherché

## URL de l'API utilisée

http://www.omdbapi.com/

## Liste des routes sollicitées

- Lorsque l'utilisateur recherche un film via son nom, une requete get est envoye :
  get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieTitle}`)
  cette requete retourne un objet de 10 films avec quelques infos
- Lorsque l'utilisateur clic sur un des films une seconde requete get est envoye :
  get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`)
  cette fois ci avec l'id du film. La requete retourne un objet avec des informations detailles sur le film

## Fonctionnement détaillé de l'application

L'utilisateur indique le nom d'un film via un input.
L'application utilise une requete GET sur l'API pour obtenir des informations sur
le film.
