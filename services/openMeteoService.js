const api = require('./api');
const weatherMapper = require('../mappers/weatherMapper');
const historicalMapper = require('../mappers/historicalMapper');
const historicalApi = require('./apiHistorical');

//--------Previsão
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

//--------Hitorico
const getHistorical = async ({ latitude, longitude, start_date, end_date }) => {
  try {
    const response = await historicalApi.get('/archive', {
      params: {
        latitude,
        longitude,
        start_date,
        end_date,
        daily: [
          'precipitation_sum',
          'temperature_2m_mean',
          'et0_fao_evapotranspiration'
        ].join(',')
      }
    });
    return historicalMapper(response.data);
  } catch (error) {
     console.error('Erro Open-Meteo:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data
    });
  }
}

module.exports = {getWeather, getHistorical};