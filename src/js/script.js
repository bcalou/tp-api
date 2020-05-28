const API_URL = 'https://api.chucknorris.io';

const $jokeButton = document.getElementById('jokeButton');
const $randomJokeButton = document.getElementById('randomJokeButton')
const $jokesContainer = document.getElementById('jokesContainer');


//joke par categories

function getJokes() {
  
  return fetch(getJokesUrl())
    .then(res => res.json())
    .then(joke => showJokes(joke));
}


function getJokesUrl() {
  return `${API_URL}/jokes/random?category=${getSelectedCategories()}`;
}



function showJokes(joke) {
  $jokesContainer.appendChild(getJokeElement(joke));

  return getJokeElement(joke);
}



function getJokeElement(joke) {
  const $joke = createElement({type: 'article'});
  
  createElement({type: 'p', text: joke.value, parent: $joke});
  
  return $joke;
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


function getSelectedCategories() {
  return document.querySelector('input[name="categorie"]:checked').value;
}

$jokeButton.addEventListener('click', () => {
  toggleButton($jokeButton);
  getJokes().then(() => toggleButton($jokeButton)); 
});



//random joke


/* function getRandomJokes() {
  
  return fetch(getRandomJokesUrl())
    .then(res => res.json())
    .then(joke => showRandomJokes(joke));
}


function getRandomJokesUrl() {
  return `${API_URL}/jokes/random`;
}



function showRandomJokes(joke) {
  $jokesContainer.appendChild(getRandomJokeElement(joke));

  return getRandomJokeElement(joke);
}



function getRandomJokeElement(joke) {
  const $joke = createElement({type: 'article'});
  
  createElement({type: 'p', text: joke.value, parent: $joke});
  
  return $joke;
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
} */