const API_URL = 'https://dog.ceo/api';
const $showButton = document.getElementById('showButton');
const $photosContainer = document.getElementById('photosContainer');
const $randomButton = document.getElementById('randomButton');



function getPhotos() {
  $photosContainer.textContent = "chargement de l'image";

  return fetch(getPhotosUrl())
    .then(res => res.json())
    .then(photo => showPhotos(photo));
}


function getPhotosUrl() {
  return `${API_URL}/breed/${getSelectedBreeds()}/images/random`;
}


function showPhotos(photo) {
  $photosContainer.appendChild(getPhotoElement(photo));
  return getPhotoElement();

}

function getPhotoElement(photo) {
  const $photo = createElement({type: 'article'});
    
  createElement({type: 'img', img: photo.text, parent: $photo});

    
  return $photo;
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


function getSelectedBreeds() {
  return document.querySelector('input[name="breeds"]:checked').value;
}

$showButton.addEventListener('click', () => {
  toggleButton($showButton);
  getPhotos().then(() => toggleButton($showButton)); 
});

function randomPhoto(){
  return `${API_URL}/breeds/image/random`;
}

$randomButton.addEventListener('click', () => {
  toggleButton($randomButton);
  getPhotos().then(() => toggleButton($randomButton)); 
});