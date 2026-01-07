import { City } from './classes/city.js';
import { handleText } from './services/inputs.js';
import { historyListHandler } from './functions/HistoryList/historyListHandler.js';
import { getCity, getWeather } from './services/oldapi.js';
import { makeDropDown, debounce } from './functions/dropDown/dropdown.js';
import { Build } from './classes/build.js';
import { History } from './classes/History.js';
//import { getCity, getWeather } from "./services/newApi.js";
import { getUserLocation } from './functions/location/userLocation.js';

const mainTag = document.querySelector('main');
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

historyEl.addEventListener('click', async (event) => {
  if (event.target.tagName === 'BUTTON') return;

  const article = event.target.closest('.history-card');
  const articleId = parseInt(article.dataset.id);

  const city = historyList.list.find((c) => c.fetchedCity.id === articleId);
  await fetchWeatherWithHistoryCard(city);
  // console.log(city)
});

async function runSearch(index) {
  if (!textInputEl.value.trim()) return;

  const city = new City(handleText(textInputEl.value), index);
  await city.fetchCity();

  city.buildMainWeather(mainWeatherEl);
  city.buildForecast(forecastEl);
  historyList.cityListAdd(city);
}

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

function findIndexOfDropItem(event) {
  const children = [...event.target.parentElement.children];
  return children.indexOf(event.target);
}

// const sundsvall = await getCity('Sundsvall');
// const weather = await getWeather(
//   sundsvall.results[0].latitude,
//   sundsvall.results[0].longitude
// );
