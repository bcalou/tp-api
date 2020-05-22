//const accessToken: string = "10218347135043962";
import axios from "axios";

function getHero(): void {
  axios
    .get("https://superheroapi.com/api/10218347135043962/80")
    .then(function (response: any): any {
      let res = response.json();
      console.log(res);
    })
    .catch(function (error: any): any {
      console.log(error);
    });
}

getHero();
