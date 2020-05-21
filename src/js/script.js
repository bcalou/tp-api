const axios = require('axios');
const url = "https://api.meteo-concept.com";
const token = "360a41dc9441500f04c3af5fe07aecbf9b0a04f35c4c46cb25cb14e93899215b";
const nuage = "data:image/jpeg;base64,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";
const sun = "https://resize.programme-television.ladmedia.fr/rcrop/1200,/img/var/premiere/storage/images/tele-7-jours/news-tv/non-le-bebe-soleil-des-teletubbies-n-a-pas-eu-de-bebe-4643630/95608730-1-fre-FR/Non-le-bebe-soleil-des-Teletubbies-n-a-pas-eu-de-bebe.jpg";

const image = document.getElementById("image");
document.getElementById("go").addEventListener("click",() => {
const selection = document.getElementById("selection");
const day = selection.options[selection.selectedIndex].value;
    axios({
        method:"get",
        url: `${url}/api/forecast/daily/${day}`,
        params: {
            token,
            insee: 75101
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