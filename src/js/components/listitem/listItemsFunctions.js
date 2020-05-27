import { url, apiKey } from '../../settings/constants';
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
      e.target.textContent = 'Ajouté :)';
      e.target.className = 'btn btn-primary';
    });
  } else {
    e.target.textContent = 'Cette recette est déjà dans les favoris!';
    e.target.className = 'btn btn-danger';
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
