const covidUrl = "https://covid-19-data.p.rapidapi.com/";
const smartableUrl = "https://api.smartable.ai/coronavirus/";
const globalInfos = document.getElementById("globalInfos");
const countryInfos = document.getElementById("countryInfos");
const countryWrapper = document.querySelector(".country-wrapper");
const sectionArrow = document.querySelector(
  ".section--country .section__logoArrow"
);

sectionArrow.addEventListener("click", () =>
  openCloseSection(countryWrapper, sectionArrow)
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
  globalInfos.innerHTML = `${createStatsTemplate(global)}`;
};

document.addEventListener("DOMContentLoaded", getLatestTotalNews);

const getCountry = (form) => {
  const countryName = form.querySelector("input[name]").value.toLowerCase();
  if (countryName) {
    getLatestCountryNews(countryName);
  }
};

const getLatestCountryNews = (countryName) => {
  fetch(`${covidUrl}country?name=${countryName}`, {
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "3d86517768msh18b4bf9f9e7c3f5p11f8c5jsn94a6ed37a08b",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      displayCountryNews(res[0]);
      getLatestCountryArticles(res[0].code);
    })
    .catch((err) => console.log(err));
};

const displayCountryNews = (country) => {
  countryInfos.innerHTML = `${createStatsTemplate(country)}`;
};

const getLatestCountryArticles = (countryCode) => {
  fetch(`https://api.smartable.ai/coronavirus/news/${countryCode}`, {
    headers: {
      "Subscription-Key": "02e702b6f6a44031bf3037c3f3f0e25d",
    },
  })
    .then((res) => res.json())
    .then((res) => displayCountryArticles(res))
    .catch((err) => console.log(err));
};

const displayCountryArticles = (articles) => {
  const articlesContainer = document.querySelector(".country-articles");
  articles.news.forEach((article) =>
    articlesContainer.appendChild(createArticleTemplate(article))
  );
};

const createArticleTemplate = (article) => {
  const articleItem = document.createElement("article");
  articleItem.innerHTML = `
  <h3>${article.title}</h3>
  <span>${article.publishedDateTime}</span>
  <p>${article.excerpt}</p>
  <a href="${article.webUrl}">Read more</a>
`;
  return articleItem;
};

const createStatsTemplate = (infos) => {
  const info = `
  <div class="dataContainer">
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--date">${infos.lastUpdate}</p>
      <span>Last update</span>
      </div>
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--confirmed">${infos.confirmed}</p>
      <span>Confirmed cases</span>
      </div>
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--recovered">${infos.recovered}</p>
      <span> Recovered</span>
      </div>
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--critical">${infos.critical}</p>
      <span>Critical cases</span>
      </div>
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--deaths">${infos.deaths}</p>
      <span>Deaths</span>
    </div>
  </div>
  `;
  return info;
};

document.querySelector(".countryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  getCountry(e.target);
});
