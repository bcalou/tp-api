const $body = document.querySelector('body')

axios.defaults.baseURL = 'https://kitsu.io/api/edge'
axios.get('anime')
  .then(res => {
    allFunctionsCalls(res)
    console.log(res.data.data)
  })
  .catch(err => console.error(err))

const allFunctionsCalls = (res) => {
  animeElement(res);
}

const animeElement = (res) => {
  let results = res.data.data;
  results.forEach((result => {
    let image = document.createElement('img')
    image.src = result.attributes.posterImage.medium
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    h2.append(result.attributes.slug)
    div.append(h2)
    $body.append(image, div)
  }))
}