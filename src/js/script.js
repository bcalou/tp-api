document.getElementById("getText").addEventListener("click", getText);
document.getElementById("getUsers").addEventListener("click", getUsers);
document.getElementById("getPosts").addEventListener("click", getPosts);
// document.getElementById("addPost").addEventListener("submit", addPost);

API_URL = "https://www.potterapi.com/v1/";
function getText() {
	fetch(API_URL + "sortingHat")
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("outpout").innerHTML = "Tu es.. " + data;
		});

	console.log(123);
}

function getUsers() {
	fetch(
		"https://www.potterapi.com/v1/spells?key=$2a$10$ic.wdemGvyXtUA5jugCjreRaG1HZKSuT3wLAia24ElmSuCFyUo3Xq"
	)
		.then((response) => response.json())
		.then((data) => {
			let outpout = '<h2 class="mb-4">Tu trouveras ici la liste des sorts</h2>';
			data.forEach(function (user) {
				outpout += `<ul class="list-group mb-3">
				<li class="list-group-item">Nom : ${user.spell}</li>
				<li class="list-group-item">Effet : ${user.effect}</li>
				<li class="list-group-item">Type : ${user.type}</li>
				</ul>`;
			});
			document.getElementById("outpout").innerHTML = outpout;
		});
}

function getPosts() {
	fetch(
		"https://www.potterapi.com/v1/characters?key=$2a$10$ic.wdemGvyXtUA5jugCjreRaG1HZKSuT3wLAia24ElmSuCFyUo3Xq"
	)
		.then((response) => response.json())
		.then((data) => {
			let outpout = '<h2 class="mb-4">La liste de tous les élèves</h2>';
			console.log(data);
			data.forEach(function (post) {
				outpout += `
				<div class="card card-body mb-3>
				<h3>${post.name}</h3>
				<p>${post.house}</p>
				</div>`;
			});
			document.getElementById("outpout").innerHTML = outpout;
		});
}
