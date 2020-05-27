const $FORMNAME = document.querySelectorAll(".formName input");
const $FINDNAME = document.querySelector(".findName");

const $POKENAME = document.querySelector(".pokeTitle");
const $POKEIMG = document.getElementById("pokeimg");
const $POKEDESCRIP = document.getElementById("description");

$FINDNAME.addEventListener("click", () => {
  const apiData = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon"
  };

  const { url, type, form } = apiData;

  const apiPoke = `${url}${type}/${$FORMNAME[0].value}`;

  // CALL THE POKEMON LIST API ( GET METHOD BY DEFAULT)
  fetch(apiPoke)
    .then(data => {
      if (data.ok) {
        return data.json();
      }
      throw new Error("Response not ok.");
    })
    .then(pokemon => generateHtml(pokemon))
    .catch(error => catcherror());

  // GENERATE HTML FROM THE API

  const generateHtml = data => {
    $POKENAME.innerHTML = data.name;
    $POKEIMG.src = data.sprites.front_default;

    let html = `
          <div class="pokeStats">
          <div class="pokeId"> Id : ${data.id} </div>
          <div class="pokeName"> Name : ${data.name} </div>
          <div class="pokeHeight"> Height : ${data.height} </div>
          <div class="pokeWeight"> Weight : ${data.weight} </div>
          </div>
          <button id="seeStats" class="seeStats">Voir la description</button>
        </form>
    `;
    $POKEDESCRIP.innerHTML = html;
  };

  // CATCH THE CASE WHERE THE POKEMON ISNT FIND IN THE API
  const catcherror = () => {
    $POKENAME.innerHTML = "Ce pokémon n'existe pas";
    $POKEIMG.src =
      "https://image.noelshack.com/fichiers-md/2015/07/1423868157-3697-card-communaute.png";
    $POKEIMG.style.width = "150px";
  };
  $FORMNAME[0].value = "";

  const $FINSDESCRIP = document.getElementById("seeStats");

  $FINSDESCRIP.addEventListener("click", () => {
    console.log("it inzkn");
  });
});

window.addEventListener("click", () => {
  document.querySelector(".pokedex-right-front").classList.add("hideFront");
  document.querySelector(".pokedex-right-back").classList.add("showBack");
});
