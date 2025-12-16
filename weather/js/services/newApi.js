/**
 *Fetches city data based on city name
 returns empty result if no city is found

 * @param {string} string - Name of city to search for
* @throws {Error} - if no input is provided
 * @returns {Promise<object>} - City data with: name, admin1, country, latitude, longitude
 */

export async function getCity(string) {
  if (!string) throw new Error('no input detected');
  string = string.toLowerCase().trim();
  try {
    const url = `http://kontoret.onvo.se:10480/GetCities`;
    const response = await fetch(url);
    if (!response.ok) console.log('faulty request');
    const data = await response.json();

    const city = data.filter(
      (city) => city.name.toLowerCase().trim() === string
    );

    //if no cities match input, return empty
    if (!city.length) {
      return { results: [] };
    }

    return {
      results: [
        {
          name: city[0].name,
          admin1: city[0].name,
          country: 'Sweden',
          latitude: city[0].latitude,
          longitude: city[0].longitude,
        },
      ],
    };
  } catch (error) {
    console.log('error: ', error.message);
  }
}

/**
 * fetch weather data for teh specified latitude and longitute
 *
 * @param {number} lat - location latitude
 * @param {number} lon - location longitude
 * @throws {Error} - If lat or lon is not provided
 * @returns {Promise<Object>} - Weather data for location
 */

export async function getWeather(lat, lon) {
  if (!lat || !lon) {
    throw new Error('bad input');
  }

  try {
    const url = `http://kontoret.onvo.se:10480/GetWeather?lat=${lat}&lon=${lon}`;
    const response = await fetch(url);

    if (!response.ok) console.log('faulty request');
    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
