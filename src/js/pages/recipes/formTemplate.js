import { createElement } from './../../global/creatElements';

export const $recipesPageContent = createElement({
  type: 'section',
  attributes: {
    class: 'w-100 d-flex flex-column align-items-center',
  },
});

function createFormGroup() {
  return createElement({
    type: 'div',
    attributes: {
      class: 'form-group w-100',
    },
    $parent: $form,
  });
}

export const $form = createElement({
  type: 'form',
  attributes: {
    class:
      'd-flex flex-column align-items-center recipe-form px-3 text-light w-100 pb-5',
  },
  $parent: $recipesPageContent,
});

//Title
const $title = createElement({
  type: 'h1',
  content: 'Keskon mange??',
  attributes: {
    class: 'title my-3',
  },
  $parent: $form,
});

createElement({
  type: 'p',
  attributes: {
    class: 'subtitle',
  },
  content: 'Plus de 1000000 de recettes du monde entier',
  $parent: $title,
});

//Search
const $search = createFormGroup();

createElement({
  type: 'label',
  attributes: {
    for: 'recipe',
  },
  content: 'Recherche',
  $parent: $search,
});

export const $searchInput = createElement({
  type: 'input',
  attributes: {
    type: 'text',
    class: 'form-control',
    id: 'recipe',
    placeholder: 'Infredients, nom...',
    required: true,
  },
  $parent: $search,
});

//Cuisine Select
const $cuisines = createFormGroup();

const cuisineTypes = [
  'African',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
];

createElement({
  type: 'label',
  attributes: {
    for: 'cuisine',
  },
  content: 'Cuisines',
  $parent: $cuisines,
});

export const $cuisinesSelect = createElement({
  type: 'select',
  attributes: {
    class: 'form-control form-control-sm',
    id: 'cuisine',
  },
  $parent: $cuisines,
});

createElement({
  type: 'option',
  attributes: {
    value: '',
  },
  content: '--choisir--',
  $parent: $cuisinesSelect,
});

cuisineTypes.forEach((cuisine) =>
  createElement({
    type: 'option',
    attributes: {
      value: cuisine,
    },
    content: cuisine,
    $parent: $cuisinesSelect,
  })
);

//intolerances select
const $intolerances = createFormGroup();

const intolerancesTypes = [
  'Dairy',
  'Egg',
  'Gluten',
  'Grain',
  'Peanut',
  'Seafood',
  'Sesame',
  'Shellfish',
  'Soy',
  'Sulfite',
  'Tree Nut',
  'Wheat',
];

createElement({
  type: 'label',
  attributes: {
    for: 'intolerances',
  },
  content: 'Intolerances',
  $parent: $intolerances,
});

export const $intolerancesSelect = createElement({
  type: 'select',
  attributes: {
    class: 'form-control form-control-sm',
    id: 'intolerances',
  },
  $parent: $intolerances,
});

createElement({
  type: 'option',
  attributes: {
    value: '',
  },
  content: '--choisir--',
  $parent: $intolerancesSelect,
});

intolerancesTypes.forEach((intolerance) =>
  createElement({
    type: 'option',
    attributes: {
      value: intolerance,
    },
    content: intolerance,
    $parent: $intolerancesSelect,
  })
);

//total result
export const $totalresults = createElement({
  type: 'small',
  attributes: {
    id: 'totalResult',
    class: 'form-text text-muted',
  },
  $parent: $form,
});

//submit
createElement({
  type: 'button',
  attributes: {
    type: 'submit',
    class: 'btn btn-warning w-100',
  },
  content: 'Voir',
  $parent: $form,
});

//Recipes List
export const $recipesList = createElement({
  type: 'ul',
  attributes: {
    class: 'recipes',
  },
  $parent: $recipesPageContent,
});
