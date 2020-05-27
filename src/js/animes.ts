import { Data } from './interfaces';
import './script'
import axios from 'axios'

const $body = document.querySelector('body')

axios.defaults.baseURL = 'https://kitsu.io/api/edge'
axios.get('anime')
  .then((res):void => { 
    allFunctionsCallsAnimes(res) //histoire de ne pas avoir 30k fonctions dans l'appel
    console.log("data", res.data.data)
  })
  .catch((err):void => {
    return console.error(err)
  })

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
      $body.append(image, div) 
    })
  }
  
  const synopsHover = (res):void => { // Mettre les Synopsis sur les affiche d'animes pour les voir au hover.
    let results = res.data.data
    let divsHover = document.querySelectorAll<HTMLElement>('.descHover')
    results.forEach((result:Data, index:number):void => {
      let paraph:HTMLElement = document.createElement("p")
      paraph.textContent = result.attributes.synopsis
      divsHover[index].append(paraph)
    })
  }

const allFunctionsCallsAnimes = (res) => {
    animeElement(res)
    synopsHover(res)
}