const api = require('./api');
const weatherMapper = require('../mappers/weatherMapper');

const getWeather = async ({ latitude, longitude }) => {

  let ultimaFalha;

  for (let tentativa = 1; tentativa <= 3; tentativa++) {

    try {

      const response = await api.get('/forecast', {
        params: {
          latitude,
          longitude,

          daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_sum',
            'precipitation_probability_max',
            'et0_fao_evapotranspiration'
          ].join(','),

          hourly: [
            'temperature_2m',
            'relative_humidity_2m',
            'wind_speed_10m',
            'precipitation_probability'
          ].join(',')
        }
      });

      return weatherMapper(response.data);

    } catch (error) {

      ultimaFalha = error;

      console.error(
        `OpenMeteo tentativa ${tentativa} falhou:`,
        error.code
      );

      if (tentativa < 3) {
        await new Promise(resolve =>
          setTimeout(resolve, 1000)
        );
      }
    }
  }

  const erro = new Error(
    'Serviço meteorológico indisponível'
  );

  erro.code = 'OPEN_METEO_UNAVAILABLE';

  throw erro;
};

module.exports = getWeather;