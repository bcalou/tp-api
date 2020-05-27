headers = new Headers({
  Authorization: "Bearer IdwS1_wg3L3aTbw-q05t",
});

fetch(
  "https://the-one-api.herokuapp.com/v1/character/5cd99d4bde30eff6ebccfdf3",
  { headers }
)
  .then((res) => res.json())
  .then((data) => console.log(data));
