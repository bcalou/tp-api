declare var require: any; // define require to avoid Linter error on the "require"

import {
  ALERTS,
  NEWS_API_KEY,
  NEWS_ENDPOINT,
  REST_COUNTRY_ENDPOINT,
  PROXY_URL,
  CARD_CONTAINER,
} from "./const";

import { Article, FetchParams } from "./interface";

const imgNotFound = require("../assets/img-not-found.png");

const $formNews: HTMLElement = document.getElementById("form-news");
const $articlesList: HTMLElement = document.getElementById("articles-list");
const $countrySelect: HTMLElement = document.getElementById("country-select");
const $backToTopBtn: HTMLElement = document.getElementById("back-to-top");

$formNews.addEventListener("submit", (e) => {
  e.preventDefault();
  submitNewsForm();
});

// submit the news form
function submitNewsForm(): void {
  let countrySelected: string = (document.getElementById(
    "country-select"
  ) as HTMLInputElement).value;

  let categorySelected: string = (document.getElementById(
    "category-select"
  ) as HTMLInputElement).value;

  if (categorySelected === "") {
    fetchDataNews({ countrySelected });
  } else {
    fetchDataNews({ countrySelected, categorySelected });
  }
}
// query and fetch data from API
function fetchDataNews(params: FetchParams) {
  fetch(PROXY_URL + getFetchUrlNews(params))
    .then((res) => res.json())
    .then((data) => {
      let articles = data.articles;
      if (articles.length === 0) {
        showAlert(ALERTS.NO_NEWS);
      }
      eraseArticle();

      articles.forEach((article: any) => {
        let { description, publishedAt, title, url, urlToImage } = article;
        createArticle({ description, publishedAt, title, url, urlToImage });
      });
    });
}

// get URL to fetch data
function getFetchUrlNews(params: FetchParams): string {
  let { countrySelected, categorySelected } = params;

  let additionalQuery = categorySelected ? `&category=${categorySelected}` : "";

  let query = `country=${countrySelected}${additionalQuery}`;

  return `${NEWS_ENDPOINT}/top-headlines?${query}&apiKey=${NEWS_API_KEY}`;
}

// Erase article list
function eraseArticle(): void {
  $articlesList.innerHTML = "";
}

// Get the time that has passed since the publication of the article
function getPublishedTime(time: string): string {
  if (time === "") return "No informations on published time.";
  let dateNow: any = new Date();
  let d2: any = new Date(time);
  let diff: any = dateNow - d2;

  if (diff > 60e3) {
    let minutes = Math.floor(diff / 60e3);
    if (minutes / 60 < 1) {
      return `${Math.floor(diff / 60e3)} minutes ago`;
    } else {
      let m: number = minutes % 60;
      let h: number = Math.floor(minutes / 60);
      return `${h} ${h > 1 ? "hours" : "hour"} and ${m} ${
        m > 1 ? "minutes" : "minute"
      } ago`;
    }
  } else return `${Math.floor(diff / 1e3)} seconds ago`;
}

// Create an article and append it to the list
function createArticle(article: Article) {
  let $container: HTMLElement = createContainerArticle();
  let $fragment: any = document.createDocumentFragment();
  $container.innerHTML = getArticleInnerHTML(article);
  $fragment.appendChild($container);
  $articlesList.appendChild($fragment);
}

// Get the HTML for the article
function getArticleInnerHTML(article: Article): string {
  let urlToImage = article.urlToImage || imgNotFound;
  let title = article.title || "";
  let description = article.description || "";
  let publishedAt = getPublishedTime(article.publishedAt || "");
  let url = article.url || "";

  let innerHTML = `
  <div class="card-body bg-light ">
  <img src="${urlToImage}" class="card-img-top" alt="Article image">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${description}</p>
    <p class="card-text"><small class="text-muted">Published ${publishedAt} </small></p>
    <a type="button" target="_blank" href=${url} class="btn btn-info">Read the article</a>
  </div>`;

  return innerHTML;
}

// Create Container for the article and return the container
function createContainerArticle(): HTMLElement {
  let $container: HTMLElement = document.createElement("div");
  $container.className += CARD_CONTAINER.classes;
  $container.style.maxWidth = CARD_CONTAINER.maxWidth;
  return $container;
}

// Get all country from the API
function getAllCountry(): void {
  fetch(`${REST_COUNTRY_ENDPOINT}/all`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((country: any) => {
        $countrySelect.appendChild(createCountryOption(country));
      });
    });
}

// Show a message when no articles are found for a county
function showAlert(string: string): void {
  alert(string);
}

// Function that need to be call to init the webpage
function init() {
  getAllCountry();
}

//Function to create a country option element
function createCountryOption(country): HTMLElement {
  let select = document.createElement("option");
  select.innerText = country.name;
  select.setAttribute("value", country.alpha2Code);
  return select;
}

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 300) {
    shouldDisplayBackToTop(true);
  }
  if (window.scrollY === 0) {
    shouldDisplayBackToTop(false);
  }
});

// Add or remove the visibility of "back to the top" Button
function shouldDisplayBackToTop(shouldDisplay: boolean): void {
  if (shouldDisplay) {
    $backToTopBtn.classList.add("visible");
    $backToTopBtn.classList.remove("invisible");
  } else {
    $backToTopBtn.classList.remove("visible");
    $backToTopBtn.classList.add("invisible");
  }
}

$backToTopBtn.addEventListener("click", () => {
  backToTop();
  shouldDisplayBackToTop(false);
});

// Function to scroll up to the top
function backToTop(): void {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  } else {
    return;
  }
}

init();
