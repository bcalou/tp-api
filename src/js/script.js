// search-bar

$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMeals(searchText);
    e.preventDefault();
  });
});

//get meal whith axios ( get (API Mealdb))
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
    <a href="${meal.strYoutube}"><li class="list-group-item"><strong>Simple Instructions in Video Here ! </li></a>
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
