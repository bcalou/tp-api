const $btns = document.querySelectorAll('.pages');
const $h1 = document.querySelector('h1')
const h1Txt1 = "Search"
const h1Txt2 = "App"
console.log($btns)

$btns.forEach((btn, index) => {
    $btns[0].classList.add('active')
    btn.addEventListener('click', () => {
        let btnOn = document.querySelector('.active')
        btnOn ? btnOn.classList.remove('active') : ''
        btn.classList.add('active')

        if (btnOn) {
            switch (index) {
                case 0 : 
                    $h1.textContent = `${h1Txt1} Animes ${h1Txt2}`
                    break
                case 1 :
                    $h1.textContent = `${h1Txt1} Mangas ${h1Txt2}`
                    break
                }
            }
        }
    )})


//let btnOn = document.querySelector('.active')
