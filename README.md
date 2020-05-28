# TP API Téo Lugat

## But de l'application en une phrase

Obtenez les derniers chiffres clés et articles en date sur la crise sanitaire du Covid-19 concernant le pays de votre choix.

## URL de l'API utilisée

- https://covid19-api.com/
- https://api.smartable.ai/coronavirus

## Liste des routes sollicitées

- https://covid-19-data.p.rapidapi.com/country?name=${countryName}
- https://covid-19-data.p.rapidapi.com/report/totalsdate-format=YYYY-MM-DD&date=${date}
- https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&date=${date}&name=${country}
- https://api.smartable.ai/coronavirus/news/global
- https://api.smartable.ai/coronavirus/news/${countryCode}

## Fonctionnement détaillé de l'application

Récupération des dernières chiffres clés concernant le covid-19 à l'échelle internationnale sous la forme :

- date et heure de la dernière actualisation des données
- Nombre de cas confirmés
- Nombre de patients atteints du virus et qui ont guéri
- Nombre de patients dans un état critique
- Nombre de morts

Récupération et affichage de 3 articles récents concernant le covid-19 à l'échelle internationnale, actualisés à chaque rechargement de la page.

Récupération et affichage des chiffres clés selon une date choisie grâce à un formulaire.
Récupération et affichage des chiffres clés selon une date et un pays choisis grâce à un formulaire.

Recherche d'un pays grâce à un formulaire, récupération et affichage des dernières statistiques et de plusieurs dizaines d'articles récents concernant le covid-19 et le pays en question.
