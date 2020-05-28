const api_key: string = "key=89b0fc47e532d27c5c3b997595156649";
const api_url: string = "https://api.brewerydb.com/v2";
const proxy_url: string = "https://cors-anywhere.herokuapp.com/";

const $searchButton: HTMLElement = document.querySelector(".keyword__form");
const $container: HTMLElement = document.querySelector(".results__container");
const $randomBeer: HTMLElement = document.getElementById("randomBeer");
const $randomBreewery: HTMLElement = document.getElementById("randomBrewery");

interface ResultDB {
  id: string;
  name: string;
  description: string;
  type: string;
  established?: number;
  isOrganic?: string;
}

interface CreateElement {
  type: string;
  content?: string;
  parent?: HTMLElement;
  class?: string;
  img?: string;
}

//  5 - CREATE HTML ELEMENTS
function createElement(options: CreateElement): HTMLElement {
  const $element: HTMLElement = document.createElement(options.type);

  if (options.parent) {
    options.parent.appendChild($element);
  }

  if (options.content) {
    $element.textContent = options.content;
  }

  if (options.class) {
    $element.setAttribute("class", options.class);
  }

  return $element;
}

// 4 -
function getResultElement(result: ResultDB): HTMLElement {
  const $listItem: HTMLElement = createElement({
    type: "div",
    class: "result",
  });
  console.log(result);

  createElement({
    type: "h1",
    content: result.name + " | " + result.type,
    parent: $listItem,
    class: "result__title",
  });

  createElement({
    type: "p",
    content: result.description,
    parent: $listItem,
    class: "result__description",
  });

  return $listItem;
}

// 3 - SHOW ALL RESULTS
function showResults(results): void {
  $container.textContent = "";

  const $fragment: any = document.createDocumentFragment();

  results.forEach((result) => {
    $fragment.appendChild(getResultElement(result));
  });

  $container.appendChild($fragment);
}

// 2 - FETCH FOR API
function fetchBeerAPI(): void {
  $container.innerHTML = "Chargement...";
  console.log(getFetchUrl());
  fetch(getFetchUrl())
    .then((res) => res.json())
    .then((data) => {
      let result: Array<ResultDB> = data.data;
      if (result.length === 0) {
        alert("No match found, try again.");
      }
      showResults(result);
    });
}

// 2-1 - GET THE URL FOR FETCH
function getFetchUrl(): string {
  let keyword: string = (document.querySelector(
    ".keyword__inputs--search"
  ) as HTMLInputElement).value;
  if (!keyword) {
    alert("Renseignez un keyword");
  } else if (keyword) {
    let searchKeyword: string = `q=${keyword}`;
    return `${proxy_url}${api_url}/search/?${api_key}&${searchKeyword}`;
  }
}

// 1 - MAIN
function main(): void {
  $searchButton.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchBeerAPI();
  });
}

main();
