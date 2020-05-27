"use strict";

/*--------------------
Declaration of variables
--------------------*/
const keyHero = "3112103485518906";
const $input = document.querySelector(".searchForm_inputContainer__input");
const urlApiHero = "https://www.superheroapi.com/api.php";
const $janeDoe = document.getElementById("anonyme");
const $back = document.querySelector(".close-icon-container");
const $panel = document.querySelector(".panel_body");
var timeout = null;
const english_french = {
  "input": "en",
  "output": "fr"
}

/*--------------------
drive events
--------------------*/
$input.addEventListener('keyup', function(e){
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    getApi(e,$input.value);
  }, 800);
});



/*--------------------
prime function
--------------------*/
function getApi(e,val) {
  if(e.code=="Enter"){
    e.preventDefault();
  }
  beginsearch(val);
}

/*--------------------------
sets the stage for research
----------------------------*/
function beginsearch(val) {
  const $container = document.querySelector(".container");
  if (!$container.classList.contains("top-container")) {
    $container.classList.add("top-container");
  }

  const $resultsContainer = resetResults();
  fetchResults (val,$resultsContainer);
}

/*--------------------------
Retrieves data by fetch call
----------------------------*/
function fetchResults (keywords,containerResults) {
    keywords = keywords.trim();
    
    if (!keywords.length){
      containerResults.innerHTML="";
      return;
    } 

    const url = `${urlApiHero}/${keyHero}/search/${keywords}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.response=="error"){
          ErrorMessage(keywords);
          return;
        }
        displayResults(data,containerResults,keywords);
    })
    .catch(error=>console.log(error));
}

function fetchResult (id) {

  const url = `${urlApiHero}/${keyHero}/${id}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
      displayBio(data);
  })
  .catch(error=>console.log(error));
}

/*--------------------------
Displays results on the DOM
----------------------------*/
function displayResults(data,contenair,keywords){
  const results = data.results;
  contenair.innerHTML = "";
  viewAbstract(results,contenair,keywords);
  results.forEach(result => {
    contenair.insertAdjacentHTML("beforeend",
      `<a href="#bio" class="perso" id="perso_${result.id}" data-all="${result.id}">
        <img src="${result.image.url}" alt="${result.name}" class="perso_poster" id="imgHero_${result.id}" />
        <div class="perso_title">${result.name}</div>
        <div class="perso_info">
          <span class="perso_info__length" id="edition_${result.id}"></span>
        </div>
        <div class="perso_info">
          <span class="perso_info__length ${result.biography.alignment}" id="status_${result.id}"></span>
        </div>
      </a>`
    );

    verifImage(result.image.url,$janeDoe,"imgHero_"+result.id);
    transformText(result.biography.publisher,"#edition_"+result.id,result.biography.alignment,"#status_"+result.id,result.appearance.gender);

    document.getElementById("perso_"+result.id).addEventListener("click",function(){
      $back.setAttribute("href","#perso_"+result.id);
    });
  });

  let $link = document.querySelectorAll(".perso");
  let $close = document.querySelector(".close-icon-container");
  $link.forEach(element => {
    actionClick(element,$close);
  });
  
}

function displayBio(data) {

  $panel.insertAdjacentHTML("beforeend",
  `<article class='card'>
    <div class='card_left'>
      <img src='${data.image.url}' id="imgHero">
    </div>
    <div class='card_right'>
      <h1>${data.name}</h1>
      <div class='card_right__details'>
        <ul>
          <li>Personnage appartenant à <b class="publisher"></b></li>
        </ul>
        
        <div class='card_right__review'>
          <p class="${data.biography.alignment}"></p>
          <p class="gender"></p>
          <p>Race : <span class="race"></span></p>
        </div>

        <div class="card_right__after">Informations supplémentaires</div>
       
        <div class="information">
          <div class="information_get">Alias: </div>
          <div class="information_value alias"></div>
        </div>
        <div class="information">
          <div class="information_get">De son vrai nom: </div>
          <div class="information_value full-name"></div>
        </div>
        <div class="information">
          <div class="information_get">Originaire de: </div>
          <div class="information_value origin"></div>
        </div>
        <div class="information">
          <div class="information_get">Apparence </div>
          <div class="information_value"> 
            Yeux: <span class="eye"></span>, 
            cheveux: <span class="hair"></span>, 
            taille: ${data.appearance.height[1]}, 
            poids: ${data.appearance.weight[1]}
          </div>
        </div>
        <div class="information">
          <div class="information_get">Profession: </div>
          <div class="information_value occupation"></div>
        </div>
        <div class="information">
          <div class="information_get">Base: </div>
          <div class="information_value base">${data.work.base}</div>
        </div>
        <div class="information">
          <div class="information_get">Statistiques sur le pouvoir </div>
          <div class="information_value powerstats">
            combat: ${data.powerstats.combat} , 
            pouvoir: ${data.powerstats.power} , 
            vitesse: ${data.powerstats.speed} , 
            force: ${data.powerstats.strength} , 
            résistance: ${data.powerstats.durability} , 
            intelligence: ${data.powerstats.intelligence}
          </div>
        </div>
        <div class="information">
          <div class="information_get">Première apparition: </div>
          <div class="information_value apparearance"></div>
        </div>
        <div class="information">
          <div class="information_get">Alter(s) égo: </div>
          <div class="information_value alter"></div>
        </div>
        <div class="information">
          <div class="information_get">Affiliation(s): </div>
          <div class="information_value affiliation"></div>
        </div>
        <div class="information">
          <div class="information_get">Proches: </div>
          <div class="information_value relatives"></div>
        </div>
      </div>
    </div>
  </article>
`
  );

data.biography.key = function(n) {
  return this[Object.keys(this)[n]];
};
data.connections.key = function(n) {
  return this[Object.keys(this)[n]];
};
data.appearance.key = function(n) {
  return this[Object.keys(this)[n]];
};

 /*
 let obj = data.biography;
 for(var i in obj){
  console.log(`${i} : ${obj[i]}`);
}
*/

 document.querySelector(".apparearance").innerHTML == data.biography.key(6);
 document.querySelector(".affiliation").innerHTML = data.connections.key(0);
 document.querySelector(".origin").innerHTML = data.biography.key(3);
 document.querySelector(".alter").innerHTML = data.biography.key(1);
 let hair_color = data.appearance.key(4);
 let eye_color = data.appearance.key(5);
 let first_appearance = data.biography.key(4);
 let full_name = data.biography.key(0);


  let listTranslate = [
    {"word":data.appearance.gender,"target":".gender"},
    {"word":data.appearance.race,"target":".race"},
    {"word":data.work.occupation,"target":".occupation"},
    {"word":hair_color,"target":".hair"},
    {"word":eye_color,"target":".eye"},
    {"word":data.connections.relatives,"target":".relatives"},
    {"word":first_appearance,"target":".apparearance"},
    {"word":data.biography.aliases,"target":".alias"}
  ];

  document.querySelector(".full-name").innerHTML=full_name?full_name:data.name;
  verifImage(data.image.url,$janeDoe,"imgHero");
  transformText(data.biography.publisher,".publisher",data.biography.alignment,".card_right__review p",data.appearance.gender);
  translate(listTranslate,english_french);
}


function viewAbstract(data,contenair,keywords) {
  let end = data.length>1?"s":"";
  let para = document.createElement("span");
  para.setAttribute('class', 'abstract');
  contenair.appendChild(para);

  para.insertAdjacentHTML("beforeend",
      `Environ ${data.length} résultat${end} pour le mot clé <b>"${keywords}"</b>`
    );
}

/*--------------------------
Transform text
----------------------------*/

function transformText(e,e_dest,s,s_dest,g){
    let edition = e==null || e=="null" || e.trim()==""?"Inconnue":e;
    document.querySelector(e_dest).innerHTML=edition;

    let statut;
    if(s=="good"){ statut="Héro";}
    else if(s=="neutral"){ statut="Neutre";}
    else if(s=="-"){ statut="Rôle inconnu";}
    else { statut= g=="Male"?"Vilain":"Vilain";}
    document.querySelector(s_dest).innerHTML=statut;
}

/*----------------
Results not found
------------------*/
function ErrorMessage(keywords) {
  const $resultsContainer = resetResults();
  $resultsContainer.innerHTML="";
  $resultsContainer.insertAdjacentHTML("beforeend",
    `<div class='errorMessage'>
      <p>Votre recherche - <span class='keyword'>${keywords}</span> - ne correspondait à aucun personnage.</p>
        <li>Vérifier l'orthographe de votre recherche</li>
        <li>Essayez un autre mot</li>
        <li>Ou mettez une lettre en générale</li>
      </p>
    </div>`
  );
}

/*------------------------------------
Empty the content before the new data
--------------------------------------*/
function resetResults(){
  const $resultsContainer = document.querySelector(".resultsContainer");
  $resultsContainer.innerHTML = "";
  $resultsContainer.insertAdjacentHTML("beforeend",
    `<svg class="circular-loader" viewBox="25 25 50 50" >
      <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#0E76A8" stroke-width="2" />
  </svg>`
  );
  return $resultsContainer;
}


/*------------------------------------
Disabled croll & load bio
--------------------------------------*/
function actionClick(link,close){
  let data;
  link.addEventListener("click",function(){
    $panel.innerHTML="";
    document.querySelector("body").classList.add("open-bio");
    data = this.getAttribute("data-all");
    fetchResult (data);
  });
  close.addEventListener("click",function(){
    document.querySelector("body").classList.remove("open-bio");
  });
}


/*------------------------------------
Translate a text 
--------------------------------------*/
function translate(words,tran){
  for(let i=0; i<words.length; i++){
    words[i].word = encodeURIComponent(words[i].word);
    fetch(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=${tran.input}&target=${tran.output}&input=${words[i].word}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
        "x-rapidapi-key": "d13892d7c2msh5da6751dbdce34ep17231ajsn09636e4ce7a9"
      }
    })
    .then(response => response.json())
    .then(data => {
      
      document.querySelector(words[i].target).innerHTML=data.outputs[0].output;
    })
    .catch(err => {
      console.log(err);
    });
  }
}


/*-----------------------------
Check if image exist in the url
-------------------------------*/
function checkImage(myImage,callBack){
  var imageData = new Image();
  imageData.onload = function() {
    callBack(true);
  };
  imageData.onerror = function() {
    callBack(false);
  };
  imageData.src = myImage;
}

function verifImage(img,newImage,idDest){
  checkImage(img, function(existsImage) {
    if(!existsImage) {
     document.getElementById(idDest).setAttribute("src",newImage.getAttribute("src"));
    }
  });
}