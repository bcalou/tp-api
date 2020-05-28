const $btns:NodeListOf<HTMLElement> = document.querySelectorAll('.pages');
let $label:HTMLElement = document.querySelector('label')
const $h1 = document.querySelector('h1')
const [h1Txt1, h1Txt2] = ["Search", "App"]
const labelTxt = "Recherchez un"
const $input = document.querySelector('#search')

$btns.forEach((btn:HTMLElement, index:number) => {
    $btns[0].classList.add('active')
    btn.addEventListener('click', ():void => {
        let btnOn:HTMLElement = document.querySelector('.active')
        btnOn ? btnOn.classList.remove('active') : ''
        btn.classList.add('active')
        btnOn ? index === 0 ? $h1.textContent = `${h1Txt1} Animes ${h1Txt2}` : $h1.textContent = `${h1Txt1} Mangas ${h1Txt2}` : ''
        btnOn ? index === 0 ? $label.textContent = `${labelTxt} anime` : $label.textContent = `${labelTxt} manga` : ''
        btnOn ? index === 0 ? $input.placeholder = "eyeshield-21" : $input.placeholder = "mar heaven" : ''
    })
})