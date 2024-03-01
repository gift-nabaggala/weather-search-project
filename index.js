function searchCity(event) {
  event.preventDefault();

  let searchFormCity = document.querySelector("#search-form-input");
  let appCity = document.querySelector("#weather-app-city");
  appCity.innerHTML = searchFormCity.value;
}
let weatherSearchForm = document.querySelector("#weather-search-form");

weatherSearchForm.addEventListener("submit", searchCity);
