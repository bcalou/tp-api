console.log('Hello world');
const apiUrl="https://api.thedogapi.com/v1/images/search?limit=5&page=10&order=Desc";
const element = document.getElementById("container");
const press = document.getElementById('press');
function call() {
    fetch(`${apiUrl}/breeds/`)
    .then((res) => res.json())
    .then((data) => showDogs(data))
    .catch((err) => {
    console.log(err);
});
}
function showDogs(dog) {
    element.innerHTML = 
    dog.map(el=>{
        return `<img src="${el.url}"/>`
    });
}
press.addEventListener('click', call)