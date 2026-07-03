const crypto = require('crypto');
const getWeather = require('../services/openMeteoService');
const { buscarCacheValido, salvarCache, atualizarCache } = require('../repositories/weatherCacheRepository');

module.exports.buscarClima = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: 'Latitude e longitude são obrigatórias'
            });
        }
        const cache = await buscarCacheValido(Number(latitude), Number(longitude));
        if (cache) {
            console.log('CACHE HIT');
            return res.json({
                sucess: true,
                data: cache.rawData
            })
        }
        console.log('CACHE MISS');

        const data = await getWeather({ latitude, longitude });
        const weatherHash = crypto
            .createHash('sha256')
            .update(JSON.stringify(data.previsaoDias))
            .digest('hex');

        await atualizarCache({
            latitude: Number(latitude),
            longitude: Number(longitude),
            weatherHash,
            hoje: data.hoje,
            previsaoDias: data.previsaoDias,
            resumoHorario: data.resumoHorario,
            rawData: data
        });

        return res.json({
            success: true,
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Erro ao buscar dados climáticos"
        });

    }
};

