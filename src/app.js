//overview information

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

  return `${day} ${hours}:${minutes}`;
}
//weather forecast
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//overview temperature description
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsElement = document.querySelector("#feels");
  let humidityElement = document.querySelector("#humidity");
  let maxElement = document.querySelector("#max");
  let minElement = document.querySelector("#min");
  let dateElement = document.querySelector("#date");
  let icon = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconDisplay = document.querySelector("#icon");
  iconDisplay.setAttribute("src", `media/${icon}.png`);
}

//error message
function errorFunction(error) {
  alert("Oopsi! 🥑Location does not exist.");
}

//search city
function searchCity(city) {
  let apiKey = "f54498ba0c2b84b117a6bad5fe404784";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature).catch(errorFunction);

  //weather forecast by hour
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//forecast by day
function displayForecast(response) {
  console.log(response);
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let dayOne = new Date(response.data.list[4].dt * 1000);
  let dayTwo = new Date(response.data.list[12].dt * 1000);
  let dayThree = new Date(response.data.list[20].dt * 1000);
  let dayFour = new Date(response.data.list[28].dt * 1000);
  let dayFive = new Date(response.data.list[36].dt * 1000);

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `<div class="col day-one">
            <div class="row-4 day-col">
                ${days[dayOne.getDay()]}
            </div>
             <div class="row-4 icon-col">
                <img src="media/${response.data.list[4].weather[0].icon}.png">
        </div>
            <div class="row-4 hi-col">
                ${Math.round(response.data.list[4].main.temp)}°
            </div>
        </div>
        <div class="col day-two">
            <div class="row-4 day-col">
                    ${days[dayTwo.getDay()]}
            </div>
            <div class="row-4 icon-col">
                <img src="media/${response.data.list[12].weather[0].icon}.png">
        </div>
            <div class="row-4 hi-col">
                    ${Math.round(response.data.list[12].main.temp)}°
             </div>
     </div>
    <div class="col day-three">
        <div class="row-4 day-col">
             ${days[dayThree.getDay()]}
          </div>
          <div class="row-4 icon-col">
                <img src="media/${response.data.list[20].weather[0].icon}.png">
        </div>
         <div class="row-4 hi-col">
              ${Math.round(response.data.list[20].main.temp)}° 
        </div>
    </div>
    <div class="col day-four">
        <div class="row-4 day-col">
            ${days[dayFour.getDay()]}
        </div>
                <div class="row-4 icon-col">
                <img src="media/${response.data.list[28].weather[0].icon}.png">
        </div>
        <div class="row-4 hi-col">
            ${Math.round(response.data.list[28].main.temp)}°
        </div>
    </div>
    <div class="col day-five">
        <div class="row-4 day-col">
            ${days[dayFive.getDay()]}
        </div>
        <div class="row-4 icon-col">
                <img src="media/${response.data.list[36].weather[0].icon}.png">
        </div>
        <div class="row-4 hi-col">
            ${Math.round(response.data.list[36].main.temp)}°
        </div>
    </div>
    </div>`;
}

// unit conversion
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  //remove the active class fahrenheit
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//current location
function searchLocation(position) {
  let apiKey = "f54498ba0c2b84b117a6bad5fe404784";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature).catch(errorFunction);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// default search
searchCity("Barcelona");
