const API_KEY: string = "f948f26cdab7436aa9731869f4fc9d59";
const ENDPOINT: string = "https://newsapi.org/v2/";

const $formNews: HTMLElement = document.getElementById("form-news");
const $submitNews: HTMLElement = document.getElementById("submit-news");
const $articlesList: HTMLElement = document.getElementById("articles-list");

let country: string;

console.log($submitNews);

$formNews.addEventListener("submit", (e) => {
  e.preventDefault();
  country = (document.getElementById("country-select") as HTMLInputElement)
    .value;
  fetch(`${ENDPOINT}/top-headlines?country=${country}&apiKey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.articles);
      let articles = data.articles;
      articles.forEach((article: Object) => {
        eraseArticle();
        createArticle(article);
      });
    });
});

function eraseArticle() {
  $articlesList.innerHTML = "";
}

function createArticle(article: any) {
  let $container: HTMLElement = document.createElement("div");
  let $fragment: HTMLElement = document.createDocumentFragment();
  $container.classList.add("card");
  $container.classList.add("mb-3");
  $container.classList.add("mt-5");
  $container.style.maxWidth = "540px";
  $container.innerHTML = `
  <div class="card-body bg-light ">
  <img src="${article.urlToImage}" class="card-img-top" alt="...">
    <h5 class="card-title">${article.title}</h5>
    <p class="card-text">${article.description}</p>
    <p class="card-text"><small class="text-muted">Last updated ${article.publishedAt} mins ago</small></p>
    <button type="button" href=${article.url} class="btn btn-info">Read the article</button>

  </div>
`;
  $fragment.appendChild($container);
  $articlesList.appendChild($fragment);
}
