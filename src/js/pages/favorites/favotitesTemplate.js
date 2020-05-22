import { createElement } from './../../global/creatElements';

export const $favoritePageTemplate = createElement({
  type: 'section',
  attributes: {
    class: 'w-100 d-flex flex-column align-items-center',
  },
});

const $header = createElement({
  type: 'header',
  attributes: {
    class: 'w-100 d-flex justify-content-center',
  },
  $parent: $favoritePageTemplate,
});

createElement({
  type: 'h1',
  content: 'Recettes Favorites',
  attributes: {
    class: 'title my-5 text-light',
  },
  $parent: $header,
});
