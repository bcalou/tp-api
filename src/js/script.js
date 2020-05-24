/* const apiKey = 'd9cc2a498a814a236ed258184dbc142d';
const apiURL = 'http://api.openweathermap.org/data/2.5/weather';
const $metButton = document.getElementById('metButton');
const $result = document.getElementById('result');


function getMeteo(){
    fetch(getMeteoURL()) 
    .then(res => 
        {console.log(res.data)
    })
} 

function getMeteoURL() {
    return `${apiURL}?q=Paris&appid=${apiKey}`;
}


$metButton.addEventListener('click', function() {
    $result.innerHTML = "data"
}); */

/* const apiURL = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS() {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
}

getISS(); */

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

const apiURL= 'https://api.lyrics.ovh';

//Ajout d'un listener au form
form.addEventListener('submit', e=>{
    e.preventDefault();
    searchValue = search.value.trim();

    //On regarde si la valeur est null ou non
    if (!searchValue){
        alert('Je suis pas magicien, si y\'a rien à chercher, je peux rien trouver^^')
    }
    else {
        searchSong(searchValue)
    }
})

//Rechercher une zik
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();

    showData(data)
}

//Update du DOM
function showData(data){
    result.innerHTML =`
    <ul class="song-list">
    ${data.data.map(song=> `<li>
                                <div>
                                    <srong>
                                    ${song.artist.name}
                                    </strong> -${song.title}
                                </div>
                                <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                                    Les paroles
                                </span>
                            </li>
    `).join('')
    }
    </ul>`
}

//Ajout d'un listener au lyrics button
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    //On vérifie si l'élément est un button ou non
    if(clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})

//Afficher les paroles
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>
                                ${artist}
                            </strong> -${songTitle}
                        </h2>
                        <p> ${lyrics}</p>
                       `
}