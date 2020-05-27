
document.addEventListener("DOMContentLoaded", function (event) {
  const APIurl = "https://api.spoonacular.com";
  const API_key = "8cdf0991fa1142ff88c27da58e91fa05";
  const numberOfRecipes = 6;
  const searchbutton = document.querySelector(".searchBox__searchButton");
  const searchBox = document.querySelector(".searchBox__searchTerm");
  const foodsContainer = document.querySelector(".popular__food");
  const headerResult = document.querySelector(".displayResult__searchValue");
  const results = document.querySelector(".resultSearch__details");
  const resultFoodName = document.querySelector(".resultSearch__name");
  const resultFoodPicture = document.querySelector(".resultSearch__picture");
  const resultFoodCookTime = document.querySelector(".resultSearch__time");
  const resultFoodIngredients = document.querySelector(".resultSearch__ingredients");
  const resultFoodCookInstruction = document.querySelector(".resultSearch__cookInstruction");
  const sectionSearch = document.querySelector(".search");
 


  /************* get ************/
  
  const categoryMainCourse = document.querySelector(".categoryList__mainCourse");
  const categoryBreakfast = document.querySelector(".categoryList__breakfast");
  const categoryAppetizer = document.querySelector(".categoryList__appetizer");
  const categoryFingerFood = document.querySelector(".categoryList__fingerFood");
  const categoryDessert = document.querySelector(".categoryList__breakfast");
  const categoryVegetarian = document.querySelector(".categoryList__vegetarian");
  const categoryVegan = document.querySelector(".categoryList__vegan");
  




  /************* fetch search ************/



  function searchRecipes() {
 
    fetch(`${APIurl}/recipes/search?query=${searchBox.value}&number=${numberOfRecipes}&apiKey=${API_key}`)
      .then(response => response.json())
      .then(recipes => {
        console.log(recipes.results)
        let divRecipies = recipes.results.map((recipe) => {
          return generateRecipeDiv(recipe, true)
        })
        console.log(divRecipies);
        divRecipies.forEach(recipeDiv => {
          foodsContainer.appendChild(recipeDiv)
        });
      });
  
  }

  function getCookInstruction(recipe) {
    fetch(`${APIurl}/recipes/${recipe.id}/analyzedInstructions?apiKey=${API_key}`)
      .then(response => response.json())
      .then(instructionInfo => {
        console.log(instructionInfo);

        //put foreach function that declaired ourside

        instructionInfo.forEach(instruction => {
          instruction.steps.forEach(stepInfo => {
            generateInstructionText(stepInfo);
          })
        })
      });
}

  function detailsRecipe(recipe) {
    console.log(recipe);
    let divDetails = generateRecipeDiv(recipe, false);
    results.innerHTML = ""
    results.appendChild(divDetails);
    resultFoodIngredients.innerHTML = ""
    getIngredients(recipe);
    resultFoodCookInstruction.innerHTML = ""
    getCookInstruction(recipe);
  }



  function getIngredients(recipe) {
    fetch(`${APIurl}/recipes/${recipe.id}/ingredientWidget.json?apiKey=${API_key}`)
      .then(response => response.json())
      .then(ingredientsInfo=> {
        //put function that declaired outside
        ingredientsInfo.ingredients.forEach(ingredient => {
          generateIngredientText(ingredient);
        })
    });
  }
        
//declare the function for make ingredients
        
  function generateIngredientText(ingredient) {
    let ingredientsInfo = document.createElement('p');
    ingredientsInfo.innerHTML = `${ingredient.name} ${ingredient.amount.us.unit} ${ingredient.amount.us.value}`;
    resultFoodIngredients.appendChild(ingredientsInfo);
    
      
  };


// declaire the function for make instruction
  
function generateInstructionText(stepInfo) {
  let instructionsDetails = document.createElement('p');
  instructionsDetails.innerHTML = `${stepInfo.number} ${stepInfo.step}`;
  resultFoodCookInstruction.appendChild(instructionsDetails);
  

  };
  

  
  
/************* create div of recipe on page as result ************/
  
  function generateRecipeDiv(recipe, buttonDisplay) {
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

   

    if (buttonDisplay === true) {
      let buttonSeeRecipe = document.createElement('button');
    buttonSeeRecipe.className = "buttonSeeRecipe";
    buttonSeeRecipe.innerText = 'See Recipe';
    divRecipe.appendChild(buttonSeeRecipe);
    
    buttonSeeRecipe.addEventListener('click', () => {
      // change the class
    
          detailsRecipe(recipe)
        })

    }
    return divRecipe

  }

  searchbutton.addEventListener('click', () => {
    resultFoodIngredients.innerHTML = ""
    searchRecipes()
  })


  
});