

/** Doc API:
 *  Everything : ?q=word + &language= + &sort= + &pageSize= + &page= + Apikey
 * 
 * TODO: Remove previous article if new search, actually don't work.
 */

const placeholderimage = require("../asset/media/no-image-available.jpg");

document.getElementById("form-search").addEventListener("submit", (e) => {
  e.preventDefault();
  removeArticle();

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
      let totalResult = response.totalResults;
			var articles = (totalResult > 1) ? response.articles : noContent();

			//Save value for each article
			articles.forEach((response) => {
				document.querySelector(".articleContainer").appendChild(renderArticle(response));
			});
		});
});

function noContent() {
  let resultNone = document.querySelector(".articleContainer").appendChild(document.createElement("h1")); 
  resultNone.textContent += "Articles correspondants : 0";
	return [];
}

const renderArticle = ({ title, source, description, url, urlToImage }) => {

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
  var image = urlToImage || placeholderimage;
	img.src = image;
	articleContent.textContent += description;
	newspaper.textContent += source.name;
	link.appendChild(hOne);
  link.appendChild(img);
	return article;
};

function removeArticle(){ 
  document.querySelector(".articleContainer").innerHTML = "";
}