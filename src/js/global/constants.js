const constants = {
  url: 'https://api.spoonacular.com',
  apiKey: '80183dea52014b85917f0f63667e2f6c',
  $recipesList: document.querySelector('.recipes'),
  $recipeForm: document.querySelector('.recipe-form'),
  $recipeInput: document.getElementById('recipe'),
  $cuisine: document.getElementById('cuisine'),
  $intolerances: document.getElementById('intolerances'),
  $totalresults: document.getElementById('totalResult'),
};

export const {
  url,
  apiKey,
  $recipeForm,
  $recipeInput,
  $recipesList,
  $cuisine,
  $intolerances,
  $totalresults,
} = constants;
