const API_URL = "https://sv443.net/jokeapi/v2/joke/";

const $factButton = document.getElementById("factButton");
const $factsContainer = document.getElementById("factsContainer");

// $factButton.addEventListener("click", () => {
//   fetch(`${API_URL}?type=single`)
//     .then(res => res.json())
//     .then(res => ($factsContainer.textContent = res.joke));
// });
// $factButton.addEventListener("click", () => {
//   fetch(`${API_URL}Any?blacklistFlags=${value}`)
//     .then(res => res.json())
//     .then(res => ($factsContainer.textContent = res.joke));
//   let blackListValue = document.querySelectorAll(
//     'input[name="blackList"]:checked'
//   );
//   blackListValue.forEach(element => {
//     let value = element.value;
//   });
// });

function getSelectedFlag() {
  document
    .querySelectorAll('input[name="blackList"]:checked')
    .forEach(element => {
      return element.value;
      console.log(element.value);
    });
}

$factButton.addEventListener("click", () => {
  fetch(`${API_URL}Any?blacklistFlags=nsfw`)
    .then(res => res.json())
    .then(res => ($factsContainer.textContent = console.log(res)));
  getSelectedFlag();
});
