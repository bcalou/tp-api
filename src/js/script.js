
document.addEventListener("DOMContentLoaded", function (event) {
  const APIurl = "https://api.spoonacular.com";
  const API_key = "8cdf0991fa1142ff88c27da58e91fa05";
  const numberOfRecipes = 6;
  const searchbutton = document.querySelector(".searchBox__searchButton");
  const searchBox = document.querySelector(".searchBox__searchTerm");
  const foodsContainer = document.querySelector(".popular__food");

  /************* fetch search ************/



  function searchRecipes() {
 
    fetch(`${APIurl}/recipes/search?query=${searchBox.value}&number=6&apiKey=${API_key}`)
      .then(response => response.json())
      .then(recipes => {
        console.log(recipes.results)
        let divRecipies = recipes.results.map((recipe) => {
          return generateRecipeDiv(recipe)
        })
        console.log(divRecipies);
        divRecipies.forEach(recipeDiv => {
          foodsContainer.appendChild(recipeDiv)
        });
      });
  
  }

  function generateRecipeDiv(recipe) {
    let divRecipe = document.createElement('div')
    divRecipe.className ='foopopularFood__type foodType'
    

    let foodName = document.createElement('h4');
    foodName.innerText = recipe.title;
    divRecipe.appendChild(foodName);

    let foodPicture = document.createElement('img');
    let imageUrl = "https://spoonacular.com/recipeImages/" + recipe.id + "-240x150.jpg"
    foodPicture.src = imageUrl;
    divRecipe.appendChild(foodPicture);

    let cookTime = document.createElement('h5');
    cookTime.innerText = recipe.readyInMinutes;
    divRecipe.appendChild(cookTime);

    let buttonSeeRecipe = document.createElement('button');
    buttonSeeRecipe.innerText = 'See Recipe';
    divRecipe.appendChild(buttonSeeRecipe);

  

    return divRecipe
  }

  searchbutton.addEventListener('click', () => {


    searchRecipes();
  })
});