// climate-engine/plantioIndex.js

const { classificarIndice } = require('./classificacoes');

function calcularIndicePlantio(dadosClima) {

    let pontos = 0;
    const fatores = [];

    const temperaturaMedia =
        dadosClima.previsaoDias.reduce(
            (acc, dia) => acc + dia.temperaturaMaxima,
            0
        ) / dadosClima.previsaoDias.length;

    const chuva7Dias =
        dadosClima.previsaoDias
            .reduce((total, dia) => total + dia.chuva, 0);

    // Temperatura ideal
    // console.log('Temperatura media: ', temperaturaMedia);
    // console.log('Chuva7Dias: ', chuva7Dias);

    if (temperaturaMedia >= 20 && temperaturaMedia <= 30) {
        pontos += 30;
        fatores.push('Temperatura adequada para plantio');
    } else {
        fatores.push('Temperatura fora da faixa ideal');
    }

    // Existe chuva prevista

    if (chuva7Dias >= 0 && chuva7Dias < 10) {
        fatores.push('Precipitaçã prevista insuficiente');
    } else if (chuva7Dias >= 10 && chuva7Dias < 40) {
        pontos += 50;
        fatores.push('Precipitação suficiente prevista');
    } else if( chuva7Dias >=40 && chuva7Dias < 60) {
        pontos +=20;
        fatores.push('Precipitação acima da faixa ideal');
    }else{
        pontos -=30;
        fatores.push('Risco de excesso hídrico');
    }

    pontos = Math.max(0, pontos);

    return {
        indicePlantio: pontos,
        classificacao: classificarIndice(pontos),
        fatores,
        temperaturaMedia,
        precipitacaoAcumulada:chuva7Dias
    };
}

module.exports = {
    calcularIndicePlantio
};