/**
 * Handles building and updateing weahter-related content
 *  */

export class Build {
  /**
   * Creates a build instance from a City object
   *
   * @param {Object} city - City instance containing fetched city and weather data
   */

  constructor(city) {
    this.city = city.fetchedCity;
    this.weatherNow = city.weatherNow;
    this.futureWeather = city.futureWeather;
  }

  /**
   * Builds and displays the main weather information for selected city
   */

  buildMainWeather(parent) {
    parent.innerHTML = `
        <h1>${this.city.name}</h1>
        <h2>${this.city.country}, ${this.city.admin1}</h2>
        <article>
            <span class = "curr-temp-wrapper">${this.weatherNow.temperature_2m} C</span>
            <span class= "curr-extra-info">
                Feels ohhh Like: ${this.weatherNow.apparent_temperature} C<br>
                Wind Speed: ${this.weatherNow.wind_speed_10m} m/s<br>
                Humidity: ${this.weatherNow.relative_humidity_2m} %
            </span>
        </article>    
        `;
  }

  /**
   * Builds and displays forecast
   * @param {HTMLElement} parent  - parent element where forecast is rendered
   */
  buildForecast(parent) {
    parent.innerHTML = '';
    for (let i = 1; i < 7; i++) {
      const cont = document.createElement('div');
      cont.classList.add('forecast-box');
      const forecastText = document.createElement('p');
      forecastText.classList.add('forecast-text');

      forecastText.textContent = `
            ${this.futureWeather.time[i]}
            high:
            ${this.futureWeather.temperature_2m_max[i]}
            - 
            ${this.futureWeather.temperature_2m_min[i]}
            `;
      cont.appendChild(forecastText);
      parent.appendChild(cont);
    }

    /**
     * Builds all weahter related sections at once
     * @param {HTMLElement} historyParent - Parent element for search histyry
     * @param {HTMLElement} mainParent - Parent element for main weather display
     * @param {HTMLElement} forecastParent - Parent element for forecast display
     */
  }
  buildAll(historyParent, mainParent, forecastParent) {
    this.buildHistory(historyParent);
    this.buildMainWeather(mainParent);
    this.buildForecast(forecastParent);
  }
}
