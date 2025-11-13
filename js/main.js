var API_KEY = "c9e9598820fb4bdb8e6205615251211";
var search = document.querySelector(".search");
var searchBtn = document.querySelector(".find");
var loading = document.querySelector(".loading");
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var today = new Date();
var todayIndex = today.getDay();
var firstDay = days[todayIndex];
var secondDay = days[(todayIndex + 1) % 7];
var thirdDay = days[(todayIndex + 2) % 7];

var options = { day: "numeric", month: "long" };
var firstDate = today.toLocaleDateString("en-US", options);

var secondDateObj = new Date();
secondDateObj.setDate(today.getDate() + 1);
var secondDate = secondDateObj.toLocaleDateString("en-US", options);

var thirdDateObj = new Date();
thirdDateObj.setDate(today.getDate() + 2);
var thirdDate = thirdDateObj.toLocaleDateString("en-US", options);

async function apiWeather(city) {
  loading.classList.remove("d-none");
  try {
    var data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no`
    );
    var finalResponse = await data.json();
    displayWeather(finalResponse);
  } catch (error) {
    console.log(error);
  }
  finally{
    loading.classList.add("d-none");
  }
}

searchBtn.addEventListener("click", function () {
  var city = search.value.trim();
  apiWeather(city);
});

function displayWeather(array) {
  var cards = "";
  cards += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="weather-card text-center">
          <div class="weather-header">
            <h3>${firstDay}</h3>
            <span class="date">${firstDate}</span>
          </div>
          <div class="weather-body">
            <img src="https:${array.forecast.forecastday[0].day.condition.icon}" class="weather-icon" 
            alt="${array.forecast.forecastday[0].day.condition.text}">
            <h2 class="degree">${array.forecast.forecastday[0].day.avgtemp_c}°</h2>
            <p class="condition">${array.forecast.forecastday[0].day.condition.text}</p>
          </div>
          <div class="weather-footer">
            <p>🌡️ ${array.forecast.forecastday[0].day.mintemp_c}° / ${array.forecast.forecastday[0].day.maxtemp_c}°</p>
            <p>💧 Humidity ${array.forecast.forecastday[0].day.avghumidity}% • 🌬️ Wind ${array.forecast.forecastday[0].day.maxwind_kph} kph</p>
            <span class="location">
              <i class="fa-solid fa-location-dot"></i>
              ${array.location.name}, ${array.location.country}
            </span>
          </div>
        </div>
      </div>`;

  cards += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="weather-card text-center">
          <div class="weather-header">
            <h3>${secondDay}</h3>
            <span class="date">${secondDate}</span>
          </div>
          <div class="weather-body">
            <img src="https:${array.forecast.forecastday[1].day.condition.icon}" class="weather-icon" 
            alt="${array.forecast.forecastday[1].day.condition.text}">
            <h2 class="degree">${array.forecast.forecastday[1].day.avgtemp_c}°</h2>
            <p class="condition">${array.forecast.forecastday[1].day.condition.text}</p>
          </div>
          <div class="weather-footer">
            <p>🌡️ ${array.forecast.forecastday[1].day.mintemp_c}° / ${array.forecast.forecastday[1].day.maxtemp_c}°</p>
            <p>💧 Humidity ${array.forecast.forecastday[1].day.avghumidity}% • 🌬️ Wind ${array.forecast.forecastday[1].day.maxwind_kph} kph</p>
            <span class="location">
              <i class="fa-solid fa-location-dot"></i>
              ${array.location.name}, ${array.location.country}
            </span>
          </div>
        </div>
      </div>`;

  cards += `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="weather-card text-center">
          <div class="weather-header">
            <h3>${thirdDay}</h3>
            <span class="date">${thirdDate}</span>
          </div>
          <div class="weather-body">
            <img src="https:${array.forecast.forecastday[2].day.condition.icon}" class="weather-icon" 
            alt="${array.forecast.forecastday[2].day.condition.text}">
            <h2 class="degree">${array.forecast.forecastday[2].day.avgtemp_c}°</h2>
            <p class="condition">${array.forecast.forecastday[2].day.condition.text}</p>
          </div>
          <div class="weather-footer">
            <p>🌡️ ${array.forecast.forecastday[2].day.mintemp_c}° / ${array.forecast.forecastday[2].day.maxtemp_c}°</p>
            <p>💧 Humidity ${array.forecast.forecastday[2].day.avghumidity}% • 🌬️ Wind ${array.forecast.forecastday[2].day.maxwind_kph} kph</p>
            <span class="location">
              <i class="fa-solid fa-location-dot"></i>
              ${array.location.name}, ${array.location.country}
            </span>
          </div>
        </div>
      </div>`;
  document.querySelector(".myInner").innerHTML = cards;
}
