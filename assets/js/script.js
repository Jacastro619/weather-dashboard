var apiKey = "a55b9587095f1ce63827f16c4ab8c6ef";
var city = "fresno";
var searchBtn = $("#search-btn");
var historyBtn = $("#history-btn");
var searchInput = $("#search-input");
var formEl = $("#search-form");
var weatherContent = $("#weather-content");
var currDayCity = $("#cur-day-city");
var date = dayjs().format("M/D/YYYY");
var currDayDate;

var currDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
var forecastUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
console.log(date);
function getCurrentDayApi() {
  fetch(currDayUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var icon;
      if (data.weather[0].main === "Clear") {
        icon = "☀";
      } else if (data.weather[0].main === "Clouds") {
        icon = "☁";
      } else {
        icon = "🌧";
      }
      currDayCity.text(`${data.name} ${date} ${icon}`);
      $("#cur-day-temp").text(`Temp: ${Math.floor(data.main.temp)}`);
      $("#cur-day-wind").text(`Wind: ${data.wind.speed.toFixed(2)} MPH`);
      $("#cur-day-humidity").text(`Humidity: ${data.main.humidity}%`);
    });
}

function getForecastApi() {
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var icon;
      if (data.weather[0].main === "Clear") {
        icon = "☀";
      } else if (data.weather[0].main === "Clouds") {
        icon = "☁";
      } else {
        icon = "🌧";
      }
    });
}

getCurrentDayApi();

//Clear, Clouds, Rain
