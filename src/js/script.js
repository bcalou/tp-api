/**Doc API:
 * Everything : ?q=word + &language=
 */

	const valid = document.getElementById("val").addEventListener("click", function () {
			var searchs = document.getElementsByClassName("search")[0].value;
			const apiEveryThing = "http://newsapi.org/v2/everything";
			const sort = "popularity";
			const lang = "fr";
			var requestSearch = encodeURI(searchs);
			const apiKey = "apiKey=d182478c672e466298066e128a76e0bd";
			const $articleContainer = document.getElementsByClassName("articleContainer")[0];

			fetch(
				`${apiEveryThing}?q=${requestSearch}&language=${lang}&sortBy=${sort}&pageSize=10&page=1&${apiKey}`
			)
				.then((data) => data.json())
				.then((response) => {
					console.log(response);
					var status = response.status;
					if (status !== "error") {
						var articles = response.articles;

						//Save value for each article
						articles.forEach((response) => {
							if (response.urlToImage !== "null")
							var image = response.urlToImage;
							else
							var image = "../asset/media/no-image-available.jpg";
							var source = response.source.name;
							var title = response.title;
							var description = response.description;
							var url = response.url;

						//Create container and html element for each article
							var div = $articleContainer.appendChild(document.createElement("div"));
							var link = div.appendChild(document.createElement("a"));
							var hOne = div.appendChild(document.createElement("h1"));
							var img = div.appendChild(document.createElement("img"));
							var article = div.appendChild(document.createElement("ul"));
							var articleContent = article.appendChild(document.createElement("li"));
							var newspaper = article.appendChild(document.createElement("li"));

							//Check if we have a title
							if (title !== "undefined") {
								link.setAttribute = ('href', `"${url}"`);
								img.setAttribute = ('src', `"${image}"`);
								link.href = `${url}`;
								hOne.textContent += `${title}`;
								img.src = `${image}`;
								articleContent.textContent += `${description}`;
								newspaper.textContent += `${source}`;
								link.appendChild(hOne);
								link.appendChild(img);
								}
						});
					}
				});
		});

