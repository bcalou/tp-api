//console.log("Hello world");

const $img = document.getElementById('img_cat');
const $generatorBtn = document.querySelector('button');
const $imgIsNotLoad = document.getElementById('error');
const $factsContainer = document.getElementById('factsContainer');
const $p = document.querySelector('p');


const API_URL = "https://api.thecatapi.com/v1/images/search";

const API_KEY = "0d04fbac-a247-4355-8c55-ce3950eacc48";

const mime_types = "?mime_types=gif";
const breed_ids = "?breed_ids=";

const myHeaders = new Headers();
myHeaders.append(API_KEY, "");

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

$generatorBtn.addEventListener("click", () => {
  console.log("good");
  getNewImage()
  $factsContainer.classList.add('scale__container');
})


function getNewImage() {
  const loadFetch = fetch(`${API_URL}?breed_ids=${getBreedCat()}`, requestOptions)
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          $img.src = data[0].url
        })
      } else {
        console.log(error);
        $imgIsNotLoad.innerHTML = "le chat joue à cat-cache.."
      }
    });
}

function getBreedCat() {
  return document.querySelector('input[name="breeds"]:checked').value;
}