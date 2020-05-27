import { setRecipesList } from './../../components/listitem/listItemsTemplate';
import { $favoritesList } from './favotitesTemplate';

export function setFavoritesRecipesList(allRecipes) {
  $favoritesList.innerHTML = '';
  if (!allRecipes) {
    $favoritesList.textContent = 'Liste de recettes vide';
  } else {
    allRecipes.forEach((recipe) =>
      $favoritesList.appendChild(setRecipesList({ recipe, favorites: true }))
    );
  }
}
