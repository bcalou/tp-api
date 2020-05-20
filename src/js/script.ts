const NEWS_API_KEY: string = "f948f26cdab7436aa9731869f4fc9d59";
const NEWS_ENDPOINT: string = "https://newsapi.org/v2";

const REST_COUNTRY_ENDPOINT: string = "https://restcountries.eu/rest/v2";

const $formNews: HTMLElement = document.getElementById("form-news");
const $submitNews: HTMLElement = document.getElementById("submit-news");
const $articlesList: HTMLElement = document.getElementById("articles-list");
const $countrySelect: HTMLElement = document.getElementById("country-select");

let countrySelected: string;
let categorySelected: string;

$formNews.addEventListener("submit", (e) => {
  e.preventDefault();
  countrySelected = (document.getElementById(
    "country-select"
  ) as HTMLInputElement).value;
  categorySelected = (document.getElementById(
    "category-select"
  ) as HTMLInputElement).value;
  let additionalQuery: string = categorySelected
    ? `&category=${categorySelected}`
    : "";

  fetch(
    `${NEWS_ENDPOINT}/top-headlines?country=${countrySelected}${additionalQuery}&apiKey=${NEWS_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      let articles = data.articles;
      if (articles.length === 0) {
        showAlert();
      }
      eraseArticle();
      articles.forEach((article: Object) => {
        createArticle(article);
      });
    });
});

function eraseArticle(): void {
  $articlesList.innerHTML = "";
}

function getPublishedTime(time: string): string {
  let dateNow: any = new Date();
  let d2: any = new Date(time);

  let diff: any = dateNow - d2; // Can't find a way to substract 2 Date variables in TypeScript

  if (diff > 60e3) return `${Math.floor(diff / 60e3)} minutes ago`;
  else return `${Math.floor(diff / 1e3)} seconds ago`;
}

function createArticle(article: any) {
  let $container: HTMLElement = document.createElement("div");
  let $fragment: any = document.createDocumentFragment();
  $container.classList.add("card");
  $container.classList.add("mb-3");
  $container.classList.add("mt-5");
  $container.style.maxWidth = "540px";
  $container.innerHTML = `
  <div class="card-body bg-light ">
  <img src="${article.urlToImage}" class="card-img-top" alt="...">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text">${article.description}</p>
    <p class="card-text"><small class="text-muted">Last updated ${getPublishedTime(
      article.publishedAt
    )} </small></p>
    <a type="button" target="_blank" href=${
      article.url
    } class="btn btn-info">Read the article</a>

  </div>
`;
  $fragment.appendChild($container);
  $articlesList.appendChild($fragment);
}

function getAllCountry(): void {
  let countries = [];
  fetch(`${REST_COUNTRY_ENDPOINT}/all`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((country) => {
        let select = document.createElement("option");
        select.innerText = country.name;
        select.setAttribute("value", country.alpha2Code);
        $countrySelect.appendChild(select);
      });
    });
}

function showAlert() {
  alert("No news were found, try another country");
}

getAllCountry();
