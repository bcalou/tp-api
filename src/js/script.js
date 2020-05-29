const API_URL = "https://binaryjazz.us/wp-json/genrenator/v1.";
const NUMBER_OF_FACTS = 5;

const $genreButton = document.getElementById("genreButton");
const $genresContainer = document.getElementById("genresContainer");

function getGenreUrl() {
  return `${API_URL}`;
}

function getGenre() {
  return fetch(getGenreUrl())
    .then((res) => res.json())
    .then((genres) => showGenres(genres));
}

function showGenres(genres) {
  $genresContainer.textContent = "";

  const $genresFragment = document.createDocumentFragment();

  genres.forEach((genre) =>
    $genresFragment.appendChild(getGenreElement(genre))
  );

  $genresContainer.appendChild($genresFragment);
}

function createElement(options) {
  const $element = document.createElement(options.type);

  if (options.text) {
    $element.textContent = options.text;
  }

  if (options.parent) {
    options.parent.appendChild($element);
  }

  return $element;
}

function getGenreElement(genre) {
  const $genre = createElement({ type: "article" });

  createElement({ type: "p", text: genre.text, parent: $genre });

  return $genre;
}

function toggleButton($button) {
  $button.disabled = !$button.disabled;
}

$genreButton.addEventListener("click", () => {
  toggleButton($genreButton);
  getGenre().then(() => toggleButton($genreButton));
});

console.log("Hello world");
