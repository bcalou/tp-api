const API_URL = "https://www.omdbapi.com/";
const API_KEY = "12976118";

const $movieTitleInput = document.getElementById("movie");
const $movieForm = document.querySelector(".infos__form");
const $notFoundArticle = document.querySelector(".not-found");
const $movies = document.querySelector(".movies");

// Return the input value
function getMovieTitle(input) {
  return input.value;
}

// GET request to get movie list from title
function getMovies(movieTitle) {
  axios
    .get(`${API_URL}/?apikey=${API_KEY}&s=${movieTitle}`)
    .then((res) => {
      console.log(res);
      clearMovies($movies);
      getMoviesData(res.data.Search);
    })
    .then((error) => {
      console.log(error);
    });
}

// get the data for each movie
function getMoviesData(movieList) {
  movieList.forEach((movie) => {
    createArticle(movie);
  });
}

// remove the content from the container
function clearMovies(container) {
  container.innerHTML = "";
}

// Create an article with the movie's infos
function createArticle(movie) {
  const article = document.createElement("article");

  article.classList.add("movie");
  createArticleElement({
    type: "h2",
    content: movie.Title,
    cssClass: "movie__title",
    parent: article,
  });
  createArticleElement({
    type: "h3",
    content: `${movie.Year} - ${movie.Type}`,
    cssClass: "movie__sub-infos",
    parent: article,
  });

  if (movie.Poster !== "N/A") {
    createArticleImage(movie.Poster, article);
  }

  $movies.appendChild(article);
}

// create element w/ content and class in a parent
function createArticleElement(elementInfos) {
  const element = document.createElement(elementInfos.type);

  element.textContent = elementInfos.content;
  element.classList.add(elementInfos.cssClass);
  elementInfos.parent.appendChild(element);
}

// create image w/ src and class in a parent
function createArticleImage(src, parent) {
  const image = document.createElement("img");

  image.setAttribute("src", src);
  image.classList.add("movie__poster");
  parent.appendChild(image);
}
$movieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getMovies(getMovieTitle($movieTitleInput));
  // getMovieInfos(getMovieTitle($movieTitleInput));
});

// // get the movie infos w/ API
// function getMovieInfos(movie) {
//   axios
//     .get(`${API_URL}/?apikey=${API_KEY}&t=${movie}`)
//     .then((res) => {
//       console.log(res.data.Response);

//       if (res.data.Response === "False") {
//         $notFoundArticle.classList.add("not-found--visible");
//       } else {
//         $notFoundArticle.classList.remove("not-found--visible");

//         editArticle(res.data);
//       }
//     })
//     .then((error) => {
//       console.log(error);
//     });
// }

// // fill the article with request infos
// function editArticle(infos) {
//   const $movieArticle = document.querySelector(".movie");

//   $movieArticle.innerHTML = "";
//   createArticleElement({
//     type: "h2",
//     content: infos.Title,
//     cssClass: "movie__title",
//     parent: $movieArticle,
//   });
//   createArticleElement({
//     type: "h3",
//     content: `${infos.Runtime} - ${infos.Released}`,
//     cssClass: "movie__sub-infos",
//     parent: $movieArticle,
//   });
//   createArticleImage(infos.Poster, $movieArticle);
//   createArticleElement({
//     type: "p",
//     content: infos.Plot,
//     cssClass: "movie__plot",
//     parent: $movieArticle,
//   });
//   createArticleElement({
//     type: "p",
//     content: `Actors: ${infos.Actors}`,
//     cssClass: "movie__actors",
//     parent: $movieArticle,
//   });
//   createArticleElement({
//     type: "p",
//     content: `IMDb Rating: ${infos.imdbRating}`,
//     cssClass: "movie__rating",
//     parent: $movieArticle,
//   });
// }
