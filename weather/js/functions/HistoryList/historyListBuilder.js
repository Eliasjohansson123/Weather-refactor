export function historyListBuilder(DOMParent, cities){
    while(DOMParent.firstChild){
        DOMParent.removeChild(DOMParent.firstChild);
    }
    console.log("cities: ", cities);
    cities.forEach(element => {
        element.buildHistory(DOMParent);
    })
}