// AXIOS

import axios from "axios";

// CONFIG API

const URL_CORS: string = "https://cors-anywhere.herokuapp.com/";
const URL_API: string = "https://superheroapi.com/api/";
const ACCESS_TOKEN: string = "10218347135043962";

// ÉLÉMENTS

/* Call to action */
const $searchButton = document.getElementById("searchButton");
const $addButton = document.getElementById("addButton");
const $imgButtonHero = document.getElementById("imgButtonHero");
const $imgButtonTeam = document.getElementById("imgButtonTeam");

/* Image */
const $imgHeroContainer = document.getElementById("imgHero");
const $img = document.querySelector(".card__img img");
const $imgTeamContainer = document.getElementById("imgTeam");

const $svgArrowHero = document.querySelector("#imgButtonHero .svg--arrow");
const $svgArrowTeam = document.querySelector("#imgButtonTeam .svg--arrow");

/* Bloc content */
const $contentPresentation = document.querySelector(
  ".card__content--presentation"
) as HTMLElement;
const $contentIdentity = document.querySelector(
  ".card__content--hero"
) as HTMLElement;
const $logoContainer = document.querySelector(
  ".card__containerLogo"
) as HTMLElement;

/* Caracteristic */
const $name = document.getElementById("name");
const $id = document.getElementById("id");
const $realName = document.getElementById("realName");
const $race = document.getElementById("race");
const $poids = document.getElementById("poids");
const $intelligence = document.getElementById("intelligence");
const $force = document.getElementById("force");
const $vitesse = document.getElementById("vitesse");
const $puissance = document.getElementById("puissance");
const $combat = document.getElementById("combat");

const $intelligenceTeam = document.getElementById("intelligenceTeam");
const $forceTeam = document.getElementById("forceTeam");
const $vitesseTeam = document.getElementById("vitesseTeam");
const $puissanceTeam = document.getElementById("puissanceTeam");
const $combatTeam = document.getElementById("combatTeam");

// TEAM OBJECT

let herosOnMyTeam: {
  count: number;
  imgHero: string;
};

herosOnMyTeam = {
  count: 0,
  imgHero: "",
};

// ACTIONS

function getHeroName(): string {
  return (document.querySelector('input[name="nameHero"]') as HTMLInputElement)
    .value;
}

function searchHeroByName(): Promise<any> {
  $contentPresentation.textContent = "Recherche en cours";
  return axios
    .get(`${URL_CORS}${URL_API}${ACCESS_TOKEN}/search/${getHeroName()}`)
    .then(function (response) {
      if (response.data["error"]) {
        $contentPresentation.style.display = "flex";
        $contentIdentity.style.display = "none";
        $contentPresentation.textContent = `Erreur lors du chargement de ton Super Héro : ${response.data["error"]}`;
      } else {
        getHeroInfo(response);
        $contentPresentation.style.display = "none";
        $contentIdentity.style.display = "flex";
      }
    })
    .catch(function (error) {
      $contentPresentation.textContent = `Erreur lors du chargement de ton Super Héro : ${error}`;
    });
}

function getHeroInfo(response): void {
  $logoContainer.style.display = "none";

  const result = response.data.results[0];
  $img.setAttribute("src", result.image["url"]);
  $name.textContent = result.name;
  $id.textContent = `#${result.id}`;
  $realName.textContent = result.biography["full-name"];
  $race.textContent = result.appearance["race"];
  $poids.textContent = result.appearance["weight"][1];
  $intelligence.textContent = result.powerstats["intelligence"];
  $force.textContent = result.powerstats["strength"];
  $vitesse.textContent = result.powerstats["speed"];
  $puissance.textContent = result.powerstats["power"];
  $combat.textContent = result.powerstats["combat"];
}

function addToMyTeam(herosOnMyTeam): void {
  if (herosOnMyTeam.count < 4) {
    const $liElement = document.createElement("li");
    $liElement.textContent = $name.textContent;
    const $ulElement = document.getElementById("heroNameTeam");
    $ulElement.appendChild($liElement);
    $intelligenceTeam.textContent = `${
      parseInt($intelligenceTeam.textContent) +
      parseInt($intelligence.textContent)
    }`;
    $forceTeam.textContent = `${
      parseInt($forceTeam.textContent) + parseInt($force.textContent)
    }`;
    $vitesseTeam.textContent = `${
      parseInt($vitesseTeam.textContent) + parseInt($vitesse.textContent)
    }`;
    $puissanceTeam.textContent = `${
      parseInt($puissanceTeam.textContent) + parseInt($puissance.textContent)
    }`;
    $combatTeam.textContent = `${
      parseInt($combatTeam.textContent) + parseInt($combat.textContent)
    }`;
    herosOnMyTeam.count += 1;
    herosOnMyTeam.imgHero = $img.getAttribute("src");
  } else {
    alert(
      "Ton équipe comprend déjà 4 Super Héros. Clic sur le bouton de rafraîssement pour remettre à zéro ta Team."
    );
  }
}

function toggleButton($button): void {
  $button.disabled = !$button.disabled;
}

function openImage($button, $container, $svg): void {
  $button.addEventListener("click", () => {
    $container.classList.toggle("is-open");
    $svg.classList.toggle("is-rotate");
  });
}

function showImgTeam(team) {
  const imgHero = team.imgHero;
  switch (team.count) {
    case 1:
      document.getElementById("imgHero1").setAttribute("src", imgHero);
      break;
    case 2:
      document.getElementById("imgHero2").setAttribute("src", imgHero);
      break;
    case 3:
      document.getElementById("imgHero3").setAttribute("src", imgHero);
      break;
    case 4:
      document.getElementById("imgHero4").setAttribute("src", imgHero);
      break;
    default:
      console.log("error");
  }
}

// ÉVÈNNEMENTS

$searchButton.addEventListener("click", () => {
  toggleButton($searchButton);
  searchHeroByName().then(() => toggleButton($searchButton));
});

$addButton.addEventListener("click", () => {
  addToMyTeam(herosOnMyTeam);
  showImgTeam(herosOnMyTeam);
});

openImage($imgButtonHero, $imgHeroContainer, $svgArrowHero);
openImage($imgButtonTeam, $imgTeamContainer, $svgArrowTeam);
