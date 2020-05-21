require('axios');
let body = document.querySelector('body')
/*
axios.defaults.baseURL = 'https://api.github.com/'
axios.get('users')
  .then(res => console.log(res.data))
  .catch(err => console.error(err))
*/

//axios.defaults.baseURL = 'https://api.github.com/'
axios.get('http://api.open-notify.org/iss-now.json')
  .then(res => console.log(res.data))
  .catch(err => console.error(err))