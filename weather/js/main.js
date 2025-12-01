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



sendButtonEl.addEventListener("click", async () => {

    const dropDown = await makeDropDown(textInputEl.value);
    
    // dropDown.element.children ger Key:value par där key är ordningen av barnen i containern.
    // Index kopierar key och skickas till city-instansieringen.
    dropDown.element.addEventListener("click", async event => {
        let index = findIndexOfDropItem(event);
        const city = new City(handleText(textInputEl.value), index);
        await city.fetchCity();

        city.buildMainWeather(mainWeatherEl);
        city.buildForecast(forecastEl);
        historyList.cityListAdd(city);

        //console.log("HistoryList", historyList.list);
        //historyListHandler(history, cityHistoryList, city);
    }); /*async (e) => {
        for(let key in dropDown.element.children){
            if(dropDown.element.children[key] == e.target){
                console.log("key:", key);
                index = key;
            }
        }

        const city = new City(handleText(input.value), index);
        await city.fetchCity();

        city.buildMainWeather(mainWeather);
        city.buildForecast(forecast);
        historyListHandler(history, cityHistoryList, city);
        
    });*/

    inputWrapperEl.insertBefore(dropDown.element, inputWrapperEl.firstChild);
});
// function findIndexOfDropItem(data, event){
//     console.log(data.results);
//     for(let i = 0; i < data.results.length;i++){
//         if(i == Object.keys(event.target)){
//             console.log("target: ", event.target);
//             return i;
//         }
//     }
//     return 0;
// }
function findIndexOfDropItem(event) {
    const children = [...event.target.parentElement.children];
    console.log(children);
    return children.indexOf(event.target);
}
//      Testing

const sundsvall = await getCity("Sundsvall");
const weather = await getWeather(sundsvall.lat, sundsvall.lon);
console.log(sundsvall);
