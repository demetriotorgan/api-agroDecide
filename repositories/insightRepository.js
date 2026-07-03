const InsightCache = require('../models/InsightCache');

async function buscarInsight(weatherHash){
    return await InsightCache.findOne({weatherHash})
};

async function salvarInsight(weatherHash, insight){
    return await InsightCache.create({
        weatherHash,
        insight,
        modeloIA: 'gemini-2.5-flash'
    });
};

async function atualizarInisght(weatherHash, insight){
    return await InsightCache.findOneAndUpdate(
        {weatherHash},
        {insight},
        {modeloIA: 'gemini-2.5-flash'},
        {new: true, upsert:true}
    );
};

module.exports = {buscarInsight, salvarInsight, atualizarInisght}