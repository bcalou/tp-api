const API_URL = "https://dog.ceo/";
const AMOUNT_OF_PICTURES = 3;

const $RandomPictureButton = document.getElementById("GetARandomPicture");
const $PicturesContainer = document.getElementById("PicturesContainer");

function getPicturesUrl() {
  return `${API_URL}/api/breeds/image/random/${AMOUNT_OF_PICTURES}`;
}
function getPictures() {
  
  return fetch(getPicturesUrl())
    .then((res) => res.json())
    .then((pictures) => showPictures(pictures));
}

function showPictures(pictures) {
	$PicturesContainer.textContent = "Chargement en cours";
	$PicturesContainer.innerHTML = "";
  getPictures

}

$RandomPictureButton.addEventListener("click", showPictures(pictures) {
  //toggleButton($RandomPictureButton);
  //getPictures().then(() => toggleButton($RandomPictureButton));
});

