

const Discover = document.querySelector(".discover");
fetch("https://api.nasa.gov/planetary/apod?api_key=hNbh4bjOeNIfhirPFzKPjM6WlMA4pLT4rQeAk1u0")
    .then((res) => res.json())
    .then((apod) => console.log(apod));


    function getFacts() {
        $factsContainer.textContent = 'Chargement en cours';
      
        return fetch(getFactsUrl())
          .then(res => res.json())
          .then(facts => showFacts(facts));
      }

