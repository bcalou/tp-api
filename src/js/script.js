const API_URL = 'http://localhost/Api/rest-api/webdocressources';

const $articles = document.getElementById("articles");
const $langue = document.getElementById("langue");
const $popularity = document.getElementById("popularity");
const $documentFragment = document.createDocumentFragment();



fetch(API_URL)
    .then(function (response) {
        response.json()
            .then(function (value) {
                console.log(value);
                console.log(value.videoURL);
                console.log(response.videoURL);
                console.log(videoURL)
            })
    });


// if (window.location.href.indexOf("infos.html") > -1) {
//     getAPI()
// }