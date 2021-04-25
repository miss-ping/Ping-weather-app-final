function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function findImageSource(icon) {
  let mappings = {};
  mappings["01d"] = "src/imgs/01d-clear-sky.svg";
  mappings["01n"] = "src/imgs/01n-clear-sky.svg";
  mappings["02d"] = "src/imgs/02d-few-clouds.svg";
  mappings["02n"] = "src/imgs/02n-few-clouds.svg";
  mappings["03d"] = "src/imgs/03d-broken-clouds.svg";
  mappings["03n"] = "src/imgs/03n-broken-clouds.svg";
  mappings["04d"] = "src/imgs/04d-scattered-clouds.svg";
  mappings["04n"] = "src/imgs/04n-scattered-clouds.svg";
  mappings["09d"] = "src/imgs/09d-shower-rain.svg";
  mappings["09n"] = "src/imgs/09n-shower-rain.svg";
  mappings["10d"] = "src/imgs/10d-rain.svg";
  mappings["10n"] = "src/imgs/10n-rain.svg";
  mappings["11d"] = "src/imgs/11d-thunderstorm.svg";
  mappings["11n"] = "src/imgs/11n-thunderstorm.svg";
  mappings["13d"] = "src/imgs/13d-snow.svg";
  mappings["13n"] = "src/imgs/13n-snow.svg";
  mappings["50d"] = "src/imgs/50d-mist.svg";
  mappings["50n"] = "src/imgs/50n-mist.svg";

  return mappings[icon];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    let forecastIconSrc = findImageSource(forecastDay.weather[0].icon);

    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-3">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <img src="${forecastIconSrc}"
             alt="" 
             width=56px
             />
           <div class="forecast-temperatures">
              <span class="forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}º</span>
              <span class="forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}º</span>
           </div>
        </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "51c757e95cb1fdd4bc45100437afbefb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let maximumTemperature = document.querySelector("#temp-max");
  let minimumTemperature = document.querySelector("#temp-min");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  maximumTemperature.innerHTML = Math.round(response.data.main.temp_max);
  minimumTemperature.innerHTML = Math.round(response.data.main.temp_min);

  //Change main icon
  let forecastIconSrc = findImageSource(response.data.weather[0].icon);

  iconElement.setAttribute("src", `${forecastIconSrc}`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "51c757e95cb1fdd4bc45100437afbefb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Lisbon");
