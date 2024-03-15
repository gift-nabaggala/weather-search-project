function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function displayData(response) {
  console.log(response);

  let appCity = document.querySelector("#weather-app-city");
  appCity.innerHTML = response.data.city;

  let currentTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  currentTime.innerHTML = formatDate(date);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let iconElement = document.querySelector("#icon");
  iconUrl = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${iconUrl}">`;

  let temperatureElement = document.querySelector("#temperature");
  let temp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temp);

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "344fd2b82ccb20at17163b1f587bo614";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayData);
}
function searchCitySubmit(event) {
  event.preventDefault();
  let searchFormCity = document.querySelector("#search-form-input");

  searchCity(searchFormCity.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "344fd2b82ccb20at17163b1f587bo614";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div >
            <img src="${
              day.condition.icon_url
            }"  class="weather-forecast-icon"/>
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">
                ${Math.round(day.temperature.minimum)}°
              </div>
            </div>
          </div>
`;
    }
  });

  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}
let weatherSearchForm = document.querySelector("#weather-search-form");

weatherSearchForm.addEventListener("submit", searchCitySubmit);
