// import { getCity } from '../../services/newApi.js';
import { getCity } from '../../services/oldapi.js';

/**
 * Creates a dropdown list with city suggestions from user input
 * @param {string} cityStr - user input string for city search
 * @returns {Promise<{ element: HTMLElement|null, cityData: Object|null}>}
 * Dropdown element and city data from API
 */

export async function makeDropDown(cityStr) {
  const container = document.querySelector('.drop-container');

  // remove dropdown if it already exists
  if (container != undefined) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.remove();
  }

  const dropContainer = document.createElement('ul');
  dropContainer.classList.add('drop-container');

  const drop = await getCity(cityStr);

  //stops execution if the API response is missing or faulty
  if (!drop || !Array.isArray(drop.results)) {
    return { element: null, cityData: null };
  }

  //create up to 5 dropdown options
  drop.results.slice(0, 5).forEach((el) => {
    const listElement = document.createElement('li');
    const listButton = document.createElement('button');

    listButton.classList.add('drop-down-element');
    listButton.textContent = `${el.name}, ${el.admin1}, ${el.country}`;

    listElement.appendChild(listButton);
    dropContainer.append(listElement);
  });
  return { element: dropContainer, cityData: drop };
}

/**
 * creates debounced version of function
 * @param {Function} fn - function to debounce
 * @param {number} delay - delay in milliseconds
 * @returns {Function} - Debounced function
 */

export function debounce(fn, delay = 300) {
  let timeout;
  return function (...args) {
    const ctx = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(ctx, args), delay);
  };
}
