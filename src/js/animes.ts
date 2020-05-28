import { Data } from './interfaces';
import './script'
import axios from 'axios'

const $body = document.querySelector('body')
const $inputAnime = document.querySelector('#search')

axios.defaults.baseURL = 'https://kitsu.io/api/edge'
axios.get('anime')
  .then((res):void => { 
    allFunctionsCallsAnimes(res) //histoire de ne pas avoir 30k fonctions dans l'appel
    console.log("data", res.data.data)
  })
  .catch((err):void => {
    return console.error(err)
  })

const allFunctionsCallsAnimes = (res) => {
    animeElement(res)
    synopsHover(res)
}

const animeElement = (res):void => { // Créer chaque élément avec son titre et son image.
    let results = res.data.data
    results.forEach((result):void => {
        let image: HTMLImageElement = document.createElement('img') 
        let div:HTMLElement = document.createElement('div')
        div.classList.add('animeEl')
        let h2:HTMLElement = document.createElement('h2')
        image.src = result.attributes.posterImage.medium 
        h2.append(result.attributes.slug)
        div.append(h2)

        $inputAnime.addEventListener('keyup', (e) => {
          if (e.target === h2) { // Je ne trouve pas la propriété qui permet de dire "e.target par rapport au 1er caractère, puis au 2ème etc. J'avais pas exemple essayé avec h2.length mais ça ne marche pas"
            h2.style.display = "block" // Lorsqu'on efface tout les caractères dans l'input, on est obligé d'appuyer sur entrer pour que ça re-affiche (ce qui fait charger la page). Même un preventDefault() ne fait rien
            image.style.display = "block"
            div.style.display = "block"
          } else { 
            h2.style.display = "none"
            image.style.display = "none"
            div.style.display = "none"
          }
        })
        $body.append(image, div) 
    })
}
  
const synopsHover = (res):void => { // Mettre les Synopsis sur les affiche d'animes pour les voir au hover.
    let results = res.data.data
    let divsHover = document.querySelectorAll<HTMLElement>('.descHover')
    results.forEach((result:Data, index:number):void => {
        let paraph:HTMLElement = document.createElement("p")
        paraph.textContent = result.attributes.synopsis
        $inputAnime.addEventListener('click', (e) => {
          if (e.target === paraph /* je sais que c'est faux mais je n'ai pas le temps */) {
            paraph.style.display = "block";
            divsHover[index].style.display = "block";
          } else {
            paraph.style.display = "none";
            divsHover[index].style.display = "none";
          }
        })
        divsHover[index].append(paraph)
    })
}