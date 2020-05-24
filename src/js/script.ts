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



let language: string;
let pageSizeData: number;
let sortBy: string;
let category: string;


// INTERFACES

interface Article {
  title: string,
  urlToImage: string,
  description: string,
  url: string,
  publishedAt: string,
}

interface CreateElement {
  type: string;
  content?: string;
  urlToImage?: string;
  url?: string;
  parent?: HTMLElement;
}

interface Values {
  data: string | number,
  $element: HTMLElement,
  type: string
  
}


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
  createElement({type: 'h2', content: 'Is Loading', parent: $articlesContainer});

  fetch(proxyUrl + getArticlesUrl())
      .then(res => res.json())
      .then(data => {
        let articles: Array<Article> = data.articles;
        if (articles.length === 0) {
          alert('No article were found, try an other research');
        }
        showArticles(articles);
      });
}


// include params inside API URL 
function getArticlesUrl(): string {
  let keywords: string = (document.querySelector('.search') as HTMLInputElement).value;
  let country: string = (document.getElementById('country') as HTMLInputElement).value;
  if((!keywords) && (!country)) {
    alert(" Merci de renseigner un mot clé ou un pays");
  }else if ((keywords) && (!country)){
    let queryKeywords: string = `q=${keywords}`;
    let queryLanguage: string = getValue({data: language,$element: $language, type: 'language'})
    let queryPageSize: string = getValue({data: pageSizeData, $element: $pageSize, type: 'pageSize'})
    let querySortBy: string = getValue({data: sortBy, $element: $sortBy, type: 'sortBy'})
    return `${endpoint}/everything?${queryKeywords}${queryLanguage}${queryPageSize})}${querySortBy}&apiKey=${API_key}`;

  }else if ((!keywords) && (country)){
    let queryCountry: string = `country=${country}`;
    let queryCategory: string = getValue({data: category, $element: $category, type:'category'})
    return `${endpoint}/top-headlines?${queryCountry}${queryCategory}&apiKey=${API_key}`;

  }else{
    alert('Search error');
  }
}


function getValue(value: Values): string {
  value.data = (value.$element as HTMLInputElement).value;
  return value ? `&${value.type}=${value.data}` : '';

}

// Display articles
function showArticles(articles): void {
  $articlesContainer.textContent = '';
  
  const $fragment: any = document.createDocumentFragment();
  
  articles.forEach(article => $fragment.appendChild(getArticleElement(article)));
  
  $articlesContainer.appendChild($fragment);
}

// Create articles from article object
function getArticleElement(article: Article): HTMLElement {
  const $article: HTMLElement = createElement({type: 'article'});

  createElement({type: 'h3', content: article.title, parent: $article});
  createElement({type: 'img', urlToImage: article.urlToImage, parent: $article});
  createElement({type: 'p', content: article.description, parent: $article});
  createElement({type: 'a', url: article.url, content: "Lire l'article", parent: $article});

  const publishedAt = new Date(article.publishedAt).toLocaleString();
  const $publishedAt = createElement({
    type: 'time',
    content: publishedAt,
    parent: $article
  });

  $publishedAt.setAttribute('datetime', article.publishedAt);

  return $article;
}

// Create element and append it to the given parent
function createElement(options: CreateElement): HTMLElement {
  const $element = document.createElement(options.type);

  if (options.type === 'img') {
    $element.setAttribute('src', options.urlToImage)
  }

  if (options.type === 'a') {
    $element.setAttribute('href', options.url)
  }

  if (options.content) {
    $element.textContent = options.content;  
  }
  
  if (options.parent) {
    options.parent.appendChild($element);
  }

  return $element;

}

function deleteArticles(): void {
  $articlesContainer.innerHTML = "";
}