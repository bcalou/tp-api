const API_URL = "https://api.nasa.gov/planetary/apod?api_key=hNbh4bjOeNIfhirPFzKPjM6WlMA4pLT4rQeAk1u0"
const Discover = document.querySelector(".discover");


    function getFacts() {
        $Picture.textContent = 'Chargement en cours';
      
        return fetch(getFactsUrl())
          .then(res => res.json())
          .then(facts => showFacts(facts));
      }
    
const $discover = document.getElementById('discover');
const $Picture = document.getElementById('Picture');



    function getFacts() {
        $Picture.textContent = 'loading';
      
        return fetch(getFactsUrl())
          .then(res => res.json())
          .then(facts => showFacts(facts));
      }

      $discover.addEventListener('click', () => {
        toggleButton($discover);
        getFacts().then(() => toggleButton($discover)); 
      });