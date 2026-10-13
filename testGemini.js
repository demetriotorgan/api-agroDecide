require('dotenv').config();

const {gerarInsight,testarConexaoGemini} = require('./services/geminiService');

async function testarComunicacaoGemini() {
   
    try {

        const resposta = await testarConexaoGemini();

        console.log('\nRESPOSTA GEMINI:\n');
        console.log(resposta);

    } catch (error) {

        console.error(
            'ERRO:',
            error.message
        );

    }
}

async function testarInsightGemini() {
    const dadosClima = {
        temperaturaAtual: 19.4,
        temperaturaMax: 31,
        temperaturaMin: 20,
        umidadeAtual: 98,
        chuvaPrevista: 43.2,
        ventoAtual: 4.4,
        chanceChuvaAtual: 88
    };

    console.log('[Teste] Chamando gerarInsight diretamente...');

    try {
        const resposta = await gerarInsight(dadosClima);

        console.log('\n[Teste] RESPOSTA DO INSIGHT:\n');
        console.log(resposta);
    } catch (error) {
        console.error('[Teste] Erro:', error);
    }
};

testarInsightGemini();