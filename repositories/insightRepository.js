const InsightCache = require('../models/InsightCache');

async function buscarInsight(weatherHash){
    return await InsightCache.findOne({weatherHash})
};

async function salvarInsight(weatherHash, insight){
    return await InsightCache.create({
        weatherHash,
        insight,
        modeloIA: 'gemini-3-flash-preview'
    });
};

async function apagarCacheInsights() {
    return await InsightCache.deleteMany({});
}

async function atualizarInisght(weatherHash, insight){
    return await InsightCache.findOneAndUpdate(
        {weatherHash},
        {insight},
        {modeloIA: 'gemini-3-flash-preview'},
        {new: true, upsert:true}
    );
};

module.exports = {buscarInsight, salvarInsight, atualizarInisght, apagarCacheInsights}