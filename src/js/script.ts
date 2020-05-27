import { endpoints, route } from "./routes";

const RecipesContainer: Element = document.querySelector("#recipesContainer");
const tenResults: Element = document.querySelector("#tenimage");
const fiftyResults: Element = document.querySelector("#fiftyimage");
const hundredResults: Element = document.querySelector("#hundredimage");
const buttonVegan: Element = document.querySelector("#vegan");
const buttonVegetarian: Element = document.querySelector("#vegetarian");
const buttonNoGluten: Element = document.querySelector("#nogluten");

const getRecipes = (route: string): void => {
  fetch(route)
    .then((resp) => resp.json())
    .then((resp: Record<string, any[]>) => {
      let recipesContainer = "";
      for (let index = 0; index < resp.results.length; index++) {
        recipesContainer += ` <div class="recipes__card">
        <h2>${resp.results[index].title}</h2>
        <div class="recipes__card__numbers">
        <h3 class="recipes__card__time">${resp.results[index].readyInMinutes}min</h3>
        <h4 class="recipes__card__people">${resp.results[index].servings} people</h4>
        </div>
        <img class="recipes__card__image" src="https://spoonacular.com/recipeImages/${resp.results[index].image}" />
        <a href="${resp.results[index].sourceUrl}" class="recipes__button" target="_blank">See this recipe</a>
        </div>
      `;
      }
      RecipesContainer.innerHTML = recipesContainer;
    });
};

tenResults.addEventListener("click", () =>
  getRecipes(route(endpoints.recipes, "number=10"))
);

fiftyResults.addEventListener("click", () =>
  getRecipes(route(endpoints.recipes, "number=50"))
);
hundredResults.addEventListener("click", () =>
  getRecipes(route(endpoints.recipes, "number=100"))
);

buttonVegetarian.addEventListener("click", () =>
  getRecipes(route(endpoints.recipes, "diet=vegetarian"))
);

buttonVegan.addEventListener("click", () =>
  getRecipes(route(endpoints.recipes, "diet=vegan"))
);

buttonNoGluten.addEventListener("click", () =>
  getRecipes(route(endpoints.recipes, "diet=Gluten Free"))
);

getRecipes(route(endpoints.recipes, "number=10"));
