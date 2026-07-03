const { buscarInsight, salvarInsight } = require('../repositories/insightRepository');
const { gerarInsight } = require('./geminiService');

function validarDadosClimaticos(dadosClima){
      if (!dadosClima || typeof dadosClima !== 'object') {
        return {
            valido: false,
            erro: 'Objeto climático ausente'
        };
    }

    const camposObrigatorios = [
        'temperaturaMax',
        'temperaturaMin',
        'precipitacao',
        'chanceDeChuva'
    ];

    const camposAusentes = camposObrigatorios.filter(
        campo => dadosClima[campo] === undefined || dadosClima[campo] === null
    );

    if (camposAusentes.length > 0) {
        return {
            valido: false,
            erro: `Campos ausentes: ${camposAusentes.join(', ')}`
        };
    }

    return {
        valido: true
    };
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