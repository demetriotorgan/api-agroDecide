function prepararDadosIA(dadosHoje) {

    if (!dadosHoje) {
        return null;
    }

    return {
        temperaturaMax: dadosHoje.temperaturaMaxima ?? null,
        temperaturaMin: dadosHoje.temperaturaMinima ?? null,
        precipitacao: dadosHoje.chuva ?? 0,
        chanceDeChuva: dadosHoje.chanceChuva ?? 0
    };
};

module.exports = {prepararDadosIA};