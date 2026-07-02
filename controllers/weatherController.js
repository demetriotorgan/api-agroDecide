
const getWeather = require('../services/openMeteoService');

module.exports.buscarClima = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        
        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: 'Latitude e longitude são obrigatórias'
            });
        }
        const data = await getWeather({ latitude, longitude });
        res.json({
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

