//Requêtes des blagues

{
  "categories": [
      "Aveugles"
  ],
  "created_at": "2020-01-05 13:42:18.823766",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "tnsit4iqsk2fe7ohwk1qgq",
  "updated_at": "2020-01-05 13:42:18.823766",
  "url": "https://api.chucknorris.io/jokes/tnsit4iqsk2fe7ohwk1qgq",
  "value": "Qu'est-ce qu'une manifestation d'aveugles ? Un festival de Cannes."
}

{
  "categories": [
      "Cochons"
  ],
  "created_at": "2020-01-05 13:42:18.823766",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "tnsit4iqsk2fe7ohwk1qgq",
  "updated_at": "2020-01-05 13:42:18.823766",
  "url": "https://api.chucknorris.io/jokes/tnsit4iqsk2fe7ohwk1qgq",
  "value": "Qu’est qu’un cochon qui rit ? Un porc tout gai."
}

{
  "categories": [
      "Français"
  ],
  "created_at": "2020-01-05 13:42:18.823766",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "tnsit4iqsk2fe7ohwk1qgq",
  "updated_at": "2020-01-05 13:42:18.823766",
  "url": "https://api.chucknorris.io/jokes/tnsit4iqsk2fe7ohwk1qgq",
  "value": "Pourquoi les Français ont-ils le dos qui pue ? A force de péter plus haut que leur c*l."
}

{
  "categories": [
      "Fumeurs"
  ],
  "created_at": "2020-01-05 13:42:18.823766",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "tnsit4iqsk2fe7ohwk1qgq",
  "updated_at": "2020-01-05 13:42:18.823766",
  "url": "https://api.chucknorris.io/jokes/tnsit4iqsk2fe7ohwk1qgq",
  "value": "Quel est la date de la fête des fumeurs ? Le 1er juin."
}

{
  "categories": [
      "Nains"
  ],
  "created_at": "2020-01-05 13:42:18.823766",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "tnsit4iqsk2fe7ohwk1qgq",
  "updated_at": "2020-01-05 13:42:18.823766",
  "url": "https://api.chucknorris.io/jokes/tnsit4iqsk2fe7ohwk1qgq",
  "value": "Qu'est ce qu'un nain obsédé ? Un nain phomane."
}

{
  "categories": [
      "Parigos"
  ],
  "created_at": "2020-01-05 13:42:18.823766",
  "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
  "id": "tnsit4iqsk2fe7ohwk1qgq",
  "updated_at": "2020-01-05 13:42:18.823766",
  "url": "https://api.chucknorris.io/jokes/tnsit4iqsk2fe7ohwk1qgq",
  "value": "Comment appelle-t-on une personne agréable à Paris ? Un touriste."
}

//JS du codepen du prof (boutons ?)

const API_URL = 'https://cat-fact.herokuapp.com';
const NUMBER_OF_FACTS = 3;

const $factButton = document.getElementById('factButton');
const $factsContainer = document.getElementById('factsContainer');

// Fetch random fact from API
function getFacts() {
  $factsContainer.textContent = 'Chargement en cours';

  return fetch(getFactsUrl())
    .then(res => res.json())
    .then(facts => showFacts(facts));
}

// Include parameters inside the API url
function getFactsUrl() {
  return `${API_URL}/facts/random?animal_type=${getSelectedAnimal()}&amount=${NUMBER_OF_FACTS}`;
}

// Display fact into <p> tag
function showFacts(facts) {
  $factsContainer.textContent = '';
  
  const $factsFragment = document.createDocumentFragment();
  
  facts.forEach(fact => $factsFragment.appendChild(getFactElement(fact)));
    
  $factsContainer.appendChild($factsFragment);
}

// Generate a fact element from a fact object
function getFactElement(fact) {
  const $fact = createElement({type: 'article'});
    
  createElement({type: 'p', text: fact.text, parent: $fact});

  const updatedAt = new Date(fact.updatedAt).toLocaleString();
  const $updatedAt = createElement({
    type: 'time',
    text: updatedAt,
    parent: $fact
  });
  $updatedAt.setAttribute('datetime', fact.updatedAt);
    
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
  return document.querySelector('input[name="animal"]:checked').value;
}

$factButton.addEventListener('click', () => {
  toggleButton($factButton);
  getFacts().then(() => toggleButton($factButton)); 
});


