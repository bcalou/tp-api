const dog_result = document.getElementById("dog_result");
const dog_btn = document.getElementById("img_btn");

function getRandomDog() {
  fetch("https://dog.ceo/api/breeds/image/random", {})
    .then((response) => response.json())
    .then((data) => {
      if (data.message.includes(".jpeg")) {
        getRandomDog();
      }
      dog_result.innerHTML = `<img src="${data.message}" alt="dogImage" />`;
    });
}

dog_btn.addEventListener("click", getRandomDog);
