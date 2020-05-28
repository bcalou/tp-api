import { setRecipesList } from '../../components/listitem/listItemsTemplate';
import { $favoritesList } from './favotitesRecipesTemplate';
import { createElement } from './../../settings/creatElements';
const imgDust = require('../../../assets/img/HugePossibleBarasingha-small.gif');

export function setFavoritesRecipesList(allRecipes) {
  $favoritesList.innerHTML = '';
  if (!allRecipes || allRecipes.length === 0) {
    createElement({
      type: 'p',
      attributes: { class: 'text-center m-3 font-italic' },
      content: 'Aucune recette ici',
      $parent: $favoritesList,
    });
    createElement({
      type: 'img',
      attributes: {
        src: imgDust,
        alt: 'image de vide',
        class: 'mx-auto',
      },
      $parent: $favoritesList,
    });
  } else {
    allRecipes.forEach((recipe) =>
      $favoritesList.appendChild(
        setRecipesList({ recipe, itemOfFavoritesList: true })
      )
    );
  }
}
