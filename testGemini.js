require('dotenv').config();

const {gerarInsight,testarConexaoGemini} = require('./services/geminiService');

async function testar() {

    const dadosClima = {
        temperaturaMax: 31,
        temperaturaMin: 20,
        chuva: 0,
        umidade: 55
    };

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

testar();