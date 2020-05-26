const API_KEY: string = "3831083750296778";
const API_URL: string = "https://superheroapi.com/api/";
const PROXY_URL: string = "https://cors-anywhere.herokuapp.com/";

let $keywordForm: HTMLElement = document.querySelector(".keyword__form");
console.log($keywordForm);

interface Heroes {
  id: number;
  image: string;
  name: string;
}

function getHeroUrl(): string {
  let keyword: string = (document.querySelector(
    ".keyword__form--search"
  ) as HTMLInputElement).value;
  if (!keyword) {
    alert("Rentrez un input svp");
  } else {
    let myKeyword: string = `search/${keyword}`;
    return myKeyword;
  }
}

function getHero(): string {
  fetch(`${PROXY_URL}${API_URL}${API_KEY}/` + getHeroUrl())
    .then((res) => res.json())
    .then((heroDatas) => {
      let heros: Array<Heroes> = heroDatas.results;
      console.log(heros);
    });
}

$keywordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getHero();
});
