# TP API

## Installation

```
npm install
npm run dev
```

## But de l'application en une phrase

Elle renvoie des définitions des 3 premières lettres de l'alphabet

## URL de l'API utilisée

https://oc-jswebsrv.herokuapp.com/api/lexique/A
https://oc-jswebsrv.herokuapp.com/api/lexique/B
https://oc-jswebsrv.herokuapp.com/api/lexique/C

## Liste des routes sollicitées

- Cliqué sur une lettre qui contient des définitions
- Cliqué sur une lettre qui ne contient pas de définition

## Fonctionnement détaillé de l'application

Si tu clique sur une lettre qui contient des définitions, l'application récupère les définitions qui sont donnés dans l'API par rapport à cette lettre et les renvoies sur la page.
Si tu clique sur une lettre qui ne contient pas de définition, l'application cherche si des définitions sont disponibles dans l'API et vu que non elle renvoie la lettre avec la phrase "Aucune définition n'a été trouvé"
