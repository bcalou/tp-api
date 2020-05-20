//console.log("Hello world");

const API_URL = "https://api.thecatapi.com/v1/images/search";
const $img = document.getElementById('img_cat');
const $generatorBtn = document.querySelector('button');
const $imgIsNotLoad = document.getElementById('error');

console.log($imgIsNotLoad);
$generatorBtn.addEventListener("click", (e) => {
  getFactUrl()
})


function getFactUrl() {
  return fetch(API_URL)
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

}