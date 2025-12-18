import { historyListBuilder } from './historyListBuilder.js';

/**
 * Handles updates to the citry history list
 * makes sure there are no duplicates, list size limit andreloads UI
 * @param {HTMLElement} DOMParent - history card container
 * @param {City[]} cities - array with stored City instances
 * @param {City} city - new city instance
 */

export function historyListHandler(DOMParent, cities, city) {
  // ignore city if it is already in history (based on coords)
  if (
    cities.some((c) => c.lat === city.lat) &&
    cities.some((c) => c.lon === city.lon)
  ) {
    console.log('already existing check', cities);

    // Limit history to 5 cities
  } else if (cities.length >= 5) {
    cities.pop();
    cities.unshift(city);
    historyListBuilder(DOMParent);
  } else {
    // Add the newest city to beginnin of list
    cities.unshift(city);

    //clear history container before rendering cards again
    historyListBuilder(DOMParent);
  }
}
