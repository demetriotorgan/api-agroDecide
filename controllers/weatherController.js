const crypto = require('crypto');
const getWeather = require('../services/openMeteoService');
const { buscarCacheValido, salvarCache, atualizarCache } = require('../repositories/weatherCacheRepository');
const { obterInsight } = require('../services/insightService');
const gerarHash = require('../util/gerarHash');
const { prepararDadosIA } = require('../mappers/insightMapper');

module.exports.buscarClima = async (req, res) => {
    let dadosClimaticos;
    let weatherHash;

    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: 'Latitude e longitude são obrigatórias'
            });
        }
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        const cache = await buscarCacheValido(Number(latitude), Number(longitude));
        console.log(
            cache ? 'CACHE HIT' : 'CACHE MISS'
        );
        if (cache) {
            console.log('CACHE HIT');
            dadosClimaticos = cache.rawData;
            weatherHash = cache.weatherHash;
        } else {
            console.log('CACHE MISS');

            dadosClimaticos = await getWeather({ latitude, longitude });

            weatherHash = gerarHash(dadosClimaticos.hoje);

            await atualizarCache({
                latitude: Number(latitude),
                longitude: Number(longitude),
                weatherHash,
                hoje: dadosClimaticos.hoje,
                previsaoDias: dadosClimaticos.previsaoDias,
                resumoHorario: dadosClimaticos.resumoHorario,
                rawData: dadosClimaticos
            });
        }

        const dadosIA = prepararDadosIA(dadosClimaticos.hoje);
        const insightAgronomico = await obterInsight(weatherHash, dadosIA);

        return res.json({
            success: true,
            data: {
                ...dadosClimaticos,
                insightAgronomico
            }
        });
    } catch (error) {
        console.error(error);
        if (
            error.code ===
            'OPEN_METEO_UNAVAILABLE'
        ) {

            return res.status(503).json({
                success: false,
                code: 'OPEN_METEO_UNAVAILABLE',
                message:
                    'O serviço meteorológico está temporariamente indisponível. Tente novamente em alguns minutos.'
            });
        }

        return res.status(500).json({
            success: false,
            message:
                'Erro interno ao buscar dados climáticos.'
        });

    }
};

