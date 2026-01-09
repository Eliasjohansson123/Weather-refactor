/**
 * Main application entry point.
 * Handlers user input, search flow and UI updates
 */

import { City } from './classes/city.js';
import { handleText } from './services/inputs.js';
import { historyListHandler } from './functions/HistoryList/historyListHandler.js';
import { getWeather } from './services/oldapi.js';
import { makeDropDown, debounce } from './functions/dropDown/dropdown.js';
import { History } from './classes/History.js';
import { getUserLocation } from './functions/location/userLocation.js'; 
//import { getCity, getWeather } from "./services/newApi.js";

const mainWeatherEl = document.querySelector('#main-weather');
const forecastEl = document.querySelector('#forecast');
const historyEl = document.querySelector('#history');
const textInputEl = document.querySelector('input');
const inputWrapperEl = document.querySelector('.input-wrapper');

let historyList = new History(historyEl);

textInputEl.addEventListener(
  'input',
  debounce(async () => {
    const query = textInputEl.value.trim();

    if (!query) {
      const old = document.querySelector('.drop-container');
      if (old) old.remove();
      return;
    }

    const dropDown = await makeDropDown(query);

    if (!dropDown || !dropDown.element) return;

    inputWrapperEl.appendChild(dropDown.element);

    dropDown.element.addEventListener('click', async (event) => {
      event.preventDefault();
      let index = findIndexOfDropItem(event);
      await runSearch(index);
      inputWrapperEl.removeChild(dropDown.element);
      textInputEl.value = '';
    });

    dropDown.element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') event.target.click();
    });
  }, 300)
);

textInputEl.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    await runSearch(0);
    textInputEl.value = '';
    inputWrapperEl.removeChild(document.querySelector('.drop-container'));
  }
});

/**
 * Runs a weather search based on the current input value
 * Updates the main weather view, forecast and history
 * @param {numnber} index - index of the selected dropdown item
 * @returns {promise<void>}
 */

async function runSearch(index) {
  if (!textInputEl.value.trim()) return;
  
  const city = new City(handleText(textInputEl.value), index);
  await city.fetchCity();
  
  city.buildMainWeather(mainWeatherEl);
  city.buildForecast(forecastEl);
  historyList.cityListAdd(city);
}

historyEl.addEventListener('click', async (event) => {
  if (event.target.tagName === 'BUTTON') return;
  
  const article = event.target.closest('.history-card');
  const articleId = parseInt(article.dataset.id);
  
  const city = historyList.list.find((c) => c.fetchedCity.id === articleId);
  await fetchWeatherWithHistoryCard(city);
});

/**
 * Runs a weather search based on which post in the search history user clicks
 * Updates the main weather view and forecast and sorts history to reflect interaction 
 * @param {object} city - the City instance of clicked history item, stored in the history list
 * @returns {promise<void>}
 */

async function fetchWeatherWithHistoryCard(city) {
  const weather = await getWeather(city.lat, city.lon);
  city.weatherNow = weather.current;
  city.futureWeather = weather.daily;

  city.buildMainWeather(mainWeatherEl);
  city.buildForecast(forecastEl);

  historyList.list.unshift(
  historyList.list.splice(
  historyList.list.indexOf(city), 1)[0]);
  historyList.buildCardsFromList()
}


//determine position of clicked item
/**
 * Fins index of a clicked dropdown item
 * @param {Event} event - click event from dropdown item
 * @returns {number} - Index of the clicked element
 */
function findIndexOfDropItem(event) {
  const children = [...event.target.parentElement.children];
  return children.indexOf(event.target);
}

// const sundsvall = await getCity('Sundsvall');
// const weather = await getWeather(
//   sundsvall.results[0].latitude,
//   sundsvall.results[0].longitude
// );
