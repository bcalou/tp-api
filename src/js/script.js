document.getElementById("getText").addEventListener("click", getHouse);
document.getElementById("getUsers").addEventListener("click", getSpells);
document.getElementById("getPosts").addEventListener("click", getCharacters);
// document.getElementById("addPost").addEventListener("submit", addPost);
const container = document.getElementById("container");

API_URL = "https://www.potterapi.com/v1/";
API_KEY = "/?key=$2a$10$ic.wdemGvyXtUA5jugCjreRaG1HZKSuT3wLAia24ElmSuCFyUo3Xq";

function getHouse() {
	fetch(API_URL + "sortingHat")
		.then((response) => response.json())
		.then((data) => {
			let txt = (document.getElementById("outpout").innerHTML =
				"Tu es.. " + data);
			let house = data;
			if (house === "Gryffindor") {
				container.style.backgroundColor = "#7f0909";
			} else if (house === "Ravenclaw") {
				container.style.backgroundColor = "#946B2D";
			} else if (house === "Slytherin") {
				container.style.backgroundColor = "#0d6217";
			} else {
				container.style.backgroundColor = "#EEE117";
			}
		});
}

function getSpells() {
	fetch(API_URL + "spells" + API_KEY)
		.then((response) => response.json())
		.then((data) => {
			let outpout = '<h2 class="mb-4">Tu trouveras ici la liste des sorts</h2>';

			data.forEach(function (spells) {
				outpout += `<ul class="list-group mb-3">
				<li class="list-group-item">Nom : ${spells.spell}</li>
				<li class="list-group-item">Effet : ${spells.effect}</li>
				<li class="list-group-item">Type : ${spells.type}</li>
				</ul>`;
			});

			document.getElementById("outpout").innerHTML = outpout;
		});
}

function getCharacters() {
	fetch(API_URL + "characters" + API_KEY)
		.then((response) => response.json())
		.then((data) => {
			let outpout = '<h2 class="mb-4">La liste de tous les élèves</h2>';
			console.log(data);
			data.forEach(function (character) {
				outpout += `
				<div class="card card-body mb-3>
				<h3>${character.name}</h3>
				<p>${character.house}</p>
				</div>`;
			});
			document.getElementById("outpout").innerHTML = outpout;
		});
}
