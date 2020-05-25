$(document).ready(() =>{
  $('#searchForm').on('submit' , (e)=>{
    let searchText = $('#searchText').val();
    getMeals(searchText);
    e.preventDefault();
  });
  });
  
  
  function getMeals(searchText){
  axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s='+searchText)
    .then((response) => {
      console.log(response);
      let meals = response.data;
      console.log(meals);
      
      let output = '';
      $.each(meals, (index, meal) => {
        output += `
        <div class="col-md-3">
        <div class="well text-center">
        <img src="${meals.strMealThumb}"/>
        <h5>${meals.strMeal}</h5>
        <a onclick="mealSelected('${meals.idMeal}')"class="btn btn-prymary" href="#">Meal Details</a>
        </div>
        </div>
        `;
      });
        $('#meals').html(output);
    })
  };  
  