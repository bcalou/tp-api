//function httpGet(theURL) {
//  var xmlHttp = new XMLHttpRequest();
//  xmlHttp.open("GET", theURL, false); // false for synchronous request
//  xmlHttp.send(null);
//  return xmlHttp.responseText;
//}
//
//function getRandomImage() {
//  // get the json from the server
//  var json = httpGet("https://dog.ceo/api/breeds/image/random");
//
//  // decode the json into an array
//  var array = JSON.parse(json);
//
//  // get the image url from the array
//  var url = array.message;
//
//  // get the image object
//  var image = document.getElementById("dogImage");
//
//  // set the src of the image object
//  image.src = url;
//}

const $RandomJokeButton = document.querySelector("button");
const $JokeArea = document.getElementById("jokeArea");
const API_URL = "https://api.chucknorris.io/jokes/random";

function getJoke() {
  $JokeArea.textContent = "Chargement en cours";

  return fetch(getJokeUrl())
    .then((res) => res.json())
    .then((jokes) => showJoke(jokes));
}

function getJokeUrl() {
  return `${API_URL}`;
}

function showJoke(jokes) {
  $JokeArea.textContent = "";

  const $JokeFragment = document.createDocumentFragment();

  for (let i = 0; i < jokes.length; i++) {
    let joke = jokes[i];
    (joke) => $JokeFragment.appendChild(getFactElement(jokes));
  }

  $JokeArea.appendChild($JokeFragment);
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

function toggleButton($button) {
  $button.disabled = !$button.disabled;
}
$RandomJokeButton.addEventListener("click", () => {
  toggleButton($RandomJokeButton);
  getJoke().then(() => toggleButton($RandomJokeButton));
});

function getJokeElement(joke) {
  const $joke = createElement({ type: "p" });
  createElement({ type: "article", text: jokes.value, parent: $joke });

  return $joke;
}
