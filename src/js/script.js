const url = 'https://api.spoonacular.com';
const apiKey = '80183dea52014b85917f0f63667e2f6c';

const $recipesList = document.querySelector('.recipes');
const $recipeForm = document.querySelector('.recipe-form');
const $recipeInput = document.getElementById('recipe');
const $totalresults = document.getElementById('totalResult');

$recipeInput.addEventListener('input', (e) => {
  if (e.target.value.length > 0) {
    getRecipesList(e.target.value).then(
      (data) => ($totalresults.innerHTML = `${data.totalResults} résultats`)
    );
  } else {
    $totalresults.innerHTML = '';
  }
});

$recipeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  $recipesList.innerHTML = '';
  getRecipesList($recipeInput.value).then((data) =>
    data.results.forEach((recipe) => {
      console.log(recipe);
      setRecipesList(recipe);
    })
  );
});

function getRecipesList(search) {
  return fetch(
    `${url}/recipes/search?apiKey=${apiKey}&query=${search}`
  ).then((response) => response.json());
}

function createElement(options) {
  const $element = document.createElement(options.type);

  if (options.id) {
    $element.dataset.id = options.id;
  }

  if (options.classes) {
    $element.className = options.classes;
  }

  if (options.clickFunction) {
    $element.addEventListener('click', options.clickFunction);
  }

  if (options.content) {
    $element.textContent = options.content;
  }

  if (options.$parent) {
    options.$parent.appendChild($element);
  }

  return $element;
}

function setRecipesList(recipe) {
  const fragment = document.createDocumentFragment();

  const $recipeContent = createElement({
    type: 'li',
    id: recipe.id,
    classes: 'p-1 mt-2 border border-secondary rounded',
    $parent: fragment,
  });

  const $recipeTitle = createElement({
    type: 'h6',
    content: recipe.title,
    $parent: $recipeContent,
  });

  const $recipeDescription = createElement({
    type: 'div',
    classes: 'd-flex justify-content-around',
    $parent: $recipeContent,
  });

  const $recipeTime = createElement({
    type: 'p',
    content: `⏲ : ${recipe.readyInMinutes} min`,
    className: 'mb-0',
    $parent: $recipeDescription,
  });

  const $recipeParts = createElement({
    type: 'p',
    content: `👥 : ${recipe.servings} pers`,
    className: 'mb-0',
    $parent: $recipeDescription,
  });

  $recipesList.appendChild(fragment);
}
