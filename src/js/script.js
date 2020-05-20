const search= document.getElementsByClassName('search')[0];
console.log(search, 'coucou')




const apiUrl = "http://newsapi.org/v2/top-headlines";

const apiKey = "apiKey=d182478c672e466298066e128a76e0bd";

fetch(`${apiUrl}?country=fr&${apiKey}`)
.then((response) => {

})
