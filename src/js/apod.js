const key = 'yd6DZzG36dmY6bmZ4su7CGWs3OzPccnkOkCD68sN';
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

const $getApod = document.getElementById('getApod');
const $apodsContainer = document.getElementById('apodsContainer');

document.querySelector('.card-apod').style.display = "none";

fetch(API_URL)
  .then(response => {
  return response.json();
})
  .then(apod =>  {
  if ($getApod.addEventListener('click',() => {
    document.querySelector('.apodButton').style.display = "none";
    document.querySelector('.card-apod').style.display = "block";
    
    const $title = apod.title;
    const $image = apod.hdurl;
    const $description = apod.explanation;
    const $author = apod.copyright;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const $date = new Date(apod.date).toLocaleDateString(undefined, options);

    document.getElementById('description').innerHTML = $description;
    document.getElementById('date').innerHTML = $date;
    document.getElementById('image').src = $image;
    document.getElementById('title').innerHTML = $title;
    document.getElementById('author').innerHTML = `author: ${copyright}`;
  }));
});