var apiKey = "a55b9587095f1ce63827f16c4ab8c6ef";
var searchBtn = $("#search-btn");
var historyBtn = $("#history-btn");
var searchInput = $("#search-input");
var city;
var formEl = $("#search-form");
var bodyEl = $("body");
var navEl = $("nav");
var prevSearchEl = $(".prev-search");
var weatherContent = $(".weather-content");
var currDayCity = $("#cur-day-city");
var date = dayjs().format("M/D/YYYY");
var currentTime = dayjs().format("H");
var currDayDate;
var numArray = ["1", "2", "3", "4", "5"];
var historyArray;

if (currentTime > 19 || currentTime < 6) {
  bodyEl.attr("class", "night-mode-body");
  navEl.attr({
    class: "night-mode-content",
    style: "border-bottom: 2px solid white; padding: 5px;",
  });
  $(".direct").attr("style", "color: white;");
  prevSearchEl.attr({
    class: "prev-search col-12 col-md-2 col-lg-2 night-mode-content",
  });
}

$(function () {
  renderBtns();
  function renderBtns() {
    var historyString = localStorage.getItem("historyArr");
    if (historyString === null) {
      historyArray = [];
    } else {
      historyArray = JSON.parse(historyString);
      for (var i = 0; i < historyArray.length; i++) {
        var btnEl = $("<button>");
        btnEl.attr({
          id: "history-btn",
          type: "button",
          class: "btn btn-info w-100 custom-btn",
        });
        btnEl.text(historyArray[i]);
        prevSearchEl.append(btnEl);
      }
    }
  }

  function histBtnForecast(event) {
    document
      .querySelector(".weather-content")
      .setAttribute("style", "visibility: visible;");
    city = $(event.target).text();

    var currDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    fetch(currDayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var icon;
        if (data.weather[0].main === "Clear") {
          icon = "☀";
        } else if (data.weather[0].main === "Clouds") {
          icon = "☁";
        } else {
          icon = "🌧";
        }
        currDayCity.text(`${data.name} ${date} ${icon}`);
        $("#cur-day-temp").text(`Temp: ${Math.floor(data.main.temp)} °F`);
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

  function getForecastApi(event) {
    event.preventDefault();
    document
      .querySelector(".weather-content")
      .setAttribute("style", "visibility: visible;");
    city = searchInput.val().trim();
    searchInput.val("");
    var currDayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    console.log(city);
    if (city !== "") {
      fetch(currDayUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          if (data.cod !== 200) {
            alert("Invalid input, please check spelling.");
          } else {
            if (historyArray.includes(city)) {
            } else {
              var btnEl = $("<button>");
              btnEl.attr({
                id: "history-btn",
                type: "button",
                class: "btn btn-info w-100 custom-btn",
              });
              btnEl.text(city);
              prevSearchEl.append(btnEl);
              historyArray.push(city);
              if (historyArray.length > 8) {
                historyArray.shift();
                $(prevSearchEl).children("button").eq(0).remove();
              }
            }
            localStorage.setItem("historyArr", JSON.stringify(historyArray));
            var icon;
            if (data.weather[0].main === "Clear") {
              icon = "☀";
            } else if (data.weather[0].main === "Clouds") {
              icon = "☁";
            } else {
              icon = "🌧";
            }
            currDayCity.text(`${data.name} ${date} ${icon}`);
            $("#cur-day-temp").text(`Temp: ${Math.floor(data.main.temp)} °F`);
            $("#cur-day-wind").text(`Wind: ${data.wind.speed.toFixed(2)} MPH`);
            $("#cur-day-humidity").text(`Humidity: ${data.main.humidity}%`);
          }
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
              `Temp: ${Math.floor(dataArr[i].main.temp)} °F`
            );
            $(`#fut-wind${numArray[i]}`).text(
              `Wind: ${(dataArr[i].wind.speed * 2.237).toFixed(2)} MPH`
            );
            $(`#fut-hum${numArray[i]}`).text(
              `Humidity: ${dataArr[i].main.humidity}%`
            );
          }
        });
    } else alert("Must enter a valid city");
  }

  formEl.on("submit", getForecastApi);
  $(document).on("click", "#history-btn", histBtnForecast);
  //Clear, Clouds, Rain
});
