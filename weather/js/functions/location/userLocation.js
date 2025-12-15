import { getWeather, getCity } from '../../services/oldapi.js';
import { setWeatherBackground } from '../dynamicBackground.js';

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
    const coords = await getUserLocation();
    console.log(coords);
    const weather = await getWeather(coords.latitude, coords.longitude);
    const city = await getCity('Sundsvall');
    const currentWeatherText = document.createElement('p');
    const currentWeather = document.querySelector('#main-weather');

    currentWeather.appendChild(currentWeatherText);
    currentWeatherText.classList.add('current-weather-text');

    // the page users see  before searching
    currentWeatherText.innerHTML = ` <h1>${city.results[0].name}</h1>
        <h2>${city.results[0].country}, ${city.results[0].admin1}</h2>
        <article>
            <span class = "curr-temp-wrapper">${weather.current.temperature_2m} °C</span>
            <span class= "curr-extra-info">
                Feels Like: ${weather.current.apparent_temperature} C<br>
                Wind Speed: ${weather.current.wind_speed_10m} m/s<br>
                Humidity: ${weather.current.relative_humidity_2m} %
            </span>
        </article> 
    `;

    //user location weather code 
    if(weather&& weather.current && typeof weather.current.weather_code === 'number'){
      setWeatherBackground(weather.current.weather_code);
    }

    
  } catch (error) {
    console.error('Kunde inte hämta position eller väder:', error);
  }
}

showWeatherForUser();
