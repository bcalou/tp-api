//JS du codepen du prof (boutons ?)

const API_URL = "https://api.chucknorris.io/jokes";

const $randomJokeButton = document.getElementById("randomJokeButton");
const $jokeButton = document.getElementById("jokeButton");
const $jokeContainer = document.getElementById("jokeContainer");

//console.log("valeur de randomJokeButton : " + $randomJokeButton);
//console.log("valeur de jokeButton : " + $jokeButton);

// Fetch random joke from API
function getRandomJoke() {
  $jokeContainer.textContent = "Chargement en cours";
  console.log("Listener OK!");
  return fetch(getRandomJokeUrl(), { mode: "no-cors" })
    .then(res => res.json())
    .then(joke => showJoke(joke));
}

// Fetch category joke from API
function getCategoryJoke() {
  $jokeContainer.textContent = "Chargement en cours";

  return fetch(getCategoryJokeUrl(), { mode: "no-cors" })
    .then(res => res.json())
    .then(joke => showJoke(joke));
}
// Include parameters inside the API url
function getRandomJokeUrl() {
  console.log("Generated random url OK!");

  return `${API_URL}/random`;
}

function getCategoryJokeUrl() {
  console.log("Generated category url OK!");

  return `${API_URL}/jokes/random?category=${getSelectedCategory}`;
}

// Display joke into <p> tag
function showJoke(joke) {
  $jokeContainer.textContent = "";

  const $jokeFragment = document.createDocumentFragment();

  $jokeFragment.appendChild(getJokeElement(joke));

  $jokeContainer.appendChild($jokeFragment);
}

// Generate a joke element from a joke object
function getJokeElement(joke) {
  const $joke = createElement({ type: "article" });

  createElement({ type: "p", text: joke.value, parent: $value });

  return $joke;
}

// Create an element and append it to the given parent
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

// Toggle the disabled attribute of a button
function toggleButton($button) {
  $button.disabled = !$button.disabled;
}

// Get value of selected animal radio button
function getSelectedCategory() {
  return document.querySelectorAll("#select :selected").text;
}

//document.getElementById('liste').value;

$randomJokeButton.addEventListener("click", () => {
  toggleButton($randomJokeButton);
  getRandomJoke().then(() => toggleButton($randomJokeButton));
});

$jokeButton.addEventListener("click", () => {
  toggleButton($jokeButton);
  getCategoryJoke().then(() => toggleButton($jokeButton));
});
