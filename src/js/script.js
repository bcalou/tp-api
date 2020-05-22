const endpoint = "https://newsapi.org/v2";
const API_key = "519203cf48914461a65a6d8908306907";
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

const $search_forms = document.querySelectorAll('.search-form');
const $language = document.getElementById('language');
const $pageSize = document.getElementById('pageSize');
const $sortBy = document.getElementById('sortBy');

const $country = document.getElementById('country');
const $category = document.getElementById('category');

const $refreshButton = document.getElementById('refresh');


let $articlesContainer = document.getElementById('articlesContainer');


let keywords;
let language;
let pageSize;
let sortBy;

let country;
let category;
let targetUrl;

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
function getArticles() {
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
function getArticlesUrl() {
  keywords = document.querySelector('.search').value;
  country = document.getElementById('country').value;
  if((!keywords) && (!country)) {
    alert(" Merci de renseigner un mot clé ou un pays");
  }else if ((keywords) && (!country)){
    let queryKeywords = `q=${keywords}`;
    return `${endpoint}/everything?${queryKeywords}${getValue(language, $language, language)}${getValue(pageSize, $pageSize, pageSize)}${getValue(sortBy, $sortBy, sortBy)}&apiKey=${API_key}`;

  }else if ((!keywords) && (country)){
    let queryCountry = `country=${country}`;
    return `${endpoint}/top-headlines?${queryCountry}${getValue(category, $category, category)}&apiKey=${API_key}`;

  }else{
    alert('Search error');
  }
}

function getValue(value, $element, type) {
  value = $element.value;
  return value ? `&${type}=${value}` : '';

}


// Display articles
function showArticles(articles) {
  $articlesContainer.textContent = '';
  
  const $fragment = document.createDocumentFragment();
  
  articles.forEach(article => $fragment.appendChild(getArticleElement(article)));
  
  $articlesContainer.appendChild($fragment);
}

// Create articles from article object
function getArticleElement(article) {
  const $article = createElement({type: 'article'});

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
function createElement(options) {
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

function deleteArticles() {
  $articlesContainer.innerHTML = "";
}