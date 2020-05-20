import {
  ALERTS,
  NEWS_API_KEY,
  NEWS_ENDPOINT,
  REST_COUNTRY_ENDPOINT,
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
    fetchData({ countrySelected });
  } else {
    fetchData({ countrySelected, categorySelected });
  }
}

// query and fetch data from API
function fetchData(params: FetchParams) {
  let { countrySelected, categorySelected } = params;

  let additionalQuery = categorySelected ? `&category=${categorySelected}` : "";

  let query = `country=${countrySelected}${additionalQuery}`;

  fetch(`${NEWS_ENDPOINT}/top-headlines?${query}&apiKey=${NEWS_API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      let articles = data.articles;
      if (articles.length === 0) {
        showAlert();
      }
      eraseArticle();

      articles.forEach((article: any) => {
        let { description, publishedAt, title, url, urlToImage } = article;
        createArticle({ description, publishedAt, title, url, urlToImage });
      });
    });
}

// Erase article list
function eraseArticle(): void {
  $articlesList.innerHTML = "";
}

// Get the time that has passed since the publication of the article
function getPublishedTime(time: string): string {
  let dateNow: any = new Date();
  let d2: any = new Date(time);

  let diff: any = dateNow - d2; // Can't find a way to substract 2 Date variables in TypeScript

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
  $container.innerHTML = `
  <div class="card-body bg-light ">
  <img src="${
    article.urlToImage || imgNotFound
  }" class="card-img-top" alt="Article image">
    <h5 class="card-title">${article.title || ""}</h5>
    <p class="card-text">${article.description || ""}</p>
    <p class="card-text"><small class="text-muted">Last updated ${getPublishedTime(
      article.publishedAt || ""
    )} </small></p>
    <a type="button" target="_blank" href=${
      article.url
    } class="btn btn-info">Read the article</a>

  </div>
`;
  $fragment.appendChild($container);
  $articlesList.appendChild($fragment);
}

// Create Container for the article and return the container
function createContainerArticle(): HTMLElement {
  let $container: HTMLElement = document.createElement("div");
  $container.classList.add("card");
  $container.classList.add("mb-3");
  $container.classList.add("mt-5");
  $container.style.maxWidth = "540px";
  return $container;
}

// Get all country from the REST API
function getAllCountry(): void {
  fetch(`${REST_COUNTRY_ENDPOINT}/all`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((country: any) => {
        let select = document.createElement("option");
        select.innerText = country.name;
        select.setAttribute("value", country.alpha2Code);
        $countrySelect.appendChild(select);
      });
    });
}

// Show a message when no articles are found for a county
function showAlert() {
  alert(ALERTS.NO_NEWS);
}

// Function that need to be call to init the webpage
function init() {
  getAllCountry();
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

    console.log("no");
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
