let URL = 'https://www.themealdb.com/api/json/v1/1/'


const $name = document.querySelector('.name')
const $btn = document.querySelector('.btn')
const $btn_random = document.querySelector('.btn_random')

const $recipe = document.querySelector('.recipe')
const $recipe__instructions = document.querySelector('.recipe__instructions')
const $image = document.querySelector('.image')
const $title = document.querySelector('.title')
const $ingredients = document.querySelector('.ingredients')




$btn.addEventListener('click', () => {
    event.preventDefault()
    let value = $name.value;

    fetch(`${URL}search.php?s=${value}`)
        .then(res => res.json())
        .then(facts => showText(facts))
        .catch(e => error(value))
})

$btn_random.addEventListener('click', () => {
    event.preventDefault()
    let value = $name.value;

    fetch(`${URL}random.php`)
        .then(res => res.json())
        .then(facts => showText(facts))
        .catch(e => error(value))
})


function showText(facts) {
    $recipe__instructions.textContent = '';
    $title.textContent = '';
    $ingredients.textContent = '';
    $image.textContent = '';


    $title.textContent = facts.meals[0].strMeal

    const img = document.createElement('img')
    img.setAttribute('src', facts.meals[0].strMealThumb)
    $image.appendChild(img)

    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            const li = document.createElement('li');
            li.textContent = `${facts.meals[0][`strIngredient${i}`]}`
            $ingredients.appendChild(li)
        }
    }

    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            const li = document.createElement('li');
            li.textContent = `${facts.meals[0][`strIngredient${i}`]} - ${facts.meals[0][`strMeasure${i}`]}`
            $recipe__instructions.appendChild(li)
        }
    }
}


function error(value) {
    $recipe__instructions.textContent = `Aucune recette trouver a ce nom : ${value}`
}


