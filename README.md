# TP API

## Installation

```
npm install
npm run dev
```

## But de l'application en une phrase

Le but de l'application est de faire une recherche sur les personnages cultes des comics, des films, ou des mangas,  pour en savoir plus sur eux. 

lien: https://hero-api.netlify.app

## URL de l'API utilisée

Deux api ont été utilisés

Sites pour le descriptifs des API
- https://superheroapi.com  //API principal pour récupérer la liste des personnages
- https://rapidapi.com/systran/api/systran-io-translation-and-nlp  //API Pour traduire les quelques résultats 
en français

Les URL des API
- https://www.superheroapi.com/api.php  //API principal pour récupérer la liste des personnages
- https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate  //API Pour traduire les quelques résultats 
en français

## Liste des routes sollicitées

- API superhero
<br>GET /{key}/search/{keywords}     //Recherche le nom en mettant un ou plusieurs mots clés
<br>GET /{key}/{id}                  //Pour récupérer les données d'une seul personnage

- API systran
<br>GET ?source=${lang input}&target=${lang output}&input=${text} //Traduit un text par exemple en input:"en" et en output: "fr" 
  <br>  HEADERS : {
        "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
        "x-rapidapi-key": {Your API key}
      }

## Fonctionnement détaillé de l'application

L'application se résume en 4 étapes:

étape 1: la page principale avec une barre de recherche. La recheche se fait sur le nom et se déclenche automatique dès que vous commencez à saisir

etape 2 : Le résultat de la recherche s'affiche en forme de cadre avec une image, le nom du personne, et son statut

etape 3 : Vous pouvez cliquer sur un cadre du résultat de la recherche pour voir plus de détail de votre personnage. Au clic une page intégrée s'affiche au dessus du resultat avec toutes informations sur le personnage selectionné.

etape 4:  Cliquez sur la croix pour fermer le détail sur ton personne pour revenir au resultat de la recherche
