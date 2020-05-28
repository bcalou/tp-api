const covidUrl = "https://covid-19-data.p.rapidapi.com/";
const smartableUrl = "https://api.smartable.ai/coronavirus/";
const globalInfos = document.getElementById("globalInfos");
const countryInfos = document.getElementById("countryInfos");
const countryWrapper = document.querySelector(".country__infosWrapper");
const sectionArrow = document.querySelector(".country__logoArrow");
var country = "";

// Régler la date maximale des input date à la date de la veille
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

// to open/close section
sectionArrow.addEventListener("click", () =>
  openCloseSection(countryWrapper, sectionArrow)
);

const openCloseSection = (target, arrow) => {
  target.classList.toggle("open");
  arrow.classList.toggle("up");
};

// FETCH
// Requête API pour récupérer les chiffres clés à l'échelle internationnale
const getLatestTotalNews = () => {
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
// Requête API pour récupérer les chiffres clés concernant le pays selectionné
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
// Requête API pour récupérer les 3 articles en haut de page
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
// Requête API pour récupérer un rapport journalier selon le pays ou global
const getReportByDate = (date, display) => {
  getUrl(date, display)
    .then((res) => res.json())
    .then((res) => display(res[0]))
    .catch((err) => console.log(err));
};
const getUrl = (date, display) => {
  if (display == displayGlobalReport) {
    return fetch(
      `https://covid-19-data.p.rapidapi.com/report/totals?date-format=YYYY-MM-DD&date=${date}`,
      {
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key":
            "3d86517768msh18b4bf9f9e7c3f5p11f8c5jsn94a6ed37a08b",
        },
      }
    );
  } else if (display == displayCountryReport) {
    return fetch(
      `https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&date=${date}&name=${country}`,
      {
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key":
            "3d86517768msh18b4bf9f9e7c3f5p11f8c5jsn94a6ed37a08b",
        },
      }
    );
  }
};

// Méthodes de récupération ou de transformation d'informations
// Méthode de récupération du pays selectionné grâce à un input
const getCountry = (form) => {
  country = form.querySelector("input[name]").value.toLowerCase();
  if (country && country !== ("united-states" || "united states")) {
    getLatestCountryStats(country);
  }
  if (country == ("united-states" || "united states")) {
    country = "usa";
    getLatestCountryStats(country);
  }
};
// Méthode de récupération de la date selectionnée grâce à un formulaire
const getDate = (form, display) => {
  const date = form.querySelector("input[name]").value;
  if (date) {
    getReportByDate(date, display);
  }
};
// Méthode de transformation de date au format voulu
const transformDate = (initialDate) => {
  const date = `${initialDate.slice(0, 10)} ${initialDate.slice(11, 16)}`;
  return date;
};

// Affichage des templates créés à partir des informations récupérées depuis les APIs
// Affiche le template des chiffres clés à l'échelle globale
const displayGlobalStats = (global) => {
  globalInfos.innerHTML = `${createStatsTemplate(global)}`;
};
// Affiche le template des chiffres clés à l'échelle d'un pays
const displayCountryStats = (country) => {
  countryInfos.innerHTML = `${createStatsTemplate(country)}`;
  document.querySelector("#countryReportDate").removeAttribute("disabled");
};
// Affiche le template des chiffres clés à l'échelle globale
const displayGlobalArticles = (articles) => {
  const globalNews = document.querySelector(".global__articles");
  for (let i = 0; i < 3; i++) {
    const child = createArticleTemplate(articles.news[i]);
    child.classList.add("articles__item--global");
    globalNews.appendChild(child);
  }
};
// Affiche le template des articles concernant le pays selectionné
const displayCountryArticles = (articles) => {
  const articlesContainer = document.querySelector(".country__articles");
  articlesContainer
    .querySelectorAll("article")
    .forEach((article) => articlesContainer.removeChild(article));
  articles.news.forEach((article) =>
    articlesContainer.appendChild(createArticleTemplate(article))
  );
};
// Affiche le template du rapport journalier à l'échelle globale
const displayGlobalReport = (report) => {
  let global = true;
  document.querySelector(
    ".history__report"
  ).innerHTML = `${createReportTemplate(report, global)}`;
};
// Affiche le template du rapport journalier à la date choisie et du pays choisi
const displayCountryReport = (report) => {
  let global = false;
  countryInfos.innerHTML = `${createReportTemplate(report, global)}`;
};

// Création de template HTML
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
const createReportTemplate = (report, global) => {
  if (!global) {
    var date = report.date;
    var confirmed = report.provinces[0].confirmed;
    var recovered = report.provinces[0].recovered;
    var deaths = report.provinces[0].deaths;
  } else {
    var date = report.date;
    var confirmed = report.confirmed;
    var recovered = report.recovered;
    var deaths = report.deaths;
  }
  const infos = `
  <div class="dataContainer dataContainer">
  <div class="dataContainer__dataWrapper">
    <p class="dataContainer__data dataContainer__data--reportDate">${date}</p>
  </div>
  <div class="dataContainer__dataWrapper">
    <p class="dataContainer__data dataContainer__data--report">${confirmed}</p>
    <span>Confirmed cases</span>
    </div>
  <div class="dataContainer__dataWrapper ">
    <p class="dataContainer__data dataContainer__data--report">${recovered}</p>
    <span> Recovered</span>
    </div>
  <div class="dataContainer__dataWrapper">
    <p class="dataContainer__data dataContainer__data--report">${deaths}</p>
    <span>Deaths</span>
  </div>
</div>
  `;
  return infos;
};

// Appel des fonction de fetch pour la récupération de données
document.addEventListener("DOMContentLoaded", () => {
  getLatestTotalNews();
  getLatestArticles("global", displayGlobalArticles);
});

document.querySelector(".form--country").addEventListener("submit", (e) => {
  e.preventDefault();
  getCountry(e.target);
});

document.querySelector(".form--history").addEventListener("submit", (e) => {
  e.preventDefault();
  getDate(e.target, displayGlobalReport);
});

document
  .querySelector(".form--countryHistory")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    getDate(e.target, displayCountryReport);
  });
