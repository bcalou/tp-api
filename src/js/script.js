const jokeForm = document.getElementById("jokeForm");
const jokeText = document.getElementById("jokeText");

jokeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("clicked the button");
  const url = "https://api.icndb.com/jokes/random";
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.value.joke);
      jokeText.innerHTML = data.value.joke;
    });
});
