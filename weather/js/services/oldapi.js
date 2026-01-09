/**
 *
 *
 *
 * @param {*} city - name of the city to search for
 * @returns {Promise<Object|undefined>} Returns Geocoding response data, or undefined error
 *
 */

export async function getCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('bla');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * Fetches current adn daily weather data for a location Using Open-Meteo
 *
 * @param {number} lat - latitude of location
 * @param {number} lon - longitude of location
 * @returns {Promise<Object|undefined>} weather data, or undeinfed on error
 */

export async function getWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&models=gfs_seamless` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
    `&timezone=Europe%2FBerlin&forecast_days=7`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
