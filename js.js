const endpoint = "https://newsapi.org/v2";
const API_key = "519203cf48914461a65a6d8908306907";

const $searchButton = document.getElementById('searchButton');
const $language = document.getElementById('language');
const $pageSize = document.getElementById('pageSize');
const $sortBy = document.getElementById('sortBy');
let $articlesContainer = document.getElementById('articlesContainer');
let $search_form = document.querySelector('.search-form')

let keywords;
let language;
let pageSize;
let sortBy;

$search_form.addEventListener('submit', (e) => {
  e.preventDefault();
  keywords = document.querySelector('.search').value;
  language = $language.value;
  pageSize = $pageSize.value;
  sortBy = $sortBy.value;

  if((!keywords)) {
    alert(" Merci de renseigner un mot clé ou une catégorie");
  }else{

    let queryKeywords = `q=${keywords}`;
    let queryLanguage = language ? `&language=${language}` : '';
    let querypageSize = pageSize ? `&pageSize=${pageSize}` : '';
    let querySortBy = sortBy ? `&sortBy=${sortBy}` : '';


    fetch(`${endpoint}/everything?${queryKeywords}${queryLanguage}${querypageSize}${querySortBy}&apiKey=${API_key}`)
      .then((res) => res.json())
      .then((data) => {
        let articles = data.articles;
        showArticles(articles);
        
      });
  }

});



function showArticles(articles) {
  $articlesContainer.textContent = '';
  
  const $fragment = document.createDocumentFragment();
  
  articles.forEach(article => $fragment.appendChild(getArticleElement(article)));
  
  $articlesContainer.appendChild($fragment);
}


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

function createElement(options) {

  const $element = document.createElement(options.type);
  //console.log(typeof(options.type));

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


