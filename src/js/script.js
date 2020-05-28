document.addEventListener('DOMContentLoaded', function (event) {
    const APIurl = 'https://api.spoonacular.com'
    const API_key = '8cdf0991fa1142ff88c27da58e91fa05'
    const numberOfRecipes = 6
    const searchbutton = document.querySelector('.searchBox__searchButton')
    const searchBox = document.querySelector('.searchBox__searchTerm')
    const foodsContainer = document.querySelector('.result__food')
    const headerResult = document.querySelector('.displayResult__searchValue')
    const results = document.querySelector('.resultSearch__details')
    const resultFoodIngredients = document.querySelector(
        '.resultSearch__ingredients'
    )
    const resultFoodCookInstruction = document.querySelector(
        '.resultSearch__cookInstruction'
    )
    const sectionSearch = document.querySelector('.search')
    const sectionResult = document.querySelector('.result')
    const sectionDisplayResult = document.querySelector('.displayResult')
    const searchWrap = document.querySelector('.wrap')
    const buttonBack = document.querySelector('.buttonBack')

    /************* get ************/

    const categoryMainCourse = document.querySelector(
        '.categoryList__mainCourse'
    )
    const categoryBreakfast = document.querySelector('.categoryList__breakfast')
    const categoryAppetizer = document.querySelector('.categoryList__appetizer')
    const categoryFingerFood = document.querySelector(
        '.categoryList__fingerFood'
    )
    const categoryDessert = document.querySelector('.categoryList__breakfast')
    const categoryVegetarian = document.querySelector(
        '.categoryList__vegetarian'
    )
    const categoryVegan = document.querySelector('.categoryList__vegan')

    /************* fetch search ************/

    function searchRecipes() {
        fetch(
            `${APIurl}/recipes/search?query=${searchBox.value}&number=${numberOfRecipes}&apiKey=${API_key}`
        )
            .then((response) => response.json())
            .then((recipes) => {
                console.log(recipes.results)
                foodsContainer.innerHTML = ''
                let divRecipies = recipes.results.map((recipe) => {
                    return generateRecipeDiv(recipe, true)
                })
                console.log(divRecipies)
                divRecipies.forEach((recipeDiv) => {
                    foodsContainer.appendChild(recipeDiv)
                })
            })
    }

    function getCookInstruction(recipe) {
        fetch(
            `${APIurl}/recipes/${recipe.id}/analyzedInstructions?apiKey=${API_key}`
        )
            .then((response) => response.json())
            .then((instructionInfo) => {
                console.log(instructionInfo)

                //put foreach function that declaired ourside

                instructionInfo.forEach((instruction) => {
                    instruction.steps.forEach((stepInfo) => {
                        generateInstructionText(stepInfo)
                    })
                })
            })
    }

    function detailsRecipe(recipe) {
        console.log(recipe)
        let divDetails = generateRecipeDiv(recipe, false)
        results.innerHTML = ''
        results.appendChild(divDetails)
        resultFoodIngredients.innerHTML = ''
        getIngredients(recipe)
        resultFoodCookInstruction.innerHTML = ''
        getCookInstruction(recipe)
    }

    function getIngredients(recipe) {
        fetch(
            `${APIurl}/recipes/${recipe.id}/ingredientWidget.json?apiKey=${API_key}`
        )
            .then((response) => response.json())
            .then((ingredientsInfo) => {
                //put function that declaired outside
                ingredientsInfo.ingredients.forEach((ingredient) => {
                    generateIngredientText(ingredient)
                })
            })
    }

    //declare the function for make ingredients

    function generateIngredientText(ingredient) {
        let ingredientsInfo = document.createElement('p')
        ingredientsInfo.className = 'ingredientsInfo'
        ingredientsInfo.innerHTML = ` ${ingredient.amount.us.value} ${ingredient.amount.us.unit} ${ingredient.name}`
        resultFoodIngredients.appendChild(ingredientsInfo)
    }

    // declaire the function for make instruction

    function generateInstructionText(stepInfo) {
        let instructionsDetails = document.createElement('p')
        instructionsDetails.className = 'instructionsDetails'
        instructionsDetails.innerHTML = `${stepInfo.number}. ${stepInfo.step}`
        resultFoodCookInstruction.appendChild(instructionsDetails)
    }

    /************* create div of recipe on page as result ************/

    function controlbutton(divRecipe, buttonDisplay, recipe) {
        if (buttonDisplay === true) {
            let buttonSeeRecipe = document.createElement('button')
            buttonSeeRecipe.className = 'buttonSeeRecipe'
            buttonSeeRecipe.innerText = 'See Recipe'
            divRecipe.appendChild(buttonSeeRecipe)

            buttonSeeRecipe.addEventListener('click', () => {
                // change the class
                sectionSearch.style.display = 'none'
                sectionDisplayResult.classList.toggle('displayResult-is-open')
                sectionResult.style.display = 'none'
                detailsRecipe(recipe)
            })
        }
    }

    function generateRecipeDiv(recipe, buttonDisplay) {
        let divRecipe = document.createElement('div')
        divRecipe.className = 'wantedFood'

        let foodName = document.createElement('h4')
        foodName.className = 'foodTitle'
        foodName.innerText = recipe.title
        divRecipe.appendChild(foodName)

        let foodPicture = document.createElement('img')
        let imageUrl =
            'https://spoonacular.com/recipeImages/' + recipe.id + '-240x150.jpg'
        foodPicture.src = imageUrl
        divRecipe.appendChild(foodPicture)

        let cookTime = document.createElement('h5')
        cookTime.className = 'cookTime'
        cookTime.innerText = 'Cook Time ' + recipe.readyInMinutes + 'min'
        divRecipe.appendChild(cookTime)

        controlbutton(divRecipe, buttonDisplay, recipe)

        return divRecipe
    }

    searchbutton.addEventListener('click', () => {
        sectionResult.classList.toggle('result-is-open')

        sectionSearch.classList.toggle('search-haved-result')
        searchWrap.classList.toggle('wrap-result-is-open')
        resultFoodIngredients.innerHTML = ''
        searchRecipes()
    })
})
