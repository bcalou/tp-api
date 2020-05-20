console.log('Hello world');
const apiUrl="https://pokeapi.co/api/v2";

fetch(`${apiUrl}/pokemon/`)
.then(Response=>console.log(Response.json())) 