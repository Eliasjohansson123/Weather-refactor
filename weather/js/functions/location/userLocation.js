import { getWeather, getCity } from '../../services/oldapi.js';

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
    const weather = await getWeather(coords.latitude, coords.longitude);
    const city = await getCity('Sundsvall');

    document.querySelector(
      '#main-weather'
    ).textContent = `${city.results[0].name} Temp: ${weather.current.apparent_temperature}°C`;
  } catch (error) {
    console.error('Kunde inte hämta position eller väder:', err);
  }
}

showWeatherForUser();
