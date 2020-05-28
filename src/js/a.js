$(document).ready(() => {
    $("#searchForm").on("submit", (e) => {
      let searchText = $("#searchText").val();
      getMeals(searchText);
      e.preventDefault();
    });
  });

  
  ///////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////

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
          <div class="col-md-3">
          <div class="well text-center">
          <img src="${meal.strMealThumb}"/>
          <h5>${meal.strMeal}</h5>
          <a onclick="mealSelected('${meal.idMeal}')" class=" btn btn-primary" href="#">Meal Details</a>
          </div>
          </div>
          `;
        });
        $("#meals").html(output);
      });
  }


/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


  function mealSelected(idMeal) {
    sessionStorage.setItem("mealId", idMeal);
    window.location = "meal.html";
  }
  