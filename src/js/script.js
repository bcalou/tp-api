
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
            let response = res.age == null ? "ton prénom n'est pas connu ! " : " Voilà l'âge moyen de " + val + " dans le monde " + ": " + res.age + " ans. ";
            $responseAge.value = response;
            $responseAge.innerHTML = $responseAge.value;
        }).catch(error => console.log(error));
    $enterName.value = "";

});





