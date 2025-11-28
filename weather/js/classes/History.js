export class History{
    //parent är ett DOM-element där build-funktionen appendar HTML-elementen.
    constructor(parent){
        this.parent = parent;
        this.list = [];
    }
    // this.list har CityInstanser I sig.
    cityListAdd(city){
        if(this.list.some(c => c.lat === city.lat) && this.list.some(c => c.lon === city.lon)){
            //console.log("this element already exists");
        }else if(this.list.length >= 4){
            //"replacing old element with new");
            this.list.pop()
            this.list.unshift(city);
        }else{
            //console.log("adding new element");
            this.list.unshift(city);
        }
        this.buildCardsFromList();
    }
    clearList(){
        this.list = [];
        this.buildCardsFromList();
    }
    removeCityFromList(cityToRemove){
        //console.log(cityToRemove);
        if(this.list.some( c => c.lat === cityToRemove.lat) && this.list.some( c => c.lon === cityToRemove.lon)){
            this.list.splice(this.list.indexOf(cityToRemove), 1);
            this.buildCardsFromList();
        }
    }
    buildCardsFromList(){
        if(this.list != []){
            while(this.parent.firstChild){
                this.parent.removeChild(this.parent.firstChild);
            }
        }

        this.list.forEach(el => {

            const historyCard = document.createElement('article');
            const button = document.createElement('button');
            const h3 = document.createElement('h3');
            const p_1 = document.createElement('p');
            const p_2 = document.createElement('p');

            button.addEventListener("click", () => {
                this.removeCityFromList(this);
            });

            historyCard.classList.add('history-card');
            button.classList.add('delete-history');

            button.textContent = "X";
            h3.textContent = `${el.fetchedCity.name}`;
            p_1.textContent = `${el.fetchedCity.country}`;
            p_2.textContent = `${el.weatherNow.temperature_2m}`;
            
            historyCard.append(button, h3, p_1, p_2);
            this.parent.append(historyCard);
            //parent.insertBefore(historyCard, parent.firstChild);
        });
    }

}