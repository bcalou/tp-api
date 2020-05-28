const apiurl = 'https://api.chucknorris.io/jokes/random';
const $container= document.getElementById("Container")
const $button = document.querySelector(".button")


function getjokes(){
    $container.textContent= 'Chargement...'
return fetch(`${apiurl}`)
.then(response =>response.json())
.then(jokes => showjokes(jokes))
}
getjokes()



 function showjokes(jokes) {
     $container.textContent= '';
     // create a new div element 
  var newDiv = document.createElement("div"); 
  // and give it some content 
  var newContent = document.createTextNode(jokes.value); 
  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM 
  var currentDiv = $container
  document.body.insertBefore(newDiv, currentDiv);

 }

 $button.addEventListener("click", function(){
     getjokes()
     showjokes()
 })