import { $recipesList } from './../../pages/recipes/formTemplate';
import { createElement } from '../../global/creatElements';

export function setRecipesList(recipe) {
  const fragment = document.createDocumentFragment();

  const $recipeContent = createElement({
    type: 'li',

    attributes: {
      class: 'p-2 mt-2 border border-secondary rounded',
    },
    $parent: fragment,
  });

  createElement({
    type: 'h6',
    content: recipe.title,
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
    content: `⏲ : ${recipe.readyInMinutes} min`,
    attributes: {
      //class: 'mb-0',
    },
    $parent: $recipeDescription,
  });

  createElement({
    type: 'p',
    content: `👥 : ${recipe.servings} pers`,
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
      href: recipe.sourceUrl,
      target: 'blank',
      class: 'btn btn-success text-light mb-2',
    },
  });

  createElement({
    type: 'button',
    id: recipe.id,
    content: 'Ajouter aux favoris',
    $parent: $buttons,
    attributes: {
      class: 'btn btn-info',
    },
    clickFunction: addRecipeToFavorite,
  });

  $recipesList.appendChild(fragment);
}

function addRecipeToFavorite(e) {
  const id = e.target.dataset.id;
  console.log(id);
}
