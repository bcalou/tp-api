fetch('https://api.yelp.com/v3/businesses/search?location=paris&term=barby', {
  headers: {
    Authorization:
      'Bearer BJ6aDrgieREkgR1s4AxSmCO6EDrSYSAOtfunJ4dhnYBIV9KukRxbOnWzzFP0haS1u6NhaxQuJrwnc0KgfjCtdPCQM30dOW0GOcWsL8-vqflR36McZ6SvmlLPCy3FXnYx',
    'Access-Control-Allow-Origin': '*',
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
