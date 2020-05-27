//JS du codepen du prof (boutons ?)

const API_URL = "https://api.chucknorris.io/jokes";

const $randomJokeButton = document.getElementById("randomJokeButton");
const $jokeButton = document.getElementById("jokeButton");
const $jokeContainer = document.getElementById("jokeContainer");

// Fetch random fact from API
function getJoke() {
  $jokeContainer.textContent = "Chargement en cours";

  return fetch(getFactsUrl())
    .then(res => res.json())
    .then(facts => showFacts(facts));
}

// Include parameters inside the API url
function getRandomJokeUrl() {
  return `${API_URL}/random`;
}

function getCategoryJokeUrl() {
  return `${API_URL}/jokes/random?category=${getSelectedCategory}`;
}

//function getCategoryJokeUrl() {
//  return `${API_URL}/facts/random?animal_type=${getSelectedAnimal()}&amount=${NUMBER_OF_FACTS}`;
//}

// Display fact into <p> tag
function showFacts(facts) {
  $factsContainer.textContent = "";

  const $factsFragment = document.createDocumentFragment();

  facts.forEach(fact => $factsFragment.appendChild(getFactElement(fact)));

  $factsContainer.appendChild($factsFragment);
}

// Generate a fact element from a fact object
function getFactElement(fact) {
  const $fact = createElement({ type: "article" });

  createElement({ type: "p", text: fact.text, parent: $fact });

  const updatedAt = new Date(fact.updatedAt).toLocaleString();
  const $updatedAt = createElement({
    type: "time",
    text: updatedAt,
    parent: $fact
  });
  $updatedAt.setAttribute("datetime", fact.updatedAt);

  return $fact;
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
function getSelectedAnimal() {
  return document.getElementbyId('select[name="blague"]').option;
}

//document.getElementById('liste').value;

$factButton.addEventListener("click", () => {
  toggleButton($factButton);
  getFacts().then(() => toggleButton($factButton));
});
