export async function getCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("bla");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}
export async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&current=weather_code,showers,temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=Europe%2FBerlin&forecast_days=7`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather fetch failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
