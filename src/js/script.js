const axios = require('axios');
const url = "https://api.meteo-concept.com";
const token = "360a41dc9441500f04c3af5fe07aecbf9b0a04f35c4c46cb25cb14e93899215b";
const nuage = "https://img.static-rmg.be/a/view/q100/w900/h600/1961464/stranger-png.png";
const sun = "https://resize.programme-television.ladmedia.fr/rcrop/1200,/img/var/premiere/storage/images/tele-7-jours/news-tv/non-le-bebe-soleil-des-teletubbies-n-a-pas-eu-de-bebe-4643630/95608730-1-fre-FR/Non-le-bebe-soleil-des-Teletubbies-n-a-pas-eu-de-bebe.jpg";

const image = document.getElementById("image");
let communes = [];
    axios({
        method:"get",
        url: "https://geo.api.gouv.fr/communes"
    })
    .then((reponse) => {
        communes = reponse.data;
        console.log(communes);
    })
    .catch((e) => {
        console.log(e);
    })
document.getElementById("ville").addEventListener("input",(e) => {
    e.target.style.color="black";
    const liste = document.getElementById("liste");
    liste.innerHTML = "";
    if (e.target.value === ""){
        return false;
    }
    let nbCommunes = 0;
    communes.forEach((commune) => {
            if(commune.nom.match(new RegExp(`\\b^${e.target.value}.*\\b`, "i"))) {
                if( nbCommunes < 5){
                    const p = document.createElement("p");
            const text = document.createTextNode(commune.nom);
            p.appendChild(text);
            p.addEventListener('click', (event) => {
                document.getElementById('ville').value = event.target.innerHTML
            })
            liste.appendChild(p);
            nbCommunes++;
                }
            
        }
        
    })
})
document.getElementById("go").addEventListener("click",() => {
const ville = document.querySelector("#ville").value;
const city = communes.find((commune) => {
    if (commune.nom === ville){
        return true;
    }
    return false;
});
if (!city){
    document.querySelector("#ville").style.color="red";
    return false;
}
const insee = city.code
const selection = document.getElementById("selection");
const day = selection.options[selection.selectedIndex].value;
    axios({
        method:"get",
        url: `${url}/api/forecast/daily/${day}`,
        params: {
            token,
            insee
        }
    }).then((response) => {
        console.log(response.data);
        if (response.data.forecast.weather <= 9) {
            image.setAttribute("src",sun)
        } else {
            image.setAttribute("src",nuage)
        }
    }).catch((e) => {
        console.log(e);
        alert('Une erreur s\'est produite.');
    })
})