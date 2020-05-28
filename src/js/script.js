

console.log('Hello world');

const url = "https://api.spoonacular.com";

const apiKey = "f83af0a20fb547e58f300c2995697b60"


	const testBtn = document.querySelector(".test");
  const container1 = document.querySelector(".test2");
  const container2 = document.querySelector(".test3");
  const container3 = document.querySelector(".test4");
  const container4 = document.querySelector(".test5");
  const container5 = document.querySelector(".test6");
  const container6 = document.querySelector(".test7");
  const btnRecipe1 = document.querySelector('.add-recipe1');
  const btnRecipe2 = document.querySelector('.add-recipe2');
  const btnRecipe3 = document.querySelector('.add-recipe3');
  const btnRecipe4 = document.querySelector('.add-recipe4');
  const btnRecipe5 = document.querySelector('.add-recipe5');
  const recipe1 = document.querySelector('.recipe1');
  const recipe2 = document.querySelector('.recipe2');
  const recipe3 = document.querySelector('.recipe3');
  const recipe4 = document.querySelector('.recipe4');
  const recipe5 = document.querySelector('.recipe5');
  


const getPizza = () => {
  fetch(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=f83af0a20fb547e58f300c2995697b60&query=pizza&number=10&ingredients"
  )
    .then((res) => res.json(res))
    .then((res) => displayImage(res))
    .catch((err) => {
      console.log(err);
    }); 
};

const displayImage = (res) => {
  container1.style.background = `url(${res.results[0].image}) no-repeat`;
  container2.style.background = `url(${res.results[1].image}) no-repeat`;
  container3.style.background = `url(${res.results[2].image}) no-repeat`;
  container4.style.background = `url(${res.results[3].image}) no-repeat`;
  container5.style.background = `url(${res.results[4].image}) no-repeat`;
  container6.style.background = `url(${res.results[5].image}) no-repeat`;
};  


testBtn.addEventListener("click", getPizza, getRecipes,)


 
const getRecipes = () => {
  fetch(
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=f83af0a20fb547e58f300c2995697b60&query=pizza&number=10&ingredients"
  )
    .then((res) => res.json(res))
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    }); 
};

