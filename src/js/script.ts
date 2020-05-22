// AXIOS

import axios from "axios";

// CONFIG API

const URL_CORS: string = "https://cors-anywhere.herokuapp.com/";
const URL_API: string = "https://superheroapi.com/api/";
const ACCESS_TOKEN: string = "10218347135043962";

// ÉLÉMENTS

const $searchInput = document.getElementById("searchInput");
const $searchButton = document.getElementById("searchButton");
const $addButton = document.getElementById("addButton");

// ACTIONS

function getHeroName(): string {
  return document.querySelector('input[name="nameHero"]').value;
}

function searchHeroByName(): void {
  axios
    .get(`${URL_CORS}${URL_API}${ACCESS_TOKEN}/search/${getHeroName()}`)
    .then(function (response: any): any {
      console.log(response);
    })
    .catch(function (error: any): any {
      console.log(error);
    });
}

// ÉVÈNNEMENTS

$searchButton.addEventListener("click", () => {
  searchHeroByName();
});
