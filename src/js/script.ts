declare var require: any; // define require to avoid Linter error on the "require"

import {
  ALERTS,
  NEWS_API_KEY,
  NEWS_ENDPOINT,
  REST_COUNTRY_ENDPOINT,
  PROXY_URL,
  CARD_CONTAINER,
  CARD_BODY,
  CARD_IMG,
  CARD_LINK,
  CARD_SMALL,
  CARD_TEXT,
  CARD_TITLE,
} from "./const";

import { createElement, appendSeveralChild, getPublishedTime } from "./utility";

import { Article, FetchParams } from "./interface";

const imgNotFound = require("../assets/img-not-found.png");

const $formNews: HTMLElement = document.getElementById("form-news");
const $articlesList: HTMLElement = document.getElementById("articles-list");
const $countrySelect: HTMLElement = document.getElementById("country-select");
const $backToTopBtn: HTMLElement = document.getElementById("back-to-top");
const $categorySelect: HTMLElement = document.getElementById("category-select");

$formNews.addEventListener("submit", (e) => {
  e.preventDefault();
  submitNewsForm();
});

// Submit the news form
function submitNewsForm(): void {
  let countrySelected: string = ($countrySelect as HTMLInputElement).value;
  let categorySelected: string = ($categorySelect as HTMLInputElement).value;

  if (categorySelected === "") {
    fetchDataNews({ countrySelected });
  } else {
    fetchDataNews({ countrySelected, categorySelected });
  }
}

// Query and fetch data from API
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
        createArticle(getDataReady(article));
      });
    });
}

// Get URL to fetch data
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

// Create an article and append it to the list
function createArticle(article: Article) {
  let $container: HTMLElement = createContainerArticle();
  let $fragment: any = document.createDocumentFragment();
  let $card: HTMLElement = createCardElement(article);
  $container.appendChild($card);
  $fragment.appendChild($container);
  $articlesList.appendChild($fragment);
}

// Getting raw data from the API ready for render
function getDataReady(article: Article): Article {
  return {
    urlToImage: article.urlToImage || imgNotFound,
    title: article.title || "No title",
    description: article.description || "No description",
    publishedAt: getPublishedTime(article.publishedAt) || "No published time",
    url: article.url || "",
  };
}

// Creating the card Element
function createCardElement(article: Article): HTMLElement {
  let { urlToImage, title, description, publishedAt, url } = article;

  let $card = createElement(CARD_BODY);
  let $cardImg = createElement({ ...CARD_IMG, imgSrc: urlToImage });
  let $cardTitle = createElement({ ...CARD_TITLE, content: title });
  let $cardDescription = createElement({ ...CARD_TEXT, content: description });
  let $cardDate = createElement({ ...CARD_TEXT });
  let $cardSmall = createElement({
    ...CARD_SMALL,
    content: `Published ${publishedAt}.`,
  });
  let $cardLink = createElement({ ...CARD_LINK, url });

  // Assembling the card Element
  $cardDate.appendChild($cardSmall);
  appendSeveralChild($card, [
    $cardImg,
    $cardTitle,
    $cardDescription,
    $cardDate,
    $cardLink,
  ]);

  return $card;
}

// Create Container for the article and return the container
function createContainerArticle(): HTMLElement {
  let $container: HTMLElement = createElement(CARD_CONTAINER);
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
  let $select = document.createElement("option");
  $select.innerText = country.name;
  $select.setAttribute("value", country.alpha2Code);
  return $select;
}

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
