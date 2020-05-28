const API_URL = 'https://dog.ceo/api';
const $showButton = document.getElementById('showButton');
const $photosContainer = document.getElementById('photosContainer');
const $randomButton = document.getElementById('randomButton');
const $img = createElement({ type: 'img', parent: $photo });
const $photo = createElement({type: 'article'});
const $formButton = document.getElementById('formButton');
const $form = document.getElementById('formBreeds');


//by breeds
function getPhotos() {
  $photosContainer.textContent = "chargement de l'image";

  return fetch(getPhotosUrl())
    .then(res => res.json())
    .then(photo => showPhotos(photo));
}


function getPhotosUrl() {
  return `${API_URL}/breed/${getSelectedBreeds()}/images/random`;
}

//random 
function getPhotosUrlRandom() {
  return `${API_URL}/breeds/image/random`;
}
function getPhotosRandom() {
  $photosContainer.textContent = "chargement de l'image";

  return fetch(getPhotosUrlRandom())
  .then(res => res.json())
  .then(photo => showPhotos(photo));
}


function showPhotos(photo) {
  $photosContainer.appendChild(getPhotoElement());
  return getPhotoElement();

}


function getPhotoElement(photo) {
  const $img = createElement({ type: 'img', parent: $photo });
  $img.src = photo.message;

  return $img
}



function createElement(photo) {
  
  console.log("ça marche !")
  if (photo.parent) {
    $photo.textContent = photo.message;  
  }
  
  if (photo.parent) {
    options.parent.appendChild($element);
  }
  return $photo;
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

$randomButton.addEventListener('click',() => {
  toggleButton($randomButton);
  getPhotosRandom().then(() => toggleButton($randomButton));
});


$formButton.addEventListener('click', () => {
  if(getComputedStyle($form).display != "none"){
    $form.style.display = "none";
    $formButton.innerHTML = "Afficher les races";
    $showButton.style.display="none";
  } else {
    $form.style.display = "block";
    $formButton.innerHTML = "Masquer les races";
    $showButton.style.display="block";
  }
})

