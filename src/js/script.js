/**Doc API:
 * Everything : ?q=word + &language=
 */
const placeholderimage = require("../asset/media/no-image-available.jpg");

document.getElementById("form-search").addEventListener("submit", (e) => {
	e.preventDefault();
	const API_EVERYTHING = "http://newsapi.org/v2/everything";

	const params = {
		sortBy: "popularity",
		language: "fr",
		apiKey: "d182478c672e466298066e128a76e0bd",
		pageSize: 10,
		page: 1,
		q: encodeURI(document.querySelector(".search").value),
	};

	const paramsObject = new URLSearchParams();

	for (key in params) {
		paramsObject.append(key, params[key]);
	}

	fetch(`${API_EVERYTHING}?${paramsObject.toString()}`)
		.then((data) => data.json())
		.then((response) => {
			console.log(response);
			let status = response.status;
			var articles = status ? response.articles : noContent();

			//Save value for each article
			articles.forEach((response) => {
				document
					.querySelector(".articleContainer")
					.appendChild(renderArticle(response));
			});
		});
});

function noContent() {
	hOne.textContent += "Articles correspondants : 0";
	return [];
}

const renderArticle = ({ title, source, description, url, urlToImage }) => {
	var image = urlToImage || placeholderimage;
	var article = document.createElement("article");
	var link = article.appendChild(document.createElement("a"));
	var hOne = article.appendChild(document.createElement("h1"));
	var img = article.appendChild(document.createElement("img"));
	var $description = article.appendChild(document.createElement("ul"));
	var articleContent = $description.appendChild(document.createElement("li"));
	var newspaper = $description.appendChild(document.createElement("li"));

	link.setAttribute("href", url);
	img.setAttribute("src", image);
	link.href = url;
	hOne.textContent += title;
	img.src = image;
	articleContent.textContent += description;
	newspaper.textContent += source.name;
	link.appendChild(hOne);
	link.appendChild(img);
	return article;
};
