const API_URL = "http://www.omdbapi.com/";
const API_KEY = "12976118";

const $movieTitleInput = document.getElementById("movie");
const $searchButton = document.getElementById("search-button");

// Return the input value
function getMovieTitle(input) {
  return input.value;
}

// function getLastPary(id) {
//   axios
//     .get(`${API_URL}/party/${id}`)
//     .then((res) => {
//       createArticle(res.data);
//     })
//     .then((error) => {
//       console.log(error);
//     });
// }

//http://www.omdbapi.com/?apikey=[yourkey]&

function getMovieInfos(movie) {
  axios
    .get(`${API_URL}/?apikey=${API_KEY}&t=${movie}`)
    .then((res) => {
      console.log(res);
    })
    .then((error) => {
      console.log(error);
    });
}

$searchButton.addEventListener("click", () => {
  getMovieInfos(getMovieTitle($movieTitleInput));
});
