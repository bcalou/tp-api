console.log("test fichier pages ts")
let $btns = document.querySelectorAll('.pages');
console.log($btns)

$btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.classList.add('active')
    })

})