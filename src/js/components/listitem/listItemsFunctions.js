import { url, apiKey, favoritesRecipesList } from '../../settings/constants';
import { $favoritesList } from '../../pages/favorites/favotitesRecipesTemplate';

function getRecipeInfoById(id) {
  return fetch(
    `${url}/recipes/${id}/information?apiKey=${apiKey}`
  ).then((response) => response.json());
}

export function addRecipeToFavorites(e) {
  const actualId = e.target.dataset.id;

  if (
    favoritesRecipesList.find((recipe) => recipe.id == actualId) === undefined
  ) {
    getRecipeInfoById(e.target.dataset.id).then((data) => {
      let recipeInfo = {
        title: data.title,
        readyInMinutes: data.readyInMinutes,
        servings: data.servings,
        sourceUrl: data.sourceUrl,
        id: data.id,
      };
      favoritesRecipesList.unshift(recipeInfo);
      localStorage.setItem(
        'favoritesRecipes',
        JSON.stringify(favoritesRecipesList)
      );
      e.target.textContent = 'Ajouté :)';
      e.target.className = 'btn btn-primary';
    });
  } else {
    e.target.textContent =
      'Du calme pépito, la recette est déjà dans tes favoris!';
    e.target.className = 'btn btn-danger';
  }
}

export function deleteFromFavorites(e) {
  const actualId = e.target.dataset.id;

  console.log(favoritesRecipesList);
  //const recipesList = JSON.parse(localStorage.getItem('favoritesRecipes'));
  const index = favoritesRecipesList.findIndex(
    (recipe) => recipe.id == actualId
  );
  favoritesRecipesList.splice(index, 1);

  $favoritesList.removeChild(
    document.querySelectorAll('.favoritListItem')[index]
  );
  localStorage.setItem(
    'favoritesRecipes',
    JSON.stringify(favoritesRecipesList)
  );
}
