export async function getCity(string){
    if(!string) throw new Error("no input detected");
    string = string.toLowerCase().trim();
    try{
        const url = `http://kontoret.onvo.se:10480/GetCities`;
        const response = await fetch(url);
        if(!response.ok) console.log("faulty request");
        const data = await response.json();
        for(let i = 0; i < data.length; i++){
            if(data[i].name.toLowerCase().trim() == string){
                return {name:data[i].name, lat: Math.round((data[i].longitude)*10000)/10000, lon: Math.round((data[i].latitude) * 10000)/10000};
            }
        }
        // const city = data.filter((city) => city.name.toLowerCase().trim() == string)
        // console.log(city);
        // return {lat: city[0].latitude, lon: city[0].longitude}
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
        console.log(data);
        return data
    }catch(error){
        console.log(error.message);
    }
}