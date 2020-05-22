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
  .then(res => animeName(res))
  .catch(err => console.error(err))

  const animeName = (res) => {
    let resName = res.data.data;
    for (i = 0; i < resName.length; i++) {
      let h2 = document.createElement('h2')
      h2.append(res.data.data[i].attributes.abbreviatedTitles)
      body.append(h2)
    }
}