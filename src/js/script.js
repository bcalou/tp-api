// fonction récupéré
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

var lettres_title = document.getElementById("lettres");

var lettres = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
lettres.forEach(function (lettre) {
    var lettre_content = document.createElement("a");
    lettre_content.textContent = lettre;
    lettre_content.addEventListener("click", function () {
        afficherMots(lettre);
    });
    lettres_title.appendChild(lettre_content);
    lettres_title.appendChild(document.createTextNode(" | "));
});

var motsId = document.getElementById("mots");

function afficherMots(lettre) {
    ajaxGet("https://oc-jswebsrv.herokuapp.com/api/lexique/" + lettre, function (reponse) {
        var mots = JSON.parse(reponse);
        motsId.innerHTML = "";
        if (mots.length > 0) {
            mots.forEach(function (mot) {
                var terms = document.createElement("h3");
                terms.textContent = mot.term + " :";
                var mots_definition = document.createElement("div");
                mots_definition.textContent = mot.definition;
                motsId.appendChild(terms);
                motsId.appendChild(mots_definition);
            });
        } else {
            var error = document.createElement("p");
            error.textContent = lettre + " :" +" Aucune définition n'a été trouvé"; 
            motsId.appendChild(error);
        }
    });
}