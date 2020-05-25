const covidUrl = "https://covid-19-data.p.rapidapi.com/";
const newsUrl = "https://api.smartable.ai/coronavirus/news/FR";
const globalInfos = document.getElementById("globalInfos");
const countryInfos = document.getElementById("countryInfos");
const countryWrapper = document.querySelector(".country-wrapper");
const section1Arrow = document.querySelector(".section__logoArrow");
const section2Arrow = document.querySelector(
  ".section--country .section__logoArrow"
);

section1Arrow.addEventListener("click", () =>
  openCloseSection(globalInfos, section1Arrow)
);
section2Arrow.addEventListener("click", () =>
  openCloseSection(countryWrapper, section2Arrow)
);

const openCloseSection = (target, arrow) => {
  target.classList.toggle("open");
  arrow.classList.toggle("up");
};

const getLatestTotalNews = () => {
  totalReq();
};

const totalReq = () => {
  fetch(`${covidUrl}totals`, {
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
  globalInfos.innerHTML = `<p>${createTemplate(global)}</p>`;
};

document.addEventListener("DOMContentLoaded", getLatestTotalNews);

const getLatestCountryNews = (form) => {
  const countryName = form.querySelector("input[name]").value.toLowerCase();
  if (countryName) {
    fetch(`${covidUrl}country?name=${countryName}`, {
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
  countryInfos.innerHTML = `<div class="dataContainer">${createTemplate(
    country
  )}</div>`;
};

const createTemplate = (infos) => {
  const info = `
  <p class="dataContainer__data dataContainer__data--date">Last update: ${infos.lastUpdate}</p>
  <p class="dataContainer__data dataContainer__data--confirmed">${infos.confirmed} confirmed cases</p>
  <p class="dataContainer__data dataContainer__data--recovered">${infos.recovered} recovered</p>
  <p class="dataContainer__data dataContainer__data--critical">${infos.critical} critical cases</p>
  <p class="dataContainer__data dataContainer__data--deaths">${infos.deaths} deaths</p>
  `;
  return info;
};

const getLatestAllCountriesNews = () => {
  fetch(`${covidUrl}country/all`, {
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "3d86517768msh18b4bf9f9e7c3f5p11f8c5jsn94a6ed37a08b",
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// const getLatestArticles = () => {
//   fetch(newsUrl, {
//     headers: {

//     }
//   })
//     .then((res) => res.json())
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// };

// document.addEventListener("DOMContentLoaded", getLatestArticles);

document
  .querySelector(".allCountries")
  .addEventListener("click", getLatestAllCountriesNews);

document.querySelector(".countryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  getLatestCountryNews(e.target);
});
