import { url, apiKey } from './../../global/constants';
import { $favoritesList } from './../../pages/favorites/favotitesTemplate';

function getRecipeInfoById(id) {
  return fetch(
    `${url}/recipes/${id}/information?apiKey=${apiKey}`
  ).then((response) => response.json());
}

export function addRecipeToFavorites(e) {
  const actualId = e.target.dataset.id;
  let reciprAlreadyExist = false;
  let recipesList;

  if (!localStorage.getItem('favoritesRecipes')) {
    recipesList = [];
  } else {
    recipesList = JSON.parse(localStorage.getItem('favoritesRecipes'));
    recipesList.forEach((recipe) => {
      if (recipe.id == actualId) {
        reciprAlreadyExist = true;
      }
    });
  }

  if (!reciprAlreadyExist) {
    getRecipeInfoById(e.target.dataset.id).then((data) => {
      let recipeInfo = {
        title: data.title,
        readyInMinutes: data.readyInMinutes,
        servings: data.servings,
        sourceUrl: data.sourceUrl,
        id: data.id,
      };
      recipesList.push(recipeInfo);
      localStorage.setItem('favoritesRecipes', JSON.stringify(recipesList));
    });
  } else {
    console.log('deja la');
  }
}

export function deleteFromFavorites(e) {
  const actualId = e.target.dataset.id;

  const recipesList = JSON.parse(localStorage.getItem('favoritesRecipes'));
  const index = recipesList.findIndex((recipe) => recipe.id == actualId);
  recipesList.splice(index, 1);

  $favoritesList.removeChild(
    document.querySelectorAll('.favoritListItem')[index]
  );
  localStorage.setItem('favoritesRecipes', JSON.stringify(recipesList));
}
