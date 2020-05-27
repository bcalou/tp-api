/**Doc API:
 * Everything : ?q=word + &language=
 */
const $newsButton = document.getElementById("newsButton").addEventListener("click", (e) => {
	e.preventDefault();
	console.log('lol', $newsButton)
	var searchs = document.getElementsByClassName("search")[0].value;
  const placeholderimage = require("../asset/media/no-image-available.jpg");
  const apiEveryThing = "http://newsapi.org/v2/everything";
  const sort = "popularity";
  const lang = "fr";
  var requestSearch = encodeURI(searchs);
  const apiKey = "apiKey=d182478c672e466298066e128a76e0bd";
	const $articleContainer = document.getElementsByClassName("articleContainer")[0];

  fetch(`${apiEveryThing}?q=${requestSearch}&language=${lang}&sortBy=${sort}&pageSize=10&page=1&${apiKey}`)
    .then((data) => data.json())
    .then((response) => {
      console.log(response);
      let status = response.status;
      var articles = status ? response.articles : noContent();

        //Save value for each article
        articles.forEach((response) => {
          var images = (response.urlToImage ? image = response.urlToImage : image = placeholderimage);
          var sources = response.source.name;
          var titles = response.title;
          var descriptions = response.description;
          var urls = response.url;

        //Create container and html element for each article
          var article = $articleContainer.appendChild(document.createElement("article"));
          var link = article.appendChild(document.createElement("a"));
          var hOne = article.appendChild(document.createElement("h1"));
          var img = article.appendChild(document.createElement("img"));
          var description = article.appendChild(document.createElement("ul"));
          var articleContent = description.appendChild(document.createElement("li"));
          var newspaper = description.appendChild(document.createElement("li"));

          //Check if we have a title
          if (titles !== "undefined") {
            link.setAttribute = ('href', `"${urls}"`);
            img.setAttribute = ('src', `"${images}"`);
            link.href = `${urls}`;
            hOne.textContent += `${titles}`;
            img.src = `${image}`;
            articleContent.textContent += `${descriptions}`;
            newspaper.textContent += `${sources}`;
            link.appendChild(hOne);
            link.appendChild(img);
            }
        });
    });
});

function noContent(){
  hOne.textContent += `"Articles correspondants : 0"`;
}