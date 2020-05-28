var callBackGetSuccess = function (data) {
  console.log("weather api", data);
  var element = document.getElementById("weather_zone");
  element.innerHTML = "meteo de paris : " + data.main.temp;
};

function buttonClickGet() {
  var url =
    "http://www.infoclimat.fr/public-api/gfs/json?_ll=48.85341,2.3488&_auth=CRMCFQd5VXdQfVViBnBQeVkxU2YKfAcgUCwCYQxpAH1UPwJjB2ddO1M9A34GKQcxAC0EZw02BzcEbwtzCngFZAljAm4HbFUyUD9VMAYpUHtZd1MyCioHIFA7AmYMfwBiVD4Cbwd6XT1TPwNgBigHMQA3BGQNLQcgBGYLaQpuBWYJbAJhB2ZVNVA%2BVTQGKVB7WW9TZgpmB2lQYQI3DGQAZlRkAmcHbV06U28DZQYoBzAANgRhDTQHPgRgC2gKZwV5CXUCHwcXVSpQf1V1BmNQIll3U2YKawdr&_c=9d9198f2bd443a6a886d2711cf3dfb94";

  $.get(url, callBackGetSuccess)
    .done(function () {
      //alert( "second sucess" );
    })
    .fail(function () {
      alert("error");
    })
    .always(function () {
      //alert ( "finished" );
    });
}
