import { City } from "./classes/city.js";
import { handleText } from "./services/inputs.js";
import { historyListHandler } from "./functions/HistoryList/historyListHandler.js";
//import { getCity, getWeather} from "./services/oldapi.js";
import { makeDropDown } from "./functions/dropDown/dropdown.js";
import { Build } from "./classes/build.js";
import { History } from "./classes/History.js";
import { getCity, getWeather } from "./services/newApi.js";


const mainTag = document.querySelector("main");
const mainWeatherEl = document.querySelector("#main-weather");
const forecastEl = document.querySelector("#forecast");
const historyEl = document.querySelector("#history");
const textInputEl = document.querySelector("input");
const inputWrapperEl = document.querySelector(".input-wrapper");
const sendButtonEl = document.querySelector("#send-input");

let historyList = new History(historyEl);

textInputEl.addEventListener("input", async () => {
  if (!textInputEl.value.trim()) return;

  const dropDown = await makeDropDown(textInputEl.value);

  // dropDown.element.children ger Key:value par där key är ordningen av barnen i containern.
  // Index kopierar key och skickas till city-instansieringen.
  dropDown.element.addEventListener("click", async (event) => {
    let index = findIndexOfDropItem(event);
    await runSearch(index);

    dropDown.element.remove();
  });

  inputWrapperEl.insertBefore(dropDown.element, inputWrapperEl.firstChild);
});

textInputEl.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    //default to first search result
    await runSearch(0);

    textInputEl.value = "";
  }
});

sendButtonEl.addEventListener("click", async (e) => {
  e.preventDefault();
  await runSearch(0);

  textInputEl.value = "";
});

async function runSearch(index) {
  if (!textInputEl.value.trim()) return;

  const city = new City(handleText(textInputEl.value), index);
  await city.fetchCity();

  city.buildMainWeather(mainWeatherEl);
  city.buildForecast(forecastEl);
  historyList.cityListAdd(city);
}

function findIndexOfDropItem(event) {
  const children = [...event.target.parentElement.children];
  console.log(children);
  return children.indexOf(event.target);
}

const sundsvall = await getCity("Sundsvall");
const weather = await getWeather(sundsvall.lat, sundsvall.lon);
console.log(sundsvall);
