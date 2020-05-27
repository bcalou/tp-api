# TP API Téo Lugat

## But de l'application en une phrase

Obtenez les dernières statistiques et articles en date sur la crise sanitaire du Covid-19 concernant le pays de votre choix.

## URL de l'API utilisée

- https://covid19-api.com/
- https://api.smartable.ai/coronavirus

## Liste des routes sollicitées

- https://covid-19-data.p.rapidapi.com/country?name=FR (nom du pays)
- https://api.smartable.ai/coronavirus/news/global
- https://api.smartable.ai/coronavirus/news/US (code ISO du pays)

## Fonctionnement détaillé de l'application

Récupération des dernières statistiques concernant le covid-19 à l'échelle internationnale sous la forme :

- date et heure de la dernière actualisation des données
- Nombre de cas confirmés
- Nombre de patients atteints du virus et qui ont guéri
- Nombre de patients dans un état critique
- Nombre de morts

Récupération de 3 articles récents concernant le covid-19 à l'échelle internationnale, actualisés à chaque rechargement de la page.

L'application permet la recherche d'un pays grâce à un formulaire et de récupérer les dernières statistiques et plusieurs dizaines d'articles récents concernant le covid-19 et le pays en question.
