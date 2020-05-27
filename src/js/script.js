const covidUrl = "https://covid-19-data.p.rapidapi.com/";
const smartableUrl = "https://api.smartable.ai/coronavirus/";
const globalInfos = document.getElementById("globalInfos");
const countryInfos = document.getElementById("countryInfos");
const countryWrapper = document.querySelector(".country__infosWrapper");
const sectionArrow = document.querySelector(".country__logoArrow");

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
    .then((res) => displayGlobalStats(res[0]))
    .catch((err) => {
      console.log(err);
    });
};

const displayGlobalStats = (global) => {
  globalInfos.innerHTML = `${createStatsTemplate(global)}`;
};

document.addEventListener("DOMContentLoaded", () => {
  getLatestTotalNews();
  getLatestArticles("global", displayGlobalArticles);
});

const getCountry = (form) => {
  const countryName = form.querySelector("input[name]").value.toLowerCase();
  if (countryName && countryName !== ("united-states" || "united states")) {
    getLatestCountryStats(countryName);
  }
  if (countryName == ("united-states" || "united states")) {
    getLatestCountryStats("usa");
  }
};

const getLatestCountryStats = (countryName) => {
  fetch(`${covidUrl}country?name=${countryName}`, {
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "3d86517768msh18b4bf9f9e7c3f5p11f8c5jsn94a6ed37a08b",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      displayCountryStats(res[0]);
      getLatestArticles(res[0].code, displayCountryArticles);
    })
    .catch((err) => console.log(err));
};

const displayCountryStats = (country) => {
  countryInfos.innerHTML = `${createStatsTemplate(country)}`;
};

const displayGlobalArticles = (articles) => {
  const globalNews = document.querySelector(".global__articles");
  for (let i = 0; i < 3; i++) {
    const child = createArticleTemplate(articles.news[i]);
    child.classList.add("articles__item--global");
    globalNews.appendChild(child);
  }
};

const getLatestArticles = (countryCode, display) => {
  fetch(`https://api.smartable.ai/coronavirus/news/${countryCode}`, {
    headers: {
      "Subscription-Key": "02e702b6f6a44031bf3037c3f3f0e25d",
    },
  })
    .then((res) => res.json())
    .then((res) => display(res))
    .catch((err) => console.log(err));
};

const displayCountryArticles = (articles) => {
  const articlesContainer = document.querySelector(".country__articles");
  articlesContainer
    .querySelectorAll("article")
    .forEach((article) => articlesContainer.removeChild(article));
  articles.news.forEach((article) =>
    articlesContainer.appendChild(createArticleTemplate(article))
  );
};

const createArticleTemplate = (article) => {
  const articleItem = document.createElement("article");
  articleItem.classList.add("articles__item");
  articleItem.innerHTML = `
  <a class="articles__itemTitleWrapper" href="${article.webUrl}">
    <h3 class="articles__itemTitle">${article.title}</h3>
  </a> 
  <span class="articles__itemDate">${transformDate(
    article.publishedDateTime
  )}</span>
  <p class="articles__itemTeaser">${article.excerpt}</p>
  <a class="articles__itemLink" href="${article.webUrl}">Learn more</a>
  <a class="articles__itemProvider" href="${article.provider.domain}">${
    article.provider.domain
  }</a>
`;
  return articleItem;
};

const transformDate = (initialDate) => {
  const date = `${initialDate.slice(0, 10)} ${initialDate.slice(11, 16)}`;
  return date;
};

const createStatsTemplate = (infos) => {
  const info = `
  <div class="dataContainer">
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--date">${transformDate(
        infos.lastUpdate
      )}</p>
    </div>
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--confirmed">${
        infos.confirmed
      }</p>
      <span>Confirmed cases</span>
      </div>
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--recovered">${
        infos.recovered
      }</p>
      <span> Recovered</span>
      </div>
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--critical">${
        infos.critical
      }</p>
      <span>Critical cases</span>
      </div>
    <div class="dataContainer__dataWrapper">
      <p class="dataContainer__data dataContainer__data--deaths">${
        infos.deaths
      }</p>
      <span>Deaths</span>
    </div>
  </div>
  `;
  return info;
};

document.querySelector(".form--country").addEventListener("submit", (e) => {
  e.preventDefault();
  getCountry(e.target);
});

const getDate = (form) => {
  const date = form.querySelector("input[name]").value;
  if (date) {
    getReportByDate(date);
  }
};

const getReportByDate = (date) => {
  fetch(
    `https://covid-19-data.p.rapidapi.com/report/totals?date-format=YYYY-MM-DD&date=${date}`,
    {
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "3d86517768msh18b4bf9f9e7c3f5p11f8c5jsn94a6ed37a08b",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => displayReport(res[0]))
    .catch((err) => console.log(err));
};

let today = new Date();
let dd = today.getDate() - 1;
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = `0${dd}`;
}
if (mm < 10) {
  mm = `0${mm}`;
}
today = `${yyyy}-${mm}-${dd}`;
document.getElementById("reportDate").setAttribute("max", today);

const displayReport = (report) => {
  document.querySelector(
    ".history__report"
  ).innerHTML = `${createReportTemplate(report)}`;
};

const createReportTemplate = (report) => {
  const infos = `
  <div class="dataContainer">
  <div class="dataContainer__dataWrapper">
    <p class="dataContainer__data dataContainer__data--date">${report.date}</p>
  </div>
  <div class="dataContainer__dataWrapper">
    <p class="dataContainer__data dataContainer__data--confirmed">${report.confirmed}</p>
    <span>Confirmed cases</span>
    </div>
  <div class="dataContainer__dataWrapper">
    <p class="dataContainer__data dataContainer__data--recovered">${report.recovered}</p>
    <span> Recovered</span>
    </div>
  <div class="dataContainer__dataWrapper">
    <p class="dataContainer__data dataContainer__data--deaths">${report.deaths}</p>
    <span>Deaths</span>
  </div>
</div>
  `;
  return infos;
};

document.querySelector(".form--history").addEventListener("submit", (e) => {
  e.preventDefault();
  getDate(e.target);
});
