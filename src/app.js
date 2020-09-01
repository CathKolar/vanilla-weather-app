function displayTemperature(response) {
  document.querySelector("#high-temp-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp-today").innerHTML = Math.round(
  );
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector(".current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
}
let apiKey = "6feaf6a8d604af91166c8484867322e7";
let city = "Duluth";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
