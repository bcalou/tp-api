import {
    Film 
} from '../js/interface'


const $movieContainer :HTMLElement = document.querySelector(".movie-container");
const apiToken :string = `5a72cb42a120bd4f37bb5b39d503e746`
const $form : HTMLElement = document.querySelector("#form-search");

function fetchFilm (text : string) : void{
    const url :string = `https://api.themoviedb.org/3/search/movie?api_key=${apiToken}&language=fr&query=${text}`

    fetch(url)
        .then(res => res.json()).then(data =>  data.results.forEach(film => {
            templating(film)
            console.log(film)
        }))
}

function getImageFromApi (name :string) :string {
    return `https://image.tmdb.org/t/p/w300${name}`
  }

function templating (film : Film) :void{
    const $movieCard : HTMLElement = document.createElement('div');
    const $btnCard : HTMLElement = document.createElement("button");
    let like : boolean = false

    $movieCard.classList.add("card-body");
    $movieCard.classList.add("mb-3");
    $movieCard.style.margin = "auto";

    $btnCard.classList.add("btn");
    $btnCard.classList.add("btn-primary");
    
    $btnCard.addEventListener("click", ()=>{
        if (like){
            
            return 0;
        }
        let nbVote : number = film.vote_count;
        film.vote_count++;
        nbVote = nbVote + 1;
        $btnCard.querySelector("#nb_vote").textContent = nbVote;
        $btnCard.classList.add("btn-secondary");
        like = true
    })
    
    $btnCard.innerHTML = `
        Nombre Vote <span class="badge badge-light" id="nb_vote">${film.vote_count}</span>`

    const $movie :string = `
    <img src=${getImageFromApi(film.poster_path)} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${film.title}</h5>
      <p class="card-text">${film.overview}</p>
      <p class="card-text"><small class="text-muted">${film.vote_average}</small></p>
      
    </div>
  `
   
    $movieCard.innerHTML += $movie; 
    $movieCard.appendChild($btnCard);
    $movieContainer.appendChild($movieCard);



}

$form.addEventListener("submit", (e)=>{
    e.preventDefault();
    $movieContainer.innerHTML = "";
    fetchFilm(e.target[0].value);

    
})
