mage = document.getElementById('image');

const axios = require('axios');
var movieTitle = document.getElementById('movieTitle');

 document.getElementById('searchBtn').addEventListener('click',function(){
    var searchMovie = movieTitle.value
    movieTitle.value = ""
//     axios.get(`http://www.omdbapi.com/?t=${searchMovie}&apikey=78d6e3b3`)
// .then(function(response){
//     console.log(response);
//     image.src = response.data.Poster;
// })
// .catch(function(error){
//     console.error(error);
// });
    fetch (`http://www.omdbapi.com/?t=${searchMovie}&apikey=78d6e3b3`)
    .then(function(response) {
        return response.json()
    })
    .then(function(response){
        console.log(response);
        image.src = response.Poster;
        
    })

})
