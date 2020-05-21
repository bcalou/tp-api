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
  .then(res => console.log(res.data))
  .catch(err => console.error(err))