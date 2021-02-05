function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let feelsElement = document.querySelector("#feels");
  let humidityElement = document.querySelector("#humidity");
  let maxElement = document.querySelector("#max");
  let minElement = document.querySelector("#min");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsElement.innerHTML = response.data.main.feel_like;
  humidityElement.innerHTML = response.data.main.humidity;
  maxElement.innerHTML = response.data.main.max;
  minElement.innerHTML = response.data.main.min;
}
let apiKey = "f54498ba0c2b84b117a6bad5fe404784";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
