const { gerarIndicesClimaticos } = require('../climate-engine/agregadorIndices');
const { gerarAnaliseClimatica } = require('../services/groqService');
const getWeather = require('../services/openMeteoService');

module.exports.testeGroq = async (req, res) => {
    let dadosClimaticos;
    
    try {
        const {latitude, longitude} = req.query;
        if(!latitude || !longitude){
            return res.status(400).json({
                success:false,
                message: 'Latitude e longitude são obrigatórios'
            });
        }

        dadosClimaticos = await getWeather({latitude,longitude})

        const indices = gerarIndicesClimaticos(dadosClimaticos)       
        
        if(!indices){
            res.status(404).json({
                success:false,
                message:'Não foi possível obter indices climáticos'
            });
        }
        console.log(indices.plantio);

        const gerarAnaliseDePlantio = await gerarAnaliseClimatica('plantio',indices.plantio);
        
        res.status(200).json({
            success:true,
            indices: indices,
            gerarAnaliseDePlantio
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}