var apiKey = "a55b9587095f1ce63827f16c4ab8c6ef";
var searchBtn = $("#search-btn");
var historyBtn = $("#history-btn");
var searchInput = $("#search-input");
var city;
var formEl = $("#search-form");
var weatherContent = $("#weather-content");
var currDayCity = $("#cur-day-city");
var date = dayjs().format("M/D/YYYY");
var currDayDate;
var numArray = ["1", "2", "3", "4", "5"];

console.log(date);
function getCurrentDayApi() {}

function getForecastApi(event) {
  event.preventDefault();
  city = searchInput.val().trim();
  var currDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${apiKey}&units=imperial`;
  var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}&units=imperial`;
  console.log(city);
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

  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var dataArr = [
        data.list[0],
        data.list[8],
        data.list[16],
        data.list[24],
        data.list[32],
      ];
      var icon;
      for (var i = 0; i < dataArr.length; i++) {
        if (dataArr[i].weather[0].main === "Clear") {
          icon = "☀";
        } else if (dataArr[i].weather[0].main === "Clouds") {
          icon = "☁";
        } else {
          icon = "🌧";
        }

        var date = dataArr[i].dt_txt.split("").splice(0, 10).join("");
        var imperialDate = dayjs(date).format("M/D/YYYY");

        $(`#fut-date${numArray[i]}`).text(imperialDate);
        $(`#fut-icon${numArray[i]}`).text(icon);
        $(`#fut-temp${numArray[i]}`).text(
          `Temp: ${Math.floor(dataArr[i].main.temp)} °F `
        );
        $(`#fut-wind${numArray[i]}`).text(
          `Wind: ${(dataArr[i].wind.speed * 2.237).toFixed(2)} MPH`
        );
        $(`#fut-hum${numArray[i]}`).text(
          `Humidity: ${dataArr[i].main.humidity}%`
        );
      }
    });
}

formEl.on("submit", getForecastApi);
//Clear, Clouds, Rain
