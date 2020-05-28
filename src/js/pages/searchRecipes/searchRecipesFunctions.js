import { url, apiKey, favoritesRecipesList } from '../../settings/constants';

import {
  $form,
  $searchInput,
  $cuisinesSelect,
  $dietSelect,
  $intolerancesSelect,
  $recipesList,
  $submitButton,
} from './searchRecipesTemplate';

import { setRecipesList } from '../../components/listitem/listItemsTemplate';

let queryOffset = 0;
let totalResultsLength;
let returnresultsLength = 5;
let formInfos = {};
let isLoaded = false;

function recipesQuery(search) {
  return fetch(
    `${url}/recipes/search?apiKey=${apiKey}&query=${search.query}&cuisine=${
      search.cuisine ? search.cuisine : ''
    }&diet=${search.diet ? search.diet : ''}&intolerances=${
      search.intolerances ? search.intolerances : ''
    }&number=${returnresultsLength}&offset=${queryOffset}`
  ).then((response) => response.json());
}

function getRecipesList(parameters) {
  recipesQuery(parameters).then((data) => {
    data.results.forEach((recipe) => {
      const recipesAlreadyAddedInFavorites =
        favoritesRecipesList.find((item) => item.id == recipe.id) === undefined
          ? false
          : true;
      $recipesList.appendChild(
        setRecipesList({ recipe, recipesAlreadyAddedInFavorites })
      );
      isLoaded = true;
    });
  });
}

export function handleInputChanges() {
  [$searchInput, $cuisinesSelect, $intolerancesSelect, $dietSelect].forEach(
    (el) => {
      el.addEventListener('input', () => {
        $recipesList.innerHTML = '';
        $submitButton.disabled = true;
        if (
          $searchInput.value ||
          $intolerancesSelect.value ||
          $cuisinesSelect.value ||
          $dietSelect.value
        ) {
          formInfos.query = $searchInput.value;
          formInfos.cuisine = $cuisinesSelect.value;
          formInfos.intolerances = $intolerancesSelect.value;
          formInfos.diet = $dietSelect.value;

          recipesQuery(formInfos).then((data) => {
            totalResultsLength = data.totalResults;
            $submitButton.textContent = `Voir ${totalResultsLength} résultats`;
            if (totalResultsLength > 0) {
              $submitButton.disabled = false;
            }
          });
        } else {
          $submitButton.textContent = 'Voir';
          $submitButton.disabled = true;
        }
      });
    }
  );
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
