const { buscarInsight, salvarInsight } = require('../repositories/insightRepository');
const { gerarInsight } = require('./geminiService');

function validarDadosClimaticos(dadosClima){
     if (!dadosClima) {
        return {
            valido: false,
            erro: 'Objeto climático ausente'
        };
    }    
    return {
        valido:true
    }
};

async function obterInsight(weatherHash,dadosClima) {
    // console.log(dadosClima);
    const validacao = validarDadosClimaticos(dadosClima);
    // console.log(validacao);

    if(!validacao.valido){
        console.warn('Dados climáticos inválidos. Insight não gerado');
        return 'Não foi possível gerar insight';
    }

    const insightExistente = await buscarInsight(weatherHash)
        if(insightExistente){
            console.log('INSIGHT CACHE HIT');
            return insightExistente.insight;
        }
    console.log('INSIGHT CACHE MISS');
    
    const insight = await gerarInsight(dadosClima);
    await salvarInsight(weatherHash, insight);
    return insight;     
}

module.exports = {obterInsight};