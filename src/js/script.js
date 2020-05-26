let todaycontent = document.getElementById("todaycontent");
let latercontent = document.getElementById("latercontent");

function get(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function todayclick() {
  let url =
    "http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=247b84c35424911c499563ba4305dfe2&units=metric";
  let text = get(url);
  let json = JSON.parse(text);
  var textnode = document.createTextNode(json.main.temp);
  todaycontent.appendChild(textnode);
}

var today = document.getElementById("today");
today.addEventListener("click", todayclick, false);

let input = document.getElementById("city");

function laterclick() {
  let url =
    "http://api.openweathermap.org/data/2.5/forecast?id=2988507&appid=247b84c35424911c499563ba4305dfe2&units=metric";
  let text = get(url);
  let json = JSON.parse(text);
  var textnode = document.createTextNode(
    JSON.stringify(json.list[1].main.temp)
  );
  latercontent.appendChild(textnode);
}

var later = document.getElementById("in5days");
later.addEventListener("click", laterclick, false);
