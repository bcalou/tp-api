const jokeForm = document.getElementById("jokeForm");
const jokeText = document.getElementById("jokeText");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
jokeForm.addEventListener("submit", e => {
  e.preventDefault();
  getNames(e.target);
});

function getJokes(firstName, lastName) {
  fetch(
    `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`
  )
    .then(res => res.json())
    .then(data => seeJoke(data))
    .catch(error => console.log(error));
}
function getNames(form) {
  const firstName = form.querySelector("#firstName").value;
  const lastName = form.querySelector("#lastName").value;
  getJokes(firstName, lastName);
}
function seeJoke(data) {
  jokeText.innerText = data.value.joke;
}

