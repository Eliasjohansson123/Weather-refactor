import { historyListBuilder } from "./historyListBuilder.js";

// kollar på listan med cities och kör byggfuntionen i city om 
// den godtas till historiken.

// DOMParent skickas som en DOM-nod som historyCard appendas till. cities är en lista med City-instanser, 
// city är den nyaste instansen av City.

export function historyListHandler(DOMParent, cities, city){
    //kollar om nya staden finns i historiken.
    if(cities.some(c => c.lat === city.lat) && cities.some(c => c.lon === city.lon)){
        console.log("already existing check", cities);
    }else if(cities.length >= 5){
    
        cities.pop();
        cities.unshift(city);
        historyListBuilder(DOMParent, cities);
        // historyListBuilder(DOMParent, cities);
    }else{
        cities.unshift(city);
        historyListBuilder(DOMParent, cities);
        // historyListBuilder(DOMParent, cities);
    }
}
