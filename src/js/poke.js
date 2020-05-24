const apiData = {
  url: "https://pokeapi.co/api/v2/",
  type: "pokemon",
  id: "25"
};

const { url, type, id } = apiData;

const apiUrl = `${url}${type}/${id}`;

fetch(apiUrl)
  .then(data => {
    if (data.ok) {
      return data.json();
    }
    throw new Error("Response not ok.");
  })
  .then(pokemon => generateHtml(pokemon))
  .catch(error => console.error("Error:", error));

const generateHtml = data => {
  console.log(data);
  const html = `
        <div class="name">${data.name}</div>
        <img src=${data.sprites.front_default}>
        <div class="details">
            <span>Height: ${data.height}</span>
            <span>Weight: ${data.weight}</span>
        </div>
    `;
  const $POKEIMG = document.getElementById("pokeimg");
  $POKEIMG.src = data.sprites.front_default;

  // const pokemonDiv = document.querySelector(".pokemon");
  // pokemonDiv.innerHTML = html;
};
