const Groq = require('groq-sdk');
const montarPrompt = require('./montarPromptIndice');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function gerarAnaliseClimatica(tipoIndice, dadosIndice) {
    const prompt = montarPrompt(tipoIndice, dadosIndice);
    // console.log(prompt);
        
    const resposta = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.2
    });
    return resposta.choices[0].message.content;
}

module.exports = { gerarAnaliseClimatica }