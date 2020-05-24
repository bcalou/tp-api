const $FORMNAME = document.querySelectorAll(".formName input");
const $FINDNAME = document.querySelector(".findName");
const $POKENAME = document.querySelector(".pokeTitle");
const $POKEIMG = document.getElementById("pokeimg");

$FINDNAME.addEventListener("click", () => {
  const apiData = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon"
  };

  const { url, type } = apiData;

  const apiUrl = `${url}${type}/${$FORMNAME[0].value}`;

  fetch(apiUrl)
    .then(data => {
      if (data.ok) {
        return data.json();
      }
      throw new Error("Response not ok.");
    })
    .then(pokemon => generateHtml(pokemon))
    .catch(error => catcherror());

  const generateHtml = data => {
    $POKENAME.innerHTML = data.name;
    $POKEIMG.src = data.sprites.front_default;
  };
  const catcherror = () => {
    $POKENAME.innerHTML = "Ce pokémon n'existe pas";
    $POKEIMG.src =
      "https://image.noelshack.com/fichiers-md/2015/07/1423868157-3697-card-communaute.png";
    $POKEIMG.style.width = "150px";
  };
  $FORMNAME[0].value = "";
});

window.addEventListener("click", () => {
  document.querySelector(".pokedex-right-front").classList.add("hideFront");
  document.querySelector(".pokedex-right-back").classList.add("showBack");
});
