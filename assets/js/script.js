var apiKey;
var city = "seattle";
var searchBtn = $("#search-btn");
var historyBtn = $("#history-btn");
var searchInput = $("#search-input");
var formEl = $("#search-form");
var weatherContent = $("#weather-content");
var currDayCity = $("#cur-day-city");
var date = dayjs().format("M/D/YYYY");
var currDayDate;

var testUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a55b9587095f1ce63827f16c4ab8c6ef&units=imperial`;
console.log(date);
function getCurrentDayApi() {
  fetch(testUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var icon;
      var rawDate = data.list[0].dt_txt.split("").splice(0, 10).join("");
      var finalDate = dayjs(rawDate).format("M/D/YYYY");
      if (data.list[0].weather[0].main === "Clear") {
        icon = "☀";
      } else if (data.list[0].weather[0].main === "Clouds") {
        icon = "☁";
      } else {
        icon = "🌧";
      }
      currDayCity.text(`${data.city.name} ${finalDate} ${icon}`);
      $("#cur-day-temp").text(`Temp: ${Math.floor(data.list[0].main.temp)}`);
      $("#cur-day-wind").text(
        `Wind: ${(data.list[0].wind.speed * 2.237).toFixed(2)} MPH`
      );
      $("#cur-day-humidity").text(`Humidity: ${data.list[0].main.humidity}%`);
    });
}

getCurrentDayApi();

//Clear, Clouds, Rain
