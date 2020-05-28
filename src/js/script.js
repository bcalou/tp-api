const $callAPI = document.getElementById("call");
const $showResult = document.getElementById("result");

$callAPI.addEventListener("click", () => {
  $showResult.innerHTML = "Loading...";
  return fetch("https://the-one-api.herokuapp.com/v1/book")
    .then((res) => res.json())
    .then((books) => {
      console.log(books);
      $showResult.innerHTML = "";
      var $bookList = books.docs;
      $bookList.forEach(listBooks);
    });
});
function listBooks(item, index) {
  $showResult.innerHTML += (index += 1) + "- " + item.name + "<br>";
}

// ----------------

const $callAPI2 = document.getElementById("call2");
const $showResult2 = document.getElementById("result2");

headers = new Headers({
  Authorization: "Bearer HDDZurhwaoc4RKzZ29sg",
});

$callAPI2.addEventListener("click", () => {
  $showResult2.innerHTML = "Loading...";
  return fetch("https://the-one-api.herokuapp.com/v1/movie", { headers })
    .then((res) => res.json())
    .then((movies) => {
      console.log(movies);
      $showResult2.innerHTML = "";
      var $movieList = movies.docs;
      $movieList.forEach(listMovies);
    });
});
function listMovies(item, index) {
  $showResult2.innerHTML += (index += 1) + "- " + item.name + "<br>";
}

// ----------------

const $callAPI3 = document.getElementById("call3");
const $showResult3 = document.getElementById("result3");

headers = new Headers({
  Authorization: "Bearer HDDZurhwaoc4RKzZ29sg",
});

$callAPI3.addEventListener("click", () => {
  $showResult3.innerHTML = "Loading...";
  return fetch("https://the-one-api.herokuapp.com/v1/character", { headers })
    .then((res) => res.json())
    .then((characters) => {
      console.log(characters);
      $showResult3.innerHTML = "";
      var $characterList = characters.docs;
      $characterList.forEach(listCharacters);
    });
});
function listCharacters(item, index) {
  $showResult3.innerHTML += (index += 1) + "- " + item.name + "<br>";
}
