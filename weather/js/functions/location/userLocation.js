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

    currentWeatherText.textContent = `${city.results[0].name} Temp: ${weather.current.apparent_temperature}°C weatherCode: ${weather.current.weather_code}`;
    //user location weather code 

    if(weather&& weather.current && typeof weather.current.weather_code === 'number'){
      setWeatherBackground(weather.current.weather_code);
    }

    
  } catch (error) {
    console.error('Kunde inte hämta position eller väder:', error);
  }
}

showWeatherForUser();
