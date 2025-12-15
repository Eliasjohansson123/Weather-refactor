// import { getCity, getWeather } from '../services/newApi.js';
import { weatherEmojis } from '../services/weathercodes.js';
import { setWeatherBackground } from '../functions/dynamicBackground.js';
import { getCity, getWeather } from '../services/oldapi.js';

/**
 * Represents a city and its associated weahter data
 * Handles fetching city coordinates, weather info
 * and render weather UI-components
 */

export class City {
  /**
   *
   * @param {string} cityName - name of the city to search for
   * @param {number} cityIndex - Index of the city from the API result
   */

  constructor(cityName, cityIndex) {
    this.cityName = cityName;
    this.cityIndex = cityIndex;
  }

  /**
   * fetches city data and weather data from api
   * stores current and future weather on the City instance
   * updates the background based on weather conditions
   *
   * @returns {Promise<void>}
   */
  async fetchCity() {
    const city = await getCity(this.cityName);

    this.fetchedCity = city.results[this.cityIndex];

    this.cityName = this.fetchedCity.name;
    this.lat = city.results[this.cityIndex].latitude;
    this.lon = city.results[this.cityIndex].longitude;

    const weather = await getWeather(this.lat, this.lon);

    this.weatherNow = weather.current;
    this.futureWeather = weather.daily;

    // update background based on current weather code
    const weatherCode = this.weatherNow.weather_code;
    setWeatherBackground(weatherCode);
  }

  /**
   * Builds and renders 6-day forecast
   * @param {HTMLElement} parent - DOM element where the forecast will be rendered
   */
  buildForecast(parent) {
    parent.innerHTML = '';
    for (let i = 1; i < 7; i++) {
      const cont = document.createElement('div');
      cont.classList.add('forecast-box');
      const forecastText = document.createElement('p');
      forecastText.classList.add('forecast-text');

      const dateString = this.futureWeather.time[i];
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      forecastText.textContent = `
            ${formattedDate}
            high: ${this.futureWeather.temperature_2m_max[i]}
            low: ${this.futureWeather.temperature_2m_min[i]}
            ${weatherEmojis[this.futureWeather.weather_code[i]]}
            `;
      cont.appendChild(forecastText);
      parent.appendChild(cont);
    }
    // DOM-Manip
  }

  /**
   * Renders main weahter information for selected city
   *
   * @param {HTMLElement} parent - DOM element where data will be displayed
   */
  buildMainWeather(parent) {
    parent.innerHTML = `
        <h1>${this.fetchedCity.name}</h1>
        <h2>${this.fetchedCity.country}, ${this.fetchedCity.admin1}</h2>
        <article>
            <span class = "curr-temp-wrapper">${this.weatherNow.temperature_2m} C</span>
            <span class= "curr-extra-info">
                Feels Like: ${this.weatherNow.apparent_temperature} C<br>
                Wind Speed: ${this.weatherNow.wind_speed_10m} m/s<br>
                Humidity: ${this.weatherNow.relative_humidity_2m} %
            </span>
        </article>    
        `;
  }
}
