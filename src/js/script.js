const API_URL = 'http://newsapi.org/v2/top-headlines?';

const $articles = document.getElementById("articles");
const $langue = document.getElementById("langue");
const $documentFragment = document.createDocumentFragment();



document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault();
    getAPI()
});

function getUrl() {
    return 'http://newsapi.org/v2/top-headlines?' +
        `country=${getSelectedlanguage()}&` +
        'apiKey=22b60a92c33b41d29c5931d3c7be8ae0';;
}

function getSelectedlanguage() {
    return $langue.value;
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function getAPI() {
    fetch(getUrl())
        .then(function (response) {
            response.json()
                .then(function (reponse) {
                    reponse.articles.forEach(function (article) {
                        let li = createNode('li'),
                            h1 = createNode('h1'),
                            img = createNode('img'),
                            desc = createNode('p'),
                            date = createNode('p'),
                            author = createNode('p');

                        h1.className = ('article__h1');
                        img.className = ('article__img');
                        desc.className = ('article__desc');
                        date.className = ('article__date');
                        author.className = ('article__author');

                        h1.innerHTML = article.title;
                        img.src = article.urlToImage
                        desc.innerHTML = article.description;
                        date.innerHTML = article.publishedAt;
                        author.innerHTML = article.author;

                        append(li, h1);
                        append(li, img);
                        append(li, desc);
                        append(li, date);
                        append(li, author);
                        $documentFragment.appendChild(li)
                    });
                    $articles.appendChild($documentFragment);
                });
        })
}


if (window.location.href.indexOf("infos.html") > -1) {
    getAPI()
}