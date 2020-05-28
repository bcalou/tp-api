const API_URL = "https://sv443.net/jokeapi/v2/joke/";

const $factButton = document.getElementById("factButton");
const $factsContainer = document.getElementById("factsContainer");

function getSelectedFlag() {
  document
    .querySelectorAll('input[name="blackList"]:checked')
    .forEach(element => {
      return element.value;
    });
}

$factButton.addEventListener("click", () => {
  fetch(`${API_URL}Any?blacklistFlags=${getSelectedFlag()}`)
    .then(res => res.json())
    .then(res => ($factsContainer.textContent = console.log(res)));
  getSelectedFlag();
});
