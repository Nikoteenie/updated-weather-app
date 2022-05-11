//pull and create days of the week 
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();

//add "0" if hour or minutes is less than 10
if (hour < 10) {
  hour = "0" + hour;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}

//change day-time to current time in app
let newDate = `${day}, ${hour}:${minutes}`;

let dayTime= document.querySelector("#day-time");
dayTime.innerHTML = newDate;
console.log(new Date());



//find current data from OpenWeather ApI
function displayWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// API info for Search Input 
function search(city) {
  let apiKey = "b6520355a84f46a27e6fe4523cdc2546";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}


//Tells API that City comes from the value of what is put in the search
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#chosen-city").value;
  search(city);
}

// API info for Current Position
function searchLocation(position) {
  let apiKey = "b6520355a84f46a27e6fe4523cdc2546";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

//Tells API the long and lat from Geolocation 
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Tells the search button to talk to function handleSubmit for action 
let searchCity = document.querySelector("form");
searchCity.addEventListener("submit", handleSubmit);


// tells the current-button to talk to function getCurrentLocation for info
let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


//tells API that city search starts with "Miami"
search("Miami");
