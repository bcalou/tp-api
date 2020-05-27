let URL = 'https://www.themealdb.com/api/json/v1/1/'


const $name = document.querySelector('.name')
const $btn = document.querySelector('.btn')
const $btn_random = document.querySelector('.btn_random')
const $recipe = document.querySelector('.recipe')
const $recipe__instructions = document.querySelector('.recipe__instructions')
const $image = document.querySelector('.image')
const $title = document.querySelector('.title')
const $ingredients = document.querySelector('.ingredients')
const $country = document.querySelector('.country')
const $country__icon = document.querySelectorAll('.country__icon')
const $cards = document.querySelector('.cards')
const $form = document.querySelector('.form')


displayNoneRecipe()

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

    $recipe.style.display = 'block'
    $recipe.style.boxShadow = '0px 3px 5px rgba(0,0,0,0.2)'
    $ingredients.classList.add('ingredients_style')
    $recipe__instructions.textContent = '';
    $title.textContent = '';
    $ingredients.textContent = '';
    $image.textContent = '';
    $title.textContent = facts.meals[0].strMeal

    $image.appendChild(createEl({ type: 'img', content: null, attribut: 'src', attributContent: facts.meals[0].strMealThumb }))

    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            $ingredients.appendChild(createEl({ type: 'li', content: `${facts.meals[0][`strIngredient${i}`]}` }))
        }
    }
    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            $recipe__instructions.appendChild(createEl({ type: 'li', content: `${facts.meals[0][`strIngredient${i}`]} - ${facts.meals[0][`strMeasure${i}`]}` }))
        }
    }

}


$country__icon.forEach(item => (
    item.addEventListener('click', () => {
        event.preventDefault()
        let value = item.getAttribute('data-country');

        fetch(`${URL}filter.php?a=${value}`)
            .then(res => res.json())
            .then(displayNoneRecipe())
            .then(facts => showCountryMeal(facts))
            .catch(e => error(value))
    })
))

function showCountryMeal(facts) {
    $cards.textContent = ''

    facts.meals.forEach(item => {
        card = createEl({ type: 'div', content: null, attribut: null, attibutContent: null, class: 'card' })
        card.appendChild(createEl({ type: 'img', content: null, attribut: 'src', attributContent: item.strMealThumb, class: 'card__img' }))
        card.appendChild(createEl({ type: 'p', content: item.strMeal }))
        card.appendChild(createEl({ type: 'p', content: 'Decouvrir plus_', attribut: null, attibutContent: null, class: 'linkToMeal' }))
        $cards.appendChild(card)
        card.addEventListener('click', () => searchMealById(item))
    })
}

function searchMealById(item) {
    fetch(`${URL}lookup.php?i=${item.idMeal}`)
        .then(res => res.json())
        .then(facts => showIdMeal(facts))
        .catch(e => error(value))
}

function showIdMeal(facts) {
    $cards.textContent = ''
    const card = createEl({ type: 'div', content: null, attribut: null, attributContent: null, class: 'card__img--id' })
    card.appendChild(createEl({ type: 'img', content: null, attribut: 'src', attributContent: facts.meals[0].strMealThumb }))
    cardDetails = createEl({ type: 'div', content: null, attribut: null, attributContent: null, class: 'cards__details' })
    cardDetails__ul = createEl({ type: 'ul' })
    cardDetails.appendChild(createEl({ type: 'p', content: facts.meals[0].strMeal }))



    recipe__instructions = createEl({ type: 'ol', content: null, attribut: null, attributContent: null, class: 'recipe__instructions' })
    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            cardDetails__ul.appendChild(recipe__instructions.appendChild(createEl({ type: 'li', content: `${facts.meals[0][`strIngredient${i}`]} - ${facts.meals[0][`strMeasure${i}`]}` })))
        }
    }
    cardDetails.appendChild(cardDetails__ul)
    if (facts.meals[0].strSource) {
        cardDetails.appendChild(createEl({
            type: 'a', content: 'Voir la recette en détails', attribut: 'href', attributContent: facts.meals[0].strSource, secondAttribut: 'target', secondAttributContent: '_blank'
        }))
    } else {
        cardDetails.appendChild(createEl({
            type: 'p', content: "La video ne comporte pas de video ou d'article 🧐"
        }))
    }
    $cards.appendChild(card)
    $cards.appendChild(cardDetails)


    card.addEventListener('click', () => {
        console.log(facts);
    })
}



function error(value) {
    const errorMessage = createEl({
        type: 'p',
        content: `Aucune recette trouver a ce nom : ${value}`,
        class: 'error'
    })
    $recipe__instructions.appendChild(errorMessage)
}

function createEl({ type: type, content: content, attribut: attribut, attributContent: attributContent, class: elClass, secondAttribut: secondAttribut, secondAttributContent: secondAttributContent }) {
    const el = document.createElement(type)
    el.setAttribute(attribut, attributContent)
    el.setAttribute(secondAttribut, secondAttributContent)
    el.className = elClass
    el.textContent = content
    return el
}
function displayNoneRecipe() {
    $recipe.style.display = 'none'
}
