import { url, apiKey } from './../../global/constants';

import {
  $form,
  $searchInput,
  $cuisinesSelect,
  $intolerancesSelect,
  $totalresults,
  $recipesList,
} from './formTemplate';

import { setRecipesList } from './../../components/listitem/listItems';

let queryOffset = 0;
let totalResultsLength;
let returnresultsLength = 5;
let formInfos = {};
let isLoaded = false;

function recipesQuery(search) {
  return fetch(
    `${url}/recipes/search?apiKey=${apiKey}&query=${search.query}&cuisine=${
      search.cuisine ? search.cuisine : ''
    }&intolerances=${
      search.intolerances ? search.intolerances : ''
    }&number=${returnresultsLength}&offset=${queryOffset}`
  ).then((response) => response.json());
}

function getRecipesList(parameters) {
  recipesQuery(parameters).then((data) => {
    data.results.forEach((recipe) => {
      setRecipesList(recipe);
      isLoaded = true;
    });
  });
}

export function handleInputChanges() {
  [$searchInput, $cuisinesSelect, $intolerancesSelect].forEach((el) => {
    el.addEventListener('input', () => {
      $recipesList.innerHTML = '';

      formInfos.query = $searchInput.value;
      formInfos.cuisine = $cuisinesSelect.value;
      formInfos.intolerances = $intolerancesSelect.value;

      if ($searchInput.value.length > 0) {
        recipesQuery(formInfos).then((data) => {
          totalResultsLength = data.totalResults;
          $totalresults.innerHTML = `${totalResultsLength} résultats`;
        });
      } else {
        $totalresults.innerHTML = '';
      }
    });
  });
}

export function submitForm() {
  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    $recipesList.innerHTML = '';
    getRecipesList(formInfos);
  });
}

export function infiniteLoading() {
  window.addEventListener('scroll', () => {
    let body = document.body.offsetHeight;
    if (queryOffset + returnresultsLength < totalResultsLength && isLoaded)
      if (window.scrollY + window.innerHeight > body - 50) {
        queryOffset += 5;
        getRecipesList(formInfos);
        isLoaded = false;
      }
  });
}
