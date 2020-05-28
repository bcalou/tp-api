import './animes'

window.onload = function() {
    console.log('test')
    class Router {
        constructor(name:string, routes:Array<object>) {
            name
            routes
        }
    }
    var view = document.querySelector('#view')
    var pages = new Router('pages', [
        {
            path: '/',
            name: 'animes'
        },
        {
            path: '/mangas',
            name: 'mangas'
        }
    ]);
    var currentPath = window.location.pathname
    console.log("chemin ", currentPath)
    console.log(pages)
    if (currentPath === "/") {
        
    } else {}
}