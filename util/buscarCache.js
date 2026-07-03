const WeatherCache = require('../models/weatherCache');

async function buscarCacheValido(latitude, longitude) {

  const umaHoraAtras = new Date(
    Date.now() - (60 * 60 * 1000)
  );

  return WeatherCache.findOne({
    latitude,
    longitude,
    createdAt: {
      $gte: umaHoraAtras
    }
  }).sort({ createdAt: -1 });

}

module.exports = {
  buscarCacheValido
};