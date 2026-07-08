function prepararDadosIA(dados) {

    if (!dados) {
        return null;
    }

    return {
        previsaoSemanal: dados.previsaoDias ?? null,
        temperaturaMax: dados.hoje.temperaturaMaxima ?? null,
        temperaturaMin: dados.hoje.temperaturaMinima ?? null,
        precipitacao: dados.hoje.chuva ?? 0,
        chanceDeChuva: dados.hoje.chanceChuva ?? 0
    };
};

module.exports = {prepararDadosIA};