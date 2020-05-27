const gameId = localStorage.getItem('id');

getGameInfos();

function getGameInfos() {
    const url = ''.concat('https://api.rawg.io/api/games/', gameId);
    fetch(url)
    .then(result => result.json())
    .then(data => {
        document.querySelector('.picture').src = data.background_image;
        getPlatforms(data.platforms);
        document.querySelector('.title').textContent = data.name;
        document.querySelector('.description').innerHTML = data.description;
    });
}

function getPlatforms(data) {
    data.forEach(platforms => {
        console.log(platforms.platform.name)
        document.querySelector('.platforms').textContent += `\x0a${platforms.platform.name},`;
    });
}
