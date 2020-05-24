const endpoint: string = "https://newsapi.org/v2";
const API_key: string = "519203cf48914461a65a6d8908306907";
const proxyUrl: string = 'https://cors-anywhere.herokuapp.com/'

const $search_forms: NodeListOf<Element> = document.querySelectorAll('.search-form');
const $language: HTMLElement = document.getElementById('language');
const $pageSize: HTMLElement = document.getElementById('pageSize');
const $sortBy: HTMLElement = document.getElementById('sortBy');
const $country: HTMLElement = document.getElementById('country');
const $category: HTMLElement = document.getElementById('category');
const $refreshButton: HTMLElement = document.getElementById('refresh');

let $articlesContainer: HTMLElement = document.getElementById('articlesContainer');


let keywords: string;
let language: string;
let pageSizeData: number;
let sortBy: string;

let country: string;
let category: string;

// INTERFACES

// interface Article {
//   title: string,
//   urlToImage: string,
//   description: string,
//   url: string,
//   publishedAt: string,
// }

// interface Values {
//   value: any,
//   element: HTMLElement,
//   type: string,
// }

// interface CreateElement {
//   type: string;
//   content: string;
//   url?: string;
//   parent: HTMLElement;
// }


$search_forms.forEach(search_form => {
  search_form.addEventListener('submit', (e) => {
  e.preventDefault();
  deleteArticles();
  getArticles();
  });
});

$refreshButton.addEventListener('click', () => {
  location.reload();
});


// Fetch articles from API 
function getArticles(): void {
  createElement({type: 'h2', text: 'Is Loading', parent: $articlesContainer});

  fetch(proxyUrl + getArticlesUrl())
      .then(res => res.json())
      .then(data => {
        let articles = data.articles;
        if (articles.length === 0) {
          alert('No article were found, try an other research');
        }
        showArticles(articles);
      });
}


// include params inside API URL 
function getArticlesUrl(): string {
  keywords = (document.querySelector('.search') as HTMLInputElement).value;
  country = (document.getElementById('country') as HTMLInputElement).value;
  if((!keywords) && (!country)) {
    alert(" Merci de renseigner un mot clé ou un pays");
  }else if ((keywords) && (!country)){
    let queryKeywords: string = `q=${keywords}`;
    return `${endpoint}/everything?${queryKeywords}${getValue(language, $language, language)}${getValue(pageSizeData, $pageSize, 'pageSize')}${getValue(sortBy, $sortBy, sortBy)}&apiKey=${API_key}`;

  }else if ((!keywords) && (country)){
    let queryCountry: string = `country=${country}`;
    return `${endpoint}/top-headlines?${queryCountry}${getValue(category, $category, category)}&apiKey=${API_key}`;

  }else{
    alert('Search error');
  }
}

function getValue(value: any, $element: HTMLElement, type: string): string {
  value = ($element as HTMLInputElement).value;
  return value ? `&${type}=${value}` : '';

}


// Display articles
function showArticles(articles): void {
  $articlesContainer.textContent = '';
  
  const $fragment: any = document.createDocumentFragment();
  
  articles.forEach(article => $fragment.appendChild(getArticleElement(article)));
  
  $articlesContainer.appendChild($fragment);
}

// function getArticleData(article: Article): Article {
//   return {
//     title: article.title,
//     urlToImage: article.urlToImage,
//     description: article.description,
//     url: article.url, 
//     publishedAt: article.publishedAt
//   };
// }


// Create articles from article object
function getArticleElement(article): HTMLElement {
  const $article: HTMLElement = createElement({type: 'article'});

  createElement({type: 'h3', text: article.title, parent: $article});
  createElement({type: 'img', url: article.urlToImage, parent: $article});
  createElement({type: 'p', text: article.description, parent: $article});
  createElement({type: 'a', url: article.url, text: "Lire l'article", parent: $article});

  const publishedAt = new Date(article.publishedAt).toLocaleString();
  const $publishedAt = createElement({
    type: 'time',
    text: publishedAt,
    parent: $article
  });

  $publishedAt.setAttribute('datetime', article.publishedAt);

  return $article;
}

// Create element and append it to the given parent
function createElement(options: any): HTMLElement {
  const $element = document.createElement(options.type);

  if (options.type === 'img') {
    $element.src = options.url;
  }

  if (options.type === 'a') {
    $element.href = options.url;
  }

  if (options.text) {
    $element.textContent = options.text;  
  }
  
  if (options.parent) {
    options.parent.appendChild($element);
  }
  return $element;

}

function deleteArticles(): void {
  $articlesContainer.innerHTML = "";
}