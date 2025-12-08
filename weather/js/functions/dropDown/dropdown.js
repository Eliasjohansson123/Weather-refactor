import { getCity } from "../../services/oldapi.js";

export async function makeDropDown(cityStr) {
  const container = document.querySelector(".drop-container");
  if (container != undefined) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.remove();
  }
  const dropContainer = document.createElement("ol");
  dropContainer.classList.add("drop-container");
  const drop = await getCity(cityStr);

  // drop.results.forEach(el => {
  //     const listElement = document.createElement('li');
  //     listElement.classList.add("drop-down-element");
  //     listElement.textContent = `${el.name}, ${el.admin1}, ${el.country}`;
  //     dropContainer.append(listElement);

  // });

  drop.results.slice(0, 5).forEach((el) => {
    const listElement = document.createElement("li");
    listElement.classList.add("drop-down-element");
    listElement.textContent = `${el.name}, ${el.admin1}, ${el.country}`;
    dropContainer.append(listElement);
  });
  return { element: dropContainer, cityData: drop };
}
