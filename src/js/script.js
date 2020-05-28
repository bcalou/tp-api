// Constant URL value for JAAS API
const FT_API_URL = "https://api.funtranslations.com/translate/";

function translateSentence() {
  var tmp = verifyInput();
  if (!tmp.result) {
    console.log(tmp);
    return;
  }

  var query = `?text=${encodeURI(tmp.text)}`;
  var url = FT_API_URL + tmp.type + query;

  makeAPIRequest(url, function (res) {
    console.log("res2", res);
    if (!res.result) {
      console.log("Error contacting api, see error", res);
      return;
    }

    var body = res.body;
    console.log("BODY", body);
  });
}

function makeAPIRequest(url) {
  axios
    .get(url)
    .then(function (body) {
      callback({ result: true, body: body });
    })
    .catch(function (error) {
      callback({ result: false, error: error });
    });
}

function verifyInput() {
  var elem = document.getElementById("phrase");
  var type = document.getElementById("selectbox");

  if (!elem.value || elem.value == "") {
    return { result: false };
  }

  if (type.value == "") {
    return { result: false };
  }

  return {
    result: true,
    text: elem.value,
    type: type.value,
  };
}
