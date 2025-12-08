export async function getCity(string){
    if(!string) throw new Error("no input detected");
    string = string.toLowerCase().trim();
    try{
        const url = `http://kontoret.onvo.se:10480/GetCities`;
        const response = await fetch(url);
        if(!response.ok) console.log("faulty request");
        const data = await response.json();

        // console.log(data);

        const city = data.filter((city) => city.name.toLowerCase().trim() === string)

        // console.log("newApi.js => city: ", city[0]);
        
        return {results: [{name: city[0].name, admin1: city[0].name, country: "Sweden", latitude: city[0].latitude, longitude: city[0].longitude}]}
         

    }catch(error){
        console.log("error: ", error.message);
    }
}

export async function getWeather(lat, lon){
    if(!lat || !lon){
        throw new Error("bad input");
    }
    try{
        const url = `http://kontoret.onvo.se:10480/GetWeather?lat=${lat}&lon=${lon}`;
        const response = await fetch(url);
        if(!response.ok) console.log("faulty request");
        const data = await response.json();
        return data
    }catch(error){
        console.log(error.message);
    }
}