// import { getCity } from '../../services/newApi.js';
import { getCity } from '../../services/oldapi.js';

export async function makeDropDown(cityStr) {
  console.log('makeDropDown input:', cityStr);

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
    console.warn('Inga resultat från API');
    return { element: null, cityData: null };
  }
  drop.results.slice(0, 5).forEach((el) => {
    const listElement = document.createElement('li');
    listElement.classList.add('drop-down-element');
    listElement.textContent = `${el.name}, ${el.admin1}, ${el.country}`;
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
