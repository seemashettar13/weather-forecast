const searchBtn = document.querySelector("#searchButton");
const inputBar = document.querySelector("#inputBar");
const weatherDisplay = document.querySelector("#weather-display");
const boxes = document.querySelectorAll(".box"); // Select all boxes
const weatherImageContainer = document.querySelector("#weather-image-container");
const weatherIcon = document.querySelector(".weather-icon");
const weatherIconBox = document.querySelector(".weather-icon-box")

const API_Key = `97a1ae312bdb00e3ee46f4d299e2875e`;

const getDetails = async (cityValue, lat, lon) => {
  try {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`;
    const response = await fetch(weatherAPI);
    const result = await response.json();
    console.log(result);

    // Displaying current weather
    weatherDisplay.classList.add("text");
    weatherDisplay.innerHTML = `
      <h2 class="heading">${cityValue}</h2>
      <h4 class="heading4">Temperature: ${(result.list[0].main.temp - 273.15).toFixed(2)}°C</h4>
      <h4 class="heading4">Wind Speed: ${result.list[0].wind.speed} m/s</h4>
      <h4 class="heading4">Humidity: ${result.list[0].main.humidity}%</h4>
    `;

    const currentWeather = result.list[0].weather[0].main.toLowerCase(); // Getting main weather like ("Clear", "Rain", "Cloud")
    let imagePath = "assets/clear.png";
    if (currentWeather.includes("clear")) {
      imagePath = "assets/clear.png";
    } else if (currentWeather.includes("rain")) {
      imagePath = "assets/rain.png";
    } else if (currentWeather.includes("cloud")) {
      imagePath = "assets/clouds.png";
    } else if (currentWeather.includes("snow")) {
      imagePath = "assets/snow.png";
    } else {
      imagePath = "images/default.png"; // Fallback image
    }
   
    weatherImageContainer.innerHTML = `
    <img src="${imagePath}" alt="${currentWeather}" class="weather-icon" />
  `;
  
  // Filtering data for one forecast per day (e.g., at 12:00 PM)
    const dailyForecasts = result.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Displaying 5-day forecast in individual boxes
    dailyForecasts.forEach((forecast, index) => {
      if (index < boxes.length) { // Since we have 5 boxes
        const box = boxes[index];
        const date = new Date(forecast.dt_txt).toDateString();
        const temp = (forecast.main.temp - 273.15).toFixed(2);
        const wind = forecast.wind.speed;
        const humidity = forecast.main.humidity;

        box.innerHTML = `
          <h2 class="heading">(${date})</h2>
          <h4 class="heading4">Temperature: ${temp}°C</h4>
          <h4 class="heading4">Wind Speed: ${wind} m/s</h4>
          <h4 class="heading4">Humidity: ${humidity}%</h4>
        `;

    dailyForecasts.forEach((forecast, index) => {
        if (index < boxes.length) { // Ensure there are enough boxes
          const box = boxes[index];
          const date = new Date(forecast.dt_txt).toDateString();
          const temp = (forecast.main.temp - 273.15).toFixed(2);
          const wind = forecast.wind.speed;
          const humidity = forecast.main.humidity;
      
          const currentWeatherForecast = forecast.weather[0].main.toLowerCase(); //  Getting main weather like ("Clear", "Rain", "Cloud")
          weatherIconBox.classList.add("image")
          let imageDestination = "assets/clear.png";
          if (currentWeatherForecast.includes("clear")) {
            imageDestination = "assets/clear.png";
          } else if (currentWeatherForecast.includes("rain")) {
            imageDestination = "assets/rain.png";
          } else if (currentWeatherForecast.includes("cloud")) {
            imageDestination = "assets/clouds.png";
          } 
          else if (currentWeatherForecast.includes("snow")) {
            imageDestination = "assets/snow.png";  
          }  else if (currentWeatherForecast.includes("humidity")) {
            imageDestination = "assets/humidity.png";  
          }
          else if (currentWeatherForecast.includes("drizzle")) {
            imageDestination = "assets/drizzle.png";  
          }
          else if (currentWeatherForecast.includes("mist")) {
            imageDestination = "assets/mist.png";  
          }
           else {
            imageDestination = "images/default.png"; // Fallback image
          }
       
          box.innerHTML = `
            <h2 class="heading">(${date})</h2>
            <h4 class="heading4">Temperature: ${temp}°C</h4>
            <h4 class="heading4">Wind Speed: ${wind} m/s</h4>
            <h4 class="heading4">Humidity: ${humidity}%</h4>
            <img src="${imageDestination}" alt="${currentWeatherForecast}" class="weather-icon-box" />
          `;
        }
      });
        }
    });
  } catch (error) {
    console.log("An error occurred while fetching weather forecast:", error);
  }
};

const cityName = async () => {
  const cityValue = inputBar.value.trim();
  if (!cityValue) return alert("Please enter a city name!");
  try {
    const firstAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${API_Key}`;
    const response = await fetch(firstAPI);
    const result = await response.json();

    if (!result.length) return alert(`No results for ${cityValue}. Please enter a valid city name!`);

    const { name, lat, lon } = result[0];
    getDetails(name, lat, lon);
  } catch (error) {
    console.log("An error occurred while fetching location data:", error);
  }
};

searchBtn.addEventListener("click", cityName);






