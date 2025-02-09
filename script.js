const searchBtn = document.querySelector("#searchButton");
const inputBar = document.querySelector("#inputBar");
const weatherDisplay = document.querySelector("#weather-display");
const boxes = document.querySelectorAll(".box"); // Select all boxes
const weatherImageContainer = document.querySelector("#weather-image-container");
const locationBtn = document.querySelector("#locatiinBtn"); // Fetch weather based on current location

const API_Key = `97a1ae312bdb00e3ee46f4d299e2875e`;

// Function to get weather icon path based on weather description

const getWeatherIconPath = (weatherDescription) => {


  let imagePath = "assets/default.png"; // Fallback image
  if (weatherDescription.includes("clear")) imagePath = "assets/clear.png";
  else if (weatherDescription.includes("rain")) imagePath = "assets/rain.png";
  else if (weatherDescription.includes("cloud")) imagePath = "assets/clouds.png";
  else if (weatherDescription.includes("snow")) imagePath = "assets/snow.png";
  return imagePath;

 
};

const getDetails = async (cityValue, lat, lon) => {
  try {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`;
    const response = await fetch(weatherAPI);
    const result = await response.json();

    // Display current weather
    const currentWeather = result.list[0].weather[0].main.toLowerCase();
    weatherDisplay.classList.add("text");
    weatherDisplay.innerHTML = `
      <h2 class="heading">${cityValue}</h2>
      <h4 class="heading4">Temperature: ${(result.list[0].main.temp - 273.15).toFixed(2)}°C</h4>
      <h4 class="heading4">Wind Speed: ${result.list[0].wind.speed} m/s</h4>
      <h4 class="heading4">Humidity: ${result.list[0].main.humidity}%</h4>
    `;

    const currentImagePath = getWeatherIconPath(currentWeather);
    weatherImageContainer.innerHTML = `<img src="${currentImagePath}" alt="${currentWeather}" class="weather-icon" />`;

    // Filter data for one forecast per day (e.g., at 12:00 PM)
    const dailyForecasts = result.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Display 5-day forecast in individual boxes
    dailyForecasts.forEach((forecast, index) => {
      if (index < boxes.length) {
        const box = boxes[index];
        const date = new Date(forecast.dt_txt).toDateString();
        const temp = (forecast.main.temp - 273.15).toFixed(2);
        const wind = forecast.wind.speed;
        const humidity = forecast.main.humidity;
        const forecastWeather = forecast.weather[0].main.toLowerCase();
        const forecastImagePath = getWeatherIconPath(forecastWeather);

        // box.imgBox.classList.add("weather-icon-box")
        box.innerHTML = `
          <h2 class="heading">(${date})</h2>
          <img src="${forecastImagePath}" id="imgBox" alt="${forecastWeather}" class="weather-icon-box" />
          <h4 class="heading4">Temperature: ${temp}°C</h4>
          <h4 class="heading4">Wind Speed: ${wind} m/s</h4>
          <h4 class="heading4">Humidity: ${humidity}%</h4>
        `;
      }
    });
  } catch (error) {
    console.error("Error fetching weather details:", error);
  }
};

// Event listener for search button
searchBtn.addEventListener("click", () => {
  const cityValue = inputBar.value.trim();
  if (cityValue) {
    // Call OpenCage API or any geolocation service to fetch lat/lon for the city
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&appid=${API_Key}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          getDetails(cityValue, lat, lon);
        } else {
          alert("City not found!");
        }
      })
      .catch(error => console.error("Error fetching city coordinates:", error));
  } else {
    alert("Please enter a city name.");
  }
});

// Event listener for current location button
locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude: lat, longitude: lon } = position.coords;
        getDetails("Your Location", lat, lon);
      },
      error => console.error("Error fetching location:", error)
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});

































