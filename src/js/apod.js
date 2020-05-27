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
    const $date = apod.date;
    const $author = apod.copyright;
    
    document.getElementById('description').innerHTML = $description;
    document.getElementById('date').innerHTML = $date;
    document.getElementById('image').src = $image;
    document.getElementById('title').innerHTML = $title;
    document.getElementById('author').innerHTML = `author: ${copyright}`;
  }));
});