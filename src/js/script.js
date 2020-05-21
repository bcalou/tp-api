const url = "https://covid-19-data.p.rapidapi.com/";
const globalInfos = document.getElementById("globalInfos");
const countryInfos = document.getElementById("countryInfos");

const getLatestTotalNews = () => {
  globalReq();
};

const globalReq = () => {
  fetch(`${url}totals`, {
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "3d86517768msh18b4bf9f9e7c3f5p11f8c5jsn94a6ed37a08b",
    },
  })
    .then((res) => res.json())
    .then((res) => displayGlobalNews(res[0]))
    .catch((err) => {
      console.log(err);
    });
};

const displayGlobalNews = (global) => {
  globalInfos.appendChild(createTemplate(global));
};

document.addEventListener("DOMContentLoaded", getLatestTotalNews);

const getLatestCountryNews = (form) => {
  const countryName = form.querySelector("input[name]").value.toLowerCase();
  if (countryName) {
    fetch(`${url}country?name=${countryName}`, {
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "3d86517768msh18b4bf9f9e7c3f5p11f8c5jsn94a6ed37a08b",
      },
    })
      .then((res) => res.json())
      .then((res) => displayCountryNews(res[0]))
      .catch((err) => {
        console.log(err);
      });
  }
};

const displayCountryNews = (country) => {
  countryInfos.appendChild(createTemplate(country));
};

const createTemplate = (infos) => {
  const info = document.createElement("p");
  info.textContent = `
  Last update: ${infos.lastUpdate}
  ${infos.confirmed} confirmed cases
  ${infos.recovered} recovered
  ${infos.critical} critical cases
  ${infos.deaths} deaths
  `;
  return info;
};

document.querySelector(".countryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  getLatestCountryNews(e.target);
});
