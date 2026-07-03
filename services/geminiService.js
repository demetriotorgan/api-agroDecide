const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializa a API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testarConexaoGemini() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent("Olá Gemini Teste de conexão, nas escuta?");

        return {
            sucesso: true,
            resposta: result.response.text()
        };
    } catch (error) {
        console.error("Erro Gemini:", error);

        return {
            sucesso: false,
            erro: error.message
        };
    }
};

// 2. Função de insight mantida separada
async function gerarInsight(dadosClima) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
            Você é um assistente agronômico.
            Analise os dados climáticos abaixo:
            ${JSON.stringify(dadosClima)}
            Forneça uma recomendação curta, objetiva e prática para o produtor rural.
            `;
        const result = await model.generateContent(prompt);
        return result.response.text();

    } catch (error) {
        console.error(
            "Erro ao gerar insight:",
            error.message
        );

        throw error;
    }
};

module.exports =  {testarConexaoGemini, gerarInsight};