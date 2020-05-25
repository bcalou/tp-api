const API_URL = "https://api.jokes.one/jod";
const $jokeButton = document.getElementById("jokeButton");
const $joke = document.getElementById("joke");

// Fetch random joke from API
function getJoke() {
  $joke.textContent = "Loading";
  return fetch(`${API_URL}`)
    .then((res) => res.json())
    .then((joke) => showJoke(joke));
}

// Display joke into <p> tag
function showJoke(joke) {
  $jokeContainer.textContent = "";

  const $JokeFragment = document.createDocumentFragment();

  facts.forEach((joke) => $jokeFragment.appendChild(getJokeElement(joke)));

  $jokeContainer.appendChild($jokeFragment);
}
