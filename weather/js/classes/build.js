export class Build{

    constructor(city){
        this.city = city.fetchedCity;
        this.weatherNow = city.weatherNow;
        this.futureWeather = city.futureWeather;
        //bla bla bla osv
    }
    // Skicka parent som en DOM-Nod
    buildHistory(parent){
        // DOM-Manip

    }
    buildMainWeather(parent, stad){
        parent.innerHTML = `
        <h1>${this.city.name}</h1>
        <h2>${this.city.country}, ${this.city.admin1}</h2>
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
    buildForecast(parent){
        parent.innerHTML = "";
        for(let i = 1; i < 7;i++){
            const cont = document.createElement('div');
            cont.classList.add("forecast-box");
            const forecastText = document.createElement("p");
            forecastText.classList.add("forecast-text");
            
            forecastText.textContent = `
            ${this.futureWeather.time[i]}
            temperatures: 
            ${this.futureWeather.temperature_2m_max[i]}
            - 
            ${this.futureWeather.temperature_2m_min[i]}
            `;
            cont.appendChild(forecastText);
            parent.appendChild(cont);
        }
        // DOM-Manip
    }
    buildAll(historyParent, mainParent, forecastParent){
        this.buildHistory(historyParent);
        this.buildMainWeather(mainParent);
        this.buildForecast(forecastParent);
    }
}