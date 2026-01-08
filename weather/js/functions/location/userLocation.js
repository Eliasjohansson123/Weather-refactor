import { getWeather, getCity } from '../../services/oldapi.js';
import { setWeatherBackground } from '../dynamicBackground.js';

// Hämtar användarens nuvarande position och returnerar koordinaterna som ett Promise.
export async function getUserLocation() {
  const options = {
    timeout: 5000,
  };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords),
      (err) => reject(err),
      options
    );
  });
} 
async function showWeatherForUser() {
  try {
    // the page users see  before searching - remove innerHTML
    const coords = await getUserLocation();
    const weather = await getWeather(coords.latitude, coords.longitude);
    const city = await getCity('Sundsvall');

    const currentWeather = document.querySelector('#main-weather');

    currentWeather.innerHTML = '';

    const weatherContainer = document.createElement('div');
    weatherContainer.classList.add('current-weather-sundsvall');

    const cityName = document.createElement('h1');
    cityName.textContent = city.results[0].name;

    const cityLocation = document.createElement('h2');
    cityLocation.textContent = `${city.results[0].country}, ${city.results[0].admin1}`;

    const article = document.createElement('article');

    const tempSpan = document.createElement('span');
    tempSpan.classList.add('curr-temp-wrapper');
    tempSpan.textContent = `${weather.current.temperature_2m} °C`;

    const infoSpan = document.createElement('div'); // Changed to div for easier block layout
    infoSpan.classList.add('curr-extra-info');

    function createWeatherDetail(label, value, unit) {
      const p = document.createElement('p');
      p.style.margin = '0'; // Reset default margins if needed
      p.textContent = `${label}: ${value} ${unit}`;
      return p;
    }

    // each line as a separate element
    const feelsLike = createWeatherDetail(
      'Feels Like',
      weather.current.apparent_temperature,
      '°C'
    );
    const windSpeed = createWeatherDetail(
      'Wind Speed',
      weather.current.wind_speed_10m,
      'm/s'
    );
    const humidity = createWeatherDetail(
      'Humidityyyyyyyy',
      weather.current.relative_humidity_2m,
      '%'
    );

    // appending to the info container
    infoSpan.append(feelsLike, windSpeed, humidity);

    article.append(tempSpan, infoSpan);
    weatherContainer.append(cityName, cityLocation, article);
    currentWeather.appendChild(weatherContainer);

    // 4. Background logic
    if (weather?.current?.weather_code !== undefined) {
      setWeatherBackground(weather.current.weather_code);
    }

    currentWeather.appendChild(currentWeatherText);
    currentWeatherText.classList.add('current-weather-text');

    //user location weather code
    if (
      weather &&
      weather.current &&
      typeof weather.current.weather_code === 'number'
    ) {
      setWeatherBackground(weather.current.weather_code);
    }
  } catch (error) {
    console.error('Kunde inte hämta position eller väder:', error);
  }
}

showWeatherForUser();
