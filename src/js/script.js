const API_URL = 'https://dog.ceo/api';
const $showButton = document.getElementById('showButton');
const $photosContainer = document.getElementById('photosContainer');
const $randomButton = document.getElementById('randomButton');
const $img = createElement({ type: 'img', parent: $photo });
const $photo = createElement({type: 'article'});
const $formButton = document.getElementById('formButton');
const $form = document.getElementById('formBreeds');



function getPhotos() {
  $photosContainer.textContent = "chargement de l'image";

  return fetch(getPhotosUrl())
    .then(res => res.json())
    .then(photo => showPhotos(photo));
}


function getPhotosUrl() {
  return `${API_URL}/breed/${getSelectedBreeds()}/images/random`;
}


function showPhotos($photo) {
  $photosContainer.appendChild(getPhotoElement($photo));
  return getPhotoElement();

}

function getPhotoElement(getPhotosUrl) {
  //const $photo = createElement({type: 'article'});
    
  //createElement({type: 'img', img: photo.text, parent: $photo});
  //const $img = createElement({ type: 'img', parent: $photo });
  //$img.src = photo.message;
    
  return $img;
}



function createElement(photo) {
  //const $img = createElement({ type: 'img', parent: $photo });
  
  if (photo.img) {
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



$formButton.addEventListener('click', () => {
  if(getComputedStyle($form).display != "none"){
    $form.style.display = "none";
    $formButton.innerHTML = "afficher les races";
    $showButton.style.display="none";
  } else {
    $form.style.display = "block";
    $formButton.innerHTML = "masquer les races";
    $showButton.style.display="block";
  }
})

