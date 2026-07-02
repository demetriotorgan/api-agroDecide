const api = require('./api');
const weatherMapper = require('../mappers/weatherMapper');

const getWeather = async ({latitude, longitude})=>{
    const response = await api.get("/forecast", {
    params: {
      latitude,
      longitude,

      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_sum",
        "precipitation_probability_max"
      ].join(","),

      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "wind_speed_10m",
        "precipitation_probability"
      ].join(",")
    }
  });

  return weatherMapper(response.data);
}

module.exports = getWeather;