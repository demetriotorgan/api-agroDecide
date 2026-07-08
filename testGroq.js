require('dotenv').config();

const { gerarAnaliseClimatica } = require("./services/groqService");

async function testar(){
    try {
        const resposta = await gerarAnaliseClimatica();
        console.log('Resposta do Groq: ', resposta);        
    } catch (error) {
        console.error('Erro: ', error);
    }
}

testar();