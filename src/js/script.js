$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMeals(searchText);
    e.preventDefault();
  });
});


 function createContent(options) {
        const $content = document.createElement(options.type);
        
        if (options.text) {
          $content.textContent = options.text;  
        }
        
        if (options.$parent) {
          options.$parent.appendChild($content); 
        }
        
        return $content;
      }


function getMeals(searchText) {
  axios
    .get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchText)
    .then((response) => {
      console.log(response);
      let meals = response.data.meals;
      console.log(meals);


      let output = "";
      $.each(meals, (index, meal) => {
        output += `
        <div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <div class="col-md-3">
        <div class="well text-center">
        
       <div class="row">
    <div class="col-md-4">
    <img src="${meal.strMealThumb}" class="thumbnail"/>
    <br>
    <h2>${meal.strMeal}</h2>
    </div>
        </button>
      </h2>
    </div>
    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
    <div class="card-body">
    <div class="col-md-8">
    
    <ul class="list-group">
    <li class="list-group-item"><strong>Origin:</strong> ${meal.strArea}</li>
    <li class="list-group-item"><strong>Category:</strong> ${meal.strCategory}</li>
    <li class="list-group-item"><strong>Ingredient:</strong><br></li>
    <li class="list-group-item"><br>${meal.strMeasure1} ${meal.strIngredient1}</li>
    <li class="list-group-item"><br>${meal.strMeasure2} ${meal.strIngredient2}</li>
    <li class="list-group-item"><br>${meal.strMeasure3} ${meal.strIngredient3}</li>
    <li class="list-group-item"><br>${meal.strMeasure4} ${meal.strIngredient4}</li>
    <li class="list-group-item"><br>${meal.strMeasure5} ${meal.strIngredient5}</li>
    <li class="list-group-item"><br>${meal.strMeasure6} ${meal.strIngredient6}</li>
    <li class="list-group-item"><br>${meal.strMeasure7} ${meal.strIngredient7}</li>
    <li class="list-group-item"><br>${meal.strMeasure8} ${meal.strIngredient8}</li>
    <li class="list-group-item"><br>${meal.strMeasure9} ${meal.strIngredient9}</li>
    <li class="list-group-item"><br>${meal.strMeasure10} ${meal.strIngredient10}</li>
    <li class="list-group-item"><br>${meal.strMeasure11} ${meal.strIngredient11}</li>
    <li class="list-group-item"><br>${meal.strMeasure12} ${meal.strIngredient12}</li>
    <li class="list-group-item"><br>${meal.strMeasure13} ${meal.strIngredient13}</li>
    <li class="list-group-item"><br>${meal.strMeasure14} ${meal.strIngredient14}</li>
    <li class="list-group-item"><br>${meal.strMeasure15} ${meal.strIngredient15}</li>
    <li class="list-group-item"><br>${meal.strMeasure16} ${meal.strIngredient16}</li>
    <li class="list-group-item"><br>${meal.strMeasure17} ${meal.strIngredient17}</li>
    <li class="list-group-item"><br>${meal.strMeasure18} ${meal.strIngredient18}</li>
    <li class="list-group-item"><br>${meal.strMeasure19} ${meal.strIngredient19}</li>
    <li class="list-group-item"><br>${meal.strMeasure20} ${meal.strIngredient20}</li>
    <li class="list-group-item"><strong>Instruction:</strong><br>${meal.strInstructions}</li>
    <a href="${meal.strYoutube}"><li class="list-group-item"><strong>Youtube Video  </li></a>
    </ul>
    </div>
    </div>
    </div>
  </div>
</div>   
    
    `;
  });
  $("#meals").html(output);
});
}