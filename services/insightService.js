const { buscarInsight, salvarInsight } = require('../repositories/insightRepository');
const { gerarInsight } = require('./geminiService');

function validarDadosClimaticos(dadosClima) {
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

async function obterInsight(weatherHash, dadosClima) {
    // console.log(dadosClima);
    console.log('[Insight] Iniciando obterInsight');
    console.log('[Insight] weatherHash:', weatherHash);

    const validacao = validarDadosClimaticos(dadosClima);
    // console.log(validacao);
    console.log('[Insight] Validação:', validacao);

    if (!validacao.valido) {
        console.warn('Dados climáticos inválidos. Insight não gerado');
        return 'Não foi possível gerar insight';
    }
    console.log('[Insight] Consultando cache de insights...');

    const insightExistente = await buscarInsight(weatherHash)
    if (insightExistente) {
        console.log('[Insight] INSIGHT CACHE HIT');
        console.log(
            '[Insight] Conteúdo encontrado:',
            insightExistente.insight
        );
        return insightExistente.insight;
    }
    console.log('[Insight] INSIGHT CACHE MISS');
    // console.log('[Insight] Chamando gerarInsight...');

    const insight = await gerarInsight(dadosClima);

    const mensagemIndisponivel =
        'Análise inteligente temporariamente indisponível. Consulte os indicadores climáticos para apoiar sua tomada de decisão.';

    if (insight === mensagemIndisponivel) {
        console.warn(
            '[Insight] Falha na geração. Resultado não será armazenado no cache.'
        );

        return insight;
    }

    // onsole.log('[Insight] gerarInsight retornou:', insight);
    // console.log('[Insight] Salvando resultado no cache...');

    await salvarInsight(weatherHash, insight);
    return insight;
}

module.exports = { obterInsight };