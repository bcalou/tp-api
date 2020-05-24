fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian')
.then(function(response){
  return response.json()
}).then(function(data){
  console.log(data);
  
})