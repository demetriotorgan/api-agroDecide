const { getHistorical } = require("../services/openMeteoService");

module.exports.buscarHistorico = async(req,res)=>{
    try {
        const {latitude, longitude, start_date, end_date} = req.query;
        
        if(!latitude || !longitude || !start_date || !end_date){
            return res.status(400).json({
                success:false,
                message:'Latitude, longitude, start_date e end_date são obrigatórios'
            })
        }
        const historico = await getHistorical({latitude,longitude,  start_date, end_date});
        return res.status(200).json({
            success:true,
            historico
        });
    } catch (error) {
        console.error(error);
        return res.status(503).json({
            success:false,
            code:error.code,
            message: error.message
        });
    }
};