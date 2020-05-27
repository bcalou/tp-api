import { createElement } from '../../settings/creatElements';
import {
  addRecipeToFavorites,
  deleteFromFavorites,
} from './listItemsFunctions';

export function setRecipesList(option) {
  const $listFragment = document.createDocumentFragment();

  const $recipeContent = createElement({
    type: 'li',
    attributes: {
      class: `p-2 mt-2 border border-secondary rounded ${
        option.favorites ? 'favoritListItem' : 'recipeListItem'
      }`,
    },
    $parent: $listFragment,
  });

  createElement({
    type: 'h6',
    attributes: {
      class: 'text-center',
    },
    content: option.recipe.title,
    $parent: $recipeContent,
  });

  const $recipeDescription = createElement({
    type: 'div',
    attributes: {
      class: 'd-flex justify-content-between',
    },
    $parent: $recipeContent,
  });

  createElement({
    type: 'p',
    content: `⏲ : ${option.recipe.readyInMinutes} min`,
    attributes: {
      //class: 'mb-0',
    },
    $parent: $recipeDescription,
  });

  createElement({
    type: 'p',
    content: `👥 : ${option.recipe.servings} pers`,
    attributes: {
      //class: 'mb-0',
    },
    $parent: $recipeDescription,
  });

  const $buttons = createElement({
    type: 'div',
    attributes: {
      class: 'd-flex flex-column px-1',
    },
    $parent: $recipeContent,
  });

  createElement({
    type: 'a',
    content: 'voir la recette',
    $parent: $buttons,
    attributes: {
      href: option.recipe.sourceUrl,
      target: 'blank',
      class: 'btn btn-success text-light mb-2',
    },
  });

  createElement({
    type: 'button',
    id: option.recipe.id,
    content: `${
      option.favorites ? 'Supprimer de la liste' : 'Ajouter aux favoris'
    }`,
    $parent: $buttons,
    attributes: {
      class: `${option.favorites ? 'btn btn-danger' : 'btn btn-info'}`,
    },
    clickFunction: option.favorites
      ? deleteFromFavorites
      : addRecipeToFavorites,
  });

  return $listFragment;
}
