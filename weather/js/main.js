/**
 * Main application entry point.
 * Handlers user input, search flow and UI updates
 */

import { City } from './classes/city.js';
import { handleText } from './services/inputs.js';
import { historyListHandler } from './functions/HistoryList/historyListHandler.js';
import { getCity, getWeather } from './services/oldapi.js';
import { makeDropDown, debounce } from './functions/dropDown/dropdown.js';
import { Build } from './classes/build.js';
import { History } from './classes/History.js';
//import { getCity, getWeather } from "./services/newApi.js";
import { getUserLocation } from './functions/location/userLocation.js';

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
      inputWrapperEl.removeChild(dropDown.element)
    });
    
    dropDown.element.addEventListener('keydown', event => {
      if (event.key === 'Enter') event.target.click()
      })
  }, 300)
);

textInputEl.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    await runSearch(0);
    textInputEl.value = '';
    inputWrapperEl.removeChild(document.querySelector(".drop-container"))
  }
});


/**
 * Runs a weather search based obn the current input value
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
