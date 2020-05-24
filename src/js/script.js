
//Search keyword function ***In progress*** 
var search = document.getElementsByClassName('search')[0];
search.addEventListener('keydown', function(){
var searchs = search.value; 


encodeURIComponent()

//***Key value for apicall & Dom add */
/**Doc API:
 * BreakingNews : ?country= or ?category=
 * 
 * Everything : ?q=word
 * 
 * Search : ?q=word
 * 
 */

const apiEveryThing = "http://newsapi.org/v2/everything";
const sort = "sortBy=popularity";
const lang = "language=fr";
var requestSearch = "q=" + encodeURI(searchs);
const apiKey = "apiKey=d182478c672e466298066e128a76e0bd";
const $articleContainer = document.getElementsByClassName('articleContainer')[0];

fetch(`${apiEveryThing}?${requestSearch}&${lang}&${sort}&${apiKey}`)
.then(response => response.json())
console.log(response.json(), "HELLO WOOOOOOORRRLLLDDD");
/*
.then(data => {
  
  var title = data.title;
  console.log(title, "bonjour")
  if(data.status !== null){
  console.log(title, "bonjour")
  $articleContainer.textContent = '';
  
}
})*/


})