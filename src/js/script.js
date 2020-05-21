//console.log("Hello world");

const $img = document.getElementById('img_cat');
const $generatorBtn = document.querySelector('button');
const $imgIsNotLoad = document.getElementById('error');


const API_URL = "https://api.thecatapi.com/v1/images/search?0d04fbac-a247-4355-8c55-ce3950eacc48";

const API_KEY = "0d04fbac-a247-4355-8c55-ce3950eacc48";

const loadFetch = fetch(API_URL)
  .then(res => {
    if (res.ok) {
      console.log(res);

      res.json().then(data => {
        $img.src = data[0].url
      })
    } else {
      console.log(error);
      $imgIsNotLoad.innerHTML = "le chat joue à cat-cache.."
    }
  });

$generatorBtn.addEventListener("click", (e) => {
  getFactUrl()
})


function getFactUrl() {
  return loadFetch;
}