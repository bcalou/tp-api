const $jokeButton = document.getElementById("jokeButton");
const $joke = document.getElementById("joke");

// Fetch random fact from API
function getJoke() {
  $joke.textContent = "Loading";
  return fetch(`https://api.jokes.one/jod?category=animal`)
    .then((res) => res.json())
    .then((joke) => showJoke(joke));
}

// Display joke into <p> tag
function showJoke(joke) {
  $jokeContainer.textContent = "";
  const $JokeFragment = document.createDocumentFragment();
  joke.forEach((joke) => $jokeFragment.appendChild(getJokeElement(joke)));
  $jokeContainer.appendChild($jokeFragment);
}

// Toggle the disabled attribute of a button
function toggleButton($button) {
  $button.disabled = !$button.disabled;
}

$jokeButton.addEventListener("click", () => {
  toggleButton($jokeButton);
  getJoke().then(() => toggleButton($jokeButton));
});
