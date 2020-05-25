const API_URL = "https://api.jokes.one/jod?";
const $jokeButton = document.getElementById("jokeButton");
const $joke = document.getElementById("joke");

// Fetch random fact from API
function getJoke() {
  $fact.textContent = "Loading";
  return fetch(`${API_URL}`)
    .then((res) => res.json())
    .then((fact) => showFact(fact));

  var myHeaders = new Headers();
  myHeaders.append("GET", "https://api.jokes.one/jod?category=animal", true);
  myHeaders.append("Content-type", application / json);
  myHeaders.append("X-JokesOne-Api-Secret", "Your API here");

  console.log(getJoke);
}

// Display joke into <p> tag
function showJoke(joke) {
  $jokeContainer.textContent = "";
  const $JokeFragment = document.createDocumentFragment();
  facts.forEach((joke) => $jokeFragment.appendChild(getJokeElement(joke)));
  $jokeContainer.appendChild($jokeFragment);
}

// Toggle the disabled attribute of a button
function toggleButton($button) {
  $button.disabled = !$button.disabled;
}
