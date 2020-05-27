const search = document.getElementById("search");
const API_URL_searchLomepal = "https://api.deezer.com/search?q=lomepal";
const Artist_Lomepal = "https://api.deezer.com/artist/27";
const Artist_picture = "https://api.deezer.com/editorial";
// _____________________________________________________________________________________________________________
const $factButton = document.getElementById("search");
const $Container = document.getElementById("factsContainer");
const $artiste = document.getElementById("artists");

function getFactsUrl() {
  return `${API_URL_searchLomepal}`;
}

function toggleButton($button) {
  $button.disabled = !$button.disabled;
}

function getSelectedArtist() {
  return document.querySelector('input[name="animal"]:checked').value;
}

function showFacts(facts) {
  $Container.textContent = "";
  facts.data.forEach((fact) => {
    // image
    $fact = document.createElement("img.artist__img");
    $fact.setAttribute("src", `${facts.picture}`);
    $Container.appendChild($fact);
    // Nom de l'artiste
    $fact = document.createElement("a");
    $fact.innertHTML = Artist_Lomepal.name;
    $Container.appendChild($fact);
  });
}

function getFacts() {
  $Container.textContent = "Chargement en cours...";

  return fetch(getFactsUrl())
    .then((res) => res.json())
    .then((facts) => showFacts(facts));
}

search.addEventListener("click", function () {
  toggleButton(search);
  getFacts().then(() => toggleButton(search));
});

$artiste.addEventListener("click", function () {
  toggleButton(Artist_Lomepal);
  getFacts().then(() => toggleButton(Artist_Lomepal));
});
