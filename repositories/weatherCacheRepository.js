const WeatherCache = require('../models/weatherCache');

async function buscarCacheValido(latitude, longitude) {

  const umaHoraAtras = new Date(
    Date.now() - (60 * 60 * 1000)
  );

  return WeatherCache.findOne({
    latitude,
    longitude,
    updatedAt: {
      $gte: umaHoraAtras
    }
  }).sort({ updatedAt: -1 });

}

async function salvarCache(cacheData) {
  return WeatherCache.create(cacheData);
}

async function atualizarCache(cacheData) {
  return WeatherCache.findOneAndUpdate(
    {
      latitude: cacheData.latitude,
      longitude: cacheData.longitude
    },
     {
      ...cacheData
    },
     {
      new: true,
      upsert: true
    }
  );
}

module.exports = {
  buscarCacheValido,
  salvarCache,
  atualizarCache
};