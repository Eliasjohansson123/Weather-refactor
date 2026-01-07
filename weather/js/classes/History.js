/**
 * Manage history list of previously searched cities
 * handles adding, removing and rendering history cards
 */

export class History {
  /**
   * Creates a History iinstance
   *
   * @param {HTMLElement} parent - DOM element where history cards will be rendered
   */
  constructor(parent) {
    this.parent = parent;

    //contains City instances
    this.list = [];
  }

  cityListAdd(city) {
    // check if the city already exists in the list (by coords)
    if (
      this.list.some((c) => c.lat === city.lat) &&
      this.list.some((c) => c.lon === city.lon)
    ) {
      // if history is full, remove the oldest city
    } else if (this.list.length >= 4) {
      this.list.pop();

      // add newest city to the beginning of the list
      this.list.unshift(city);
    } else {
      this.list.unshift(city);
    }
    this.buildCardsFromList();
  }

  /**
   * clears entire city history list
   */
  clearList() {
    this.list = [];
    this.buildCardsFromList();
  }

  removeCityFromList(cityToRemove) {
    // check if the city exists in the list
    if (
      this.list.some((c) => c.lat === cityToRemove.lat) &&
      this.list.some((c) => c.lon === cityToRemove.lon)
    ) {
      this.list.splice(this.list.indexOf(cityToRemove), 1);
      this.buildCardsFromList();
    }
  }

  /**
   *  Rebuilds and renders all history cards from current list
   */
  buildCardsFromList() {
    //clear exising history cards from the DOM
    if (this.list != []) {
      while (this.parent.firstChild) {
        this.parent.removeChild(this.parent.firstChild);
      }
    }

    //create and append history card for each city
    this.list.forEach((el) => {
      const historyCard = document.createElement('article');
      const button = document.createElement('button');
      const h3 = document.createElement('h3');
      const p_1 = document.createElement('p');
      const p_2 = document.createElement('p');
    
      historyCard.setAttribute("data-id", el.fetchedCity.id)

      //remove city when delete button is clicked
      button.addEventListener('click', () => {
        console.log(this);
        this.removeCityFromList(el);
      });

      historyCard.classList.add('history-card');
      button.classList.add('delete-history');

      button.textContent = 'X';
      h3.textContent = `${el.fetchedCity.name}`;
      p_1.textContent = `${el.fetchedCity.country}`;
      p_2.textContent = `${el.weatherNow.temperature_2m}`;

      historyCard.append(h3, p_1, p_2, button);
      this.parent.append(historyCard);
      //parent.insertBefore(historyCard, parent.firstChild);
    });
  }
}
