require('axios');
let body = document.querySelector('body')
/*
axios.defaults.baseURL = 'https://api.github.com/'
axios.get('users')
  .then(res => console.log(res.data))
  .catch(err => console.error(err))
*/

axios.defaults.baseURL = 'https://kitsu.io/api/edge'
axios.get('anime')
  .then(res => {
    console.log(res.data.data)
    allFunctionsCalls(res)
    console.log("www")
  })
  .catch(err => console.error(err))

const allFunctionsCalls = (res) => {
  animeName(res)
  animeImg(res)
}

const animeName = (res) => {
  let resName = res.data.data;
  for (i = 0; i < resName.length; i++) {
    let h2 = document.createElement('h2')
    h2.append(resName[i].attributes.abbreviatedTitles)
    body.append(h2)
  }
}

const animeImg = (res) => {
  let resImg = res.data.data
  for (j = 0; j < resImg.length; j++) {
    let image = document.createElement('img')
    image.src = resImg[j].attributes.posterImage.medium
    body.append(image) 
  }
}



 /* attributes:
abbreviatedTitles: ["COWBOY BEBOP"]
ageRating: "R"
ageRatingGuide: "17+ (violence & profanity)"
averageRating: "82.62"
canonicalTitle: "Cowboy Bebop"
coverImage:
large: "https://media.kitsu.io/anime/cover_images/1/large.jpg?1519178801"

*/