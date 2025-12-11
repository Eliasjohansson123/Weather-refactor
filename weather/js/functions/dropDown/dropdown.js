// import { getCity } from '../../services/newApi.js';
import { getCity } from '../../services/oldapi.js';

export async function makeDropDown(cityStr) {
  const container = document.querySelector('.drop-container');
  if (container != undefined) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.remove();
  }

  const dropContainer = document.createElement('ul');
  dropContainer.classList.add('drop-container');

  const drop = await getCity(cityStr);

  if (!drop || !Array.isArray(drop.results)) {
    return { element: null, cityData: null };
  }
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
export function debounce(fn, delay = 300) {
  let timeout;
  return function (...args) {
    const ctx = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(ctx, args), delay);
  };
}
