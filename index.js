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
  let date = new Date(response.data.dt * 1000);
  currentTime.innerHTML = formatDate(date);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

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

let apiKey = "8914d369cdad4fdf805b6088475a669b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metrics`;

axios.get(apiUrl).then(displayData);
