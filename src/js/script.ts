const api_container: HTMLElement = document.querySelector(".api-container");
const team_label = document.getElementById("teams");
const matches_label = document.getElementById("matches");
const players_label = document.getElementById("players");

team_label.addEventListener("click", function () {
  team_label.classList.add("checked");
  getTeams();
});

matches_label.addEventListener("click", function () {
  getMatches();
});

players_label.addEventListener("click", function () {
  getPlayers();
});

function createElement(options: any): any {
  const $element: HTMLElement = document.createElement(options.type);

  if (options.text) {
    $element.textContent = options.text;
  }

  if (options.parent) {
    options.parent.appendChild($element);
  }

  return $element;
}

function getTeams() {
  api_container.innerHTML = "";
  fetch("https://montanaflynn-fifa-world-cup.p.rapidapi.com/teams", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "montanaflynn-fifa-world-cup.p.rapidapi.com",
      "x-rapidapi-key": "71fea3a677msh9dfdecf8d453fbdp152364jsn1613eff848fb",
      accepts: "json",
    },
  })
    .then((response) => response.json())

    .then((response) => {
      console.log(response);
      response.forEach((e: any) => {
        var $team = document.createElement("article");
        createElement({
          type: "p",
          text: e.code,
          parent: $team,
        });
        createElement({ type: "p", text: e.title, parent: $team });
        api_container.appendChild($team);
        return $team;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getMatches() {
  api_container.innerHTML = "";
  fetch("https://montanaflynn-fifa-world-cup.p.rapidapi.com/games", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "montanaflynn-fifa-world-cup.p.rapidapi.com",
      "x-rapidapi-key": "71fea3a677msh9dfdecf8d453fbdp152364jsn1613eff848fb",
      accepts: "json",
    },
  })
    .then((response) => response.json())

    .then((response) => {
      console.log(response);
      response.forEach((e: any) => {
        var $match = document.createElement("article");
        createElement({
          type: "p",
          text: "Groupe " + e.group_id,
          parent: $match,
        });
        createElement({ type: "p", text: e.team1_id, parent: $match });
        createElement({ type: "p", text: e.score1, parent: $match });
        createElement({ type: "p", text: e.score2, parent: $match });
        createElement({ type: "p", text: e.team2_id, parent: $match });
        api_container.appendChild($match);
        return $match;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPlayers() {
  api_container.innerHTML = "";
  fetch("https://montanaflynn-fifa-world-cup.p.rapidapi.com/persons", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "montanaflynn-fifa-world-cup.p.rapidapi.com",
      "x-rapidapi-key": "71fea3a677msh9dfdecf8d453fbdp152364jsn1613eff848fb",
      accepts: "json",
    },
  })
    .then((response) => response.json())

    .then((response) => {
      response.forEach((e: any) => {
        var $player = document.createElement("article");
        createElement({ type: "p", text: e.name, parent: $player });
        api_container.appendChild($player);
        return $player;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getTeamNameByID(teamID) {
  fetch("https://montanaflynn-fifa-world-cup.p.rapidapi.com/teams", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "montanaflynn-fifa-world-cup.p.rapidapi.com",
      "x-rapidapi-key": "71fea3a677msh9dfdecf8d453fbdp152364jsn1613eff848fb",
      accepts: "json",
    },
  })
    .then((response) => response.json())

    .then((response) => {
      response.forEach((e: any) => {
        if ((teamID = e.id)) {
          console.log(e.title);
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function selectMenu() {}
