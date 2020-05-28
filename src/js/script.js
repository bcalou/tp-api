
const API_URL = "https://api.agify.io/";

const $discoverAge = document.getElementById("buttonName");
const $enterName = document.getElementById("enterName");
const $responseAge = document.getElementById("responseAge");
const $responseCount = document.getElementById("responseCount");



$discoverAge.addEventListener("click", function (e) {
    e.preventDefault();
    let val = $enterName.value.toLowerCase();
    fetch(`${API_URL}?name=${val}`)
        .then(res => res.json())
        .then(res => {
            if (val == "") {
                $responseAge.innerHTML = "Entre un nom valide !"
                $responseCount.innerHTML = "";
            } else {
                let responseAge = res.age == null ? "Ton prénom n'est pas connu ! " : " Voilà l'âge moyen de " + val + " en France " + ": " + res.age + " ans. ";
                let responseCount = "Il y a " + res.count + " " + val + " en France " + " ! ";
                $responseCount.value = responseCount;
                $responseAge.value = responseAge;
                $responseAge.innerHTML = responseAge;
                $responseCount.innerHTML = responseCount;
            }
        })
        .catch(error => console.log(error));
    $enterName.value = "";

});




