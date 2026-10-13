const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializa a API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testarConexaoGemini() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const result = await model.generateContent("Olá Gemini Teste de conexão, na escuta?");

        return {
            sucesso: true,
            resposta: result.response.text()
        };
    } catch (error) {
        console.error("Erro Gemini:", error.message);

        return {
            sucesso: false,
            erro: error.message
        };
    }
};

// 2. Função de insight mantida separada
async function gerarInsight(dadosClima) {
    try {
        console.log("[Gemini] Iniciando geração do insight.");
        console.log("[Gemini] Dados recebidos:", {
            tipo: typeof dadosClima,
            chaves: dadosClima && typeof dadosClima === "object"
                ? Object.keys(dadosClima)
                : []
        });
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const prompt = `
            Você é um Engenheiro Agrônomo especialista em monitoramento climático de precisão.
            Sua tarefa é analisar os dados meteorológicos fornecidos e gerar um alerta prático de manejo para o produtor rural.

            DADOS CLIMÁTICOS (JSON):
            ${JSON.stringify(dadosClima)}

            INSTRUÇÕES DE ANÁLISE:
            1. Avalie a temperatura do dia atual e a tendência de chuva ao longo da semana.
            2. Identifique oportunidades ou riscos para atividades como: aplicação de defensivos/fertilizantes, plantio, colheita ou irrigação.
            3. Foque em ações preventivas com base no clima.

            REGRAS DE FORMATAÇÃO (CRÍTICAS):
            - O retorno deve ser exclusivamente em texto puro.
            - Seja extremamente direto e prático. O produtor lerá isso em um aplicativo celular no campo.
            - Limite a resposta a no máximo 2 ou 3 frases curtas (máximo de 250 caracteres).
            - Não use saudações formais (como "Olá produtor"), vá direto ao ponto crítico.
            `;

        console.log("[Gemini] Enviando requisição...");
        const result = await model.generateContent(prompt);
        const resposta = result.response.text();
        console.log("[Gemini] Requisição concluída.", {
            respostaRecebida: Boolean(resposta),
            tamanhoResposta: resposta?.length ?? 0
        });

        return resposta;

    } catch (error) {
        console.error("[Gemini] FALHA NA GERAÇÃO DO INSIGHT");
        console.error("Nome:", error.name);
        console.error("Mensagem:", error.message);
        console.error("Status:", error.status);
        console.error("Detalhes:", error.errorDetails);
        console.error("Stack:", error.stack);
        return "Análise inteligente temporariamente indisponível. Consulte os indicadores climáticos para apoiar sua tomada de decisão.";
    }
};

module.exports = { testarConexaoGemini, gerarInsight };