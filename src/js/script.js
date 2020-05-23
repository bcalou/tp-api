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

    $image.appendChild(createEl('img', null, 'src', facts.meals[0].strMealThumb))

    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            $ingredients.appendChild(createEl('li', `${facts.meals[0][`strIngredient${i}`]}`))
        }
    }
    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            $recipe__instructions.appendChild(createEl('li', `${facts.meals[0][`strIngredient${i}`]} - ${facts.meals[0][`strMeasure${i}`]}`))
        }
    }
}


function error(value) {
    $recipe__instructions.textContent = `Aucune recette trouver a ce nom : ${value}`
}

function createEl(type, content, src, srcContent, elClass) {
    const el = document.createElement(type)
    el.setAttribute(src, srcContent)
    el.className = elClass
    el.textContent = content
    return el
}

$country__icon.forEach(item => (
    item.addEventListener('click', () => {
        event.preventDefault()
        let value = item.getAttribute('data-country');

        fetch(`${URL}filter.php?a=${value}`)
            .then(res => res.json())
            .then(facts => showCountryMeal(facts))
            .catch(e => error(value))
    })
))

function showCountryMeal(facts) {
    $cards.textContent = ''

    facts.meals.forEach(item => {
        card = createEl('div', null, null, null, 'card')
        card.appendChild(createEl('img', null, 'src', item.strMealThumb, 'card__img'))
        card.appendChild(createEl('p', item.strMeal))
        card.appendChild(createEl('p', 'Decouvrir plus_', null, null, 'linkToMeal'))
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
    card = createEl('div', null, null, null, 'card__img--id')
    card.appendChild(createEl('img', null, 'src', facts.meals[0].strMealThumb))
    cardDetails = createEl('div', null, null, null, 'cards__details')
    cardDetails.appendChild(createEl('p', facts.meals[0].strMeal))
    recipe__instructions = createEl('ol', null, null, null, 'recipe__instructions')
    for (let i = 1; i < 20; i++) {
        if (facts.meals[0][`strIngredient${i}`]) {
            cardDetails.appendChild(recipe__instructions.appendChild(createEl('li', `${facts.meals[0][`strIngredient${i}`]} - ${facts.meals[0][`strMeasure${i}`]}`)))
        }
    }

    $cards.appendChild(card)
    $cards.appendChild(cardDetails)

    card.addEventListener('click', () => {
        console.log(facts.meals[0].strIngredient1);
    })
}




