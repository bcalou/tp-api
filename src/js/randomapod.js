const key = 'yd6DZzG36dmY6bmZ4su7CGWs3OzPccnkOkCD68sN';
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

const $getApod = document.getElementById('getApod');

document.querySelector('.card-apod').style.display = "none";

var now = new Date(); 
var min = new Date(1995, 5, 16).getTime(); 
var max = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 18, 59, 59, 999).getTime();

max = max-(5*60*60*1000);

var random_date = Math.round(min+(Math.random()*(max-min)));

var missing_min = new Date(1995, 5, 17).getTime(); 
var missing_max = new Date(1995, 5, 19, 23, 59, 59, 999).getTime(); 

while(random_date >= missing_min && random_date <= missing_max) {
	random_date = Math.round(min+(Math.random()*(max-min)));
}

random_date = new Date(random_date);
random_year = random_date.getFullYear().toString().slice(-2); 
random_month = (0+(random_date.getMonth()+1).toString()).slice(-2); 
random_day = (0+(random_date.getDate().toString())).slice(-2);

var randomDate =  random_date+random_year+random_month+random_day;
var dateReverse = new Date(randomDate).toLocaleDateString("en-US");

var orderedDate = new Date(dateReverse).toISOString("en-US").split('T', 1)[0];

const API_URL_RANDOM = `${API_URL}&date=${orderedDate}`

fetch(API_URL_RANDOM)
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
    document.getElementById('author').innerHTML = `Image Credits: ${$author}`;
  }));
});