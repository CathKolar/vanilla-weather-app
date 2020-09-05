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
  return `${day} <br/> ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let dt = new Date(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[dt.getDay()];
  return `${day}`;
}
function displayForcast(response) {
  let forcastElement = document.querySelector("#forcast");
  forcastElement.innerHTML = null;
  let forcast = null;
  for (let index = 1; index < 6; index++) {
    forcast = response.data.daily[index];
    forcastCelciusHigh = Math.round(response.data.daily[index].temp.max);
    forcastCelciusLow = Math.round(response.data.daily[index].temp.min);
    forcastElement.innerHTML += ` <div class="col-2.4 day">
   <h5> ${formatDay(forcast.dt * 1000)}</h5>
       <div >
        <img  class="weather-icon-future" src= "http://openweathermap.org/img/wn/${
          response.data.daily[0].weather[0].icon
        }@2x.png"> </img>
       </div>
       <div class="temp-high-low-future"><strong><span id="forcast-high">${Math.round(
         forcastCelciusHigh
       )}</span>º</strong> | <span id= "forcast-low">${Math.round(
      forcastCelciusLow
    )}</span>º</div>
    </div>`;
  }
}
function displayTemperature(response) {
  celciusButton.classList.add("active");
  farenheitButton.classList.remove("active");
  celciusTemperature = Math.round(response.data.main.temp);
  todayCelciusHigh = Math.round(response.data.main.temp_max);
  todayCelciusLow = Math.round(response.data.main.temp_min);
  document.querySelector("#high-temp-today").innerHTML = Math.round(
    todayCelciusHigh
  );

  document.querySelector("#low-temp-today").innerHTML = Math.round(
    todayCelciusLow
  );
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    celciusTemperature
  )}`;
  document.querySelector("#temp-symbol").innerHTML = "ºC";
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#image")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#image")
    .setAttribute("alt", response.data.weather[0].description);

  let latitude = response.data.coord.lat;
  let longitude = response.data.coord.lon;
  let apiKey = "6feaf6a8d604af91166c8484867322e7";
  let units = "metric";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${units}&exclude={part}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForcast);
}

function search(city) {
  let apiKey = "6feaf6a8d604af91166c8484867322e7";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
function searchLocation(position) {
  let apiKey = "6feaf6a8d604af91166c8484867322e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayFarenheitTemperature(event) {
  event.preventDefault();
  celciusButton.classList.remove("active");
  farenheitButton.classList.add("active");
  let farenheitTemperature = Math.round(celciusTemperature * 9) / 5 + 32;
  let farenheitTemperatureHigh = Math.round(todayCelciusHigh * 9) / 5 + 32;
  let farenheitTemperatureLow = Math.round(todayCelciusLow * 9) / 5 + 32;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    farenheitTemperature
  );
  document.querySelector("#temp-symbol").innerHTML = "ºF";
  document.querySelector("#high-temp-today").innerHTML = Math.round(
    farenheitTemperatureHigh
  );
  document.querySelector("#low-temp-today").innerHTML = Math.round(
    farenheitTemperatureLow
  );

  let forcastHigh = document.querySelectorAll("#forcast-high");
  let forcastLow = document.querySelectorAll("#forcast-low");
  forcastHigh.forEach(function (max) {
    let farenheitForcastHigh = max.innerHTML;
    max.innerHTML = `${Math.round((farenheitForcastHigh * 9) / 5 + 32)}`;
  });
  forcastLow.forEach(function (min) {
    let farenheitForcastLow = min.innerHTML;
    min.innerHTML = `${Math.round((farenheitForcastLow * 9) / 5 + 32)}`;

    farenheitButton.removeEventListener("click", displayFarenheitTemperature);
    celciusButton.addEventListener("click", displayCelciusTemperature);
  });
}
function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusButton.classList.add("active");
  farenheitButton.classList.remove("active");
  document.querySelector("#current-temperature").innerHTML = Math.round(
    celciusTemperature
  );
  document.querySelector("#high-temp-today").innerHTML = Math.round(
    todayCelciusHigh
  );
  document.querySelector("#low-temp-today").innerHTML = Math.round(
    todayCelciusLow
  );

  document.querySelector("#temp-symbol").innerHTML = "ºC";
  let forcastHigh = document.querySelectorAll("#forcast-high");
  let forcastLow = document.querySelectorAll("#forcast-low");
  forcastHigh.forEach(function (max) {
    let celciusForcastHigh = max.innerHTML;
    max.innerHTML = `${Math.round(((celciusForcastHigh - 32) * 5) / 9)}`;
  });
  forcastLow.forEach(function (min) {
    let celciusForcastLow = min.innerHTML;
    min.innerHTML = `${Math.round(((celciusForcastLow - 32) * 5) / 9)}`;
  });
  farenheitButton.addEventListener("click", displayFarenheitTemperature);
  celciusButton.removeEventListener("click", displayCelciusTemperature);
}

let celciusTemperature = null;
let todayCelciusHigh = null;
let todayCelciusLow = null;
let forcastCelciusHigh = null;
let forcastCelciusLow = null;

let farenheitButton = document.querySelector("#button-f");
farenheitButton.addEventListener("click", displayFarenheitTemperature);

let celciusButton = document.querySelector("#button-c");
celciusButton.addEventListener("click", displayCelciusTemperature);

let currentLocationButton = document.querySelector(".current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Seville");

let form = document
  .querySelector("#search-city")
  .addEventListener("submit", handleSubmit);
