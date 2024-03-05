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

  return `${day} ${hours}:${minutes}`;
}

function displayData(response) {
  console.log(response);

  let currentTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  currentTime.innerHTML = formatDate(date);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
}
function searchCity(event) {
  event.preventDefault();

  let searchFormCity = document.querySelector("#search-form-input");
  let appCity = document.querySelector("#weather-app-city");
  appCity.innerHTML = searchFormCity.value;
}
let weatherSearchForm = document.querySelector("#weather-search-form");

weatherSearchForm.addEventListener("submit", searchCity);

let city = "Paris";
let apiKey = "344fd2b82ccb20at17163b1f587bo614";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayData);
