// AXIOS

import axios from "axios";

// CONFIG API

const URL_CORS: string = "https://cors-anywhere.herokuapp.com/";
const URL_API: string = "https://superheroapi.com/api/";
const ACCESS_TOKEN: string = "10218347135043962";

// ÉLÉMENTS
// CTA
const $searchButton = document.getElementById("searchButton");
const $addButton = document.getElementById("addButton");
const $imgButton = document.querySelector(".card__imgButton");

//Img
const $imgContainer = document.querySelector(".card__img");
const $img = document.querySelector(".card__img img");

const $svgArrow = document.querySelector(".svg--arrow");

// Bloc Content
const $contentPresentation = document.querySelector(
  ".card__content--presentation"
);
const $contentIdentity = document.querySelector(".card__content--hero");

// Caracteristic
const $name = document.getElementById("name");
const $id = document.getElementById("id");
const $realName = document.getElementById("realName");
const $race = document.getElementById("race");
const $poids = document.getElementById("poids");
const $intelligence = document.getElementById("intelligence");
const $force = document.getElementById("force");
const $vitesse = document.getElementById("vitesse");
const $puissance = document.getElementById("vitesse");
const $combat = document.getElementById("vitesse");

// ACTIONS

function getHeroName(): string {
  return document.querySelector('input[name="nameHero"]').value;
}

function searchHeroByName(): void {
  axios
    .get(`${URL_CORS}${URL_API}${ACCESS_TOKEN}/search/${getHeroName()}`)
    .then(function (response) {
      console.log(response.data);
      getHeroInfo(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getHeroInfo(response): void {
  $img.setAttribute("src", response.data.results[0].image["url"]);
  $name.textContent = response.data.results[0].name;
  $id.textContent = `#${response.data.results[0].id}`;
  $realName.textContent = response.data.results[0].biography["full-name"];
  $race.textContent = response.data.results[0].appearance["race"];
  $poids.textContent = response.data.results[0].appearance["weight"][1];
  $intelligence.textContent =
    response.data.results[0].powerstats["intelligence"];
  $force.textContent = response.data.results[0].powerstats["strength"];
  $vitesse.textContent = response.data.results[0].powerstats["speed"];
  $puissance.textContent = response.data.results[0].powerstats["power"];
  $combat.textContent = response.data.results[0].powerstats["combat"];
}

// ÉVÈNNEMENTS

$searchButton.addEventListener("click", () => {
  $contentPresentation.style.display = "none";
  searchHeroByName();
  $contentIdentity.style.display = "flex";
});

$imgButton.addEventListener("click", () => {
  $imgContainer.classList.toggle("is-open");
  $svgArrow.classList.toggle("is-rotate");
});

$addButton.addEventListener("click", () => {
  console.log("ok");
});
