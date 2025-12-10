import { getCity, getWeather } from "../services/oldapi.js";
import { weatherEmojis } from "../services/weathercodes.js";

export class City {
  // cityName är stadsnamnet sim skickas in till getCity API-call, CityIndex är vilket index i City som vi vill ha
  // (specifik stad som matchar getCity()-kallningen), RequestWeather är en boolisk variabel som bestämmer om instansen
  // skall innehålla väderinformation.

  // parent parametern i build-funktionerna skall skickas som en DOM-Nod.

  constructor(cityName, cityIndex) {
    this.cityName = cityName;
    this.cityIndex = cityIndex;
  }
  async fetchCity() {
    const city = await getCity(this.cityName);
    console.log("fetching city...", city);
    this.fetchedCity = city.results[this.cityIndex];

    this.cityName = this.fetchedCity.name;
    this.lat = city.results[this.cityIndex].latitude;
    this.lon = city.results[this.cityIndex].longitude;

    const weather = await getWeather(this.lat, this.lon);
    this.weatherNow = weather.current;
    this.futureWeather = weather.daily;
  }
  buildForecast(parent) {
    parent.innerHTML = "";

    const foreCastHeader = document.createElement("h3");
    foreCastHeader.textContent = "5-day forecast";
    parent.appendChild(foreCastHeader);

    for (let i = 1; i < 6; i++) {
      //Convert date to weekday
      const date = new Date(this.futureWeather.time[i]);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      const cont = document.createElement("div");
      cont.classList.add("forecast-box");
      const forecastText = document.createElement("p");
      forecastText.classList.add("forecast-text");

      forecastText.textContent = `
            ${dayName}
            High: ${this.futureWeather.temperature_2m_max[i]}
            - 
            Low: ${this.futureWeather.temperature_2m_min[i]}
            ${weatherEmojis[this.futureWeather.weather_code[i]]}
            `;
      cont.appendChild(forecastText);
      parent.appendChild(cont);
    }
    // DOM-Manip
  }
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
    // DOM-Manip
  }
  buildHistory(parent) {
    const historyCard = document.createElement("article");
    const button = document.createElement("button");
    const h3 = document.createElement("h3");
    const p_1 = document.createElement("p");
    const p_2 = document.createElement("p");

    button.addEventListener("click", this.removeHistory);

    historyCard.classList.add("history-card");
    button.classList.add("delete-history");

    button.textContent = "X";
    h3.textContent = `${this.fetchedCity.name}`;
    p_1.textContent = `${this.fetchedCity.country}`;
    p_2.textContent = `${this.weatherNow.temperature_2m}`;

    historyCard.append(button, h3, p_1, p_2);
    parent.append(historyCard);
    //parent.insertBefore(historyCard, parent.firstChild);
  }

  removeHistory(cityList, target) {}
}
