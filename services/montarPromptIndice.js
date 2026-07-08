function montarPrompt(tipoIndice, dadosIndice) {

    switch (tipoIndice) {

        case 'plantio':
        return `
            Você é um agrônomo especialista em plantio.
            Analise exclusivamente o índice de plantio abaixo.

            Dados:
            ${JSON.stringify(dadosIndice, null, 2)}

            Regras:
            - Explique o resultado em no máximo 3 frases.
            - Utilize linguagem simples para produtores rurais.
            - Considere temperatura e precipitação.
            - Não invente dados.
            - Analise apenas plantio.

            Retorne somente a análise.
            `;

        default:
            throw new Error(
                `Tipo de índice não suportado: ${tipoIndice}`
            );
    }
}

module.exports = montarPrompt;