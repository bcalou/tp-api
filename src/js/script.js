fetch(
  "https://qrcode-monkey.p.rapidapi.com/qr/custom?size=600&file=png&config=%257B%2522bodyColor%2522%253A%20%2522%25230277BD%2522%252C%20%2522body%2522%253A%2522mosaic%2522%257D&data=https%253A%252F%252Fwww.qrcode-monkey.com",
  {
    method: "GET",
    headers: {
      "x-rapidapi-host": "qrcode-monkey.p.rapidapi.com",
      "x-rapidapi-key": "0e3b2f113cmsh6119eec9b8692f4p1ae835jsnad6863134eb4",
    },
  }
)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
