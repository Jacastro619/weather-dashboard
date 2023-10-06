var apiKey;
var city;
var searchBtn = $("#search-btn");
var historyBtn = $("#history-btn");
var searchInput = $("#search-input");
var formEl = $("#search-form");
var weatherContent = $("#weather-content");

var testUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=san%20jose&appid=a55b9587095f1ce63827f16c4ab8c6ef&units=imperial&cnt=1";

function getApi() {
  fetch(testUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.list.length; i++) {
        var temp = Math.floor(data.list[0].main.temp);
        var humidity = data.list[0].main.humidity;
        console.log(temp, humidity);
      }
    });
}

getApi();
