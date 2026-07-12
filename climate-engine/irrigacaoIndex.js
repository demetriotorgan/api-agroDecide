const { classificarIndice } = require("./classificacoes");

function calcularIndiceIrrigacao(dadosClima) {

    let pontos = 0;
    const fatores = [];

    //calculo de Eto acumulada 50 Pontos
    const etoAcumulado =
        dadosClima.previsaoDias.reduce((acc, dia) => acc + dia.evapotranspiracao, 0);

    if (etoAcumulado <= 15) {
        pontos += 10;
        fatores.push('Baixa evapotranspiração prevista, indicando menor perda de água do solo e menor demanda hídrica da cultura')
    } else if (etoAcumulado <= 25) {
        pontos += 30;
        fatores.push( 'Evapotranspiração moderada prevista, exigindo acompanhamento da disponibilidade hídrica para evitar déficit no desenvolvimento da cultura')
    } else {
        pontos += 50;
        fatores.push( 'Elevada evapotranspiração prevista, indicando alta perda de água e aumento da necessidade de irrigação nos próximos dias')
    }

    //Calculo de Deficit Hidrico 30 pontos
    const chuvaAcumulada = dadosClima.previsaoDias.reduce((acc, dia) => acc + dia.chuva, 0);
    const deficit = etoAcumulado - chuvaAcumulada;

    if (deficit < 10) {
        pontos += 10;
        fatores.push('A precipitação prevista tende a compensar grande parte das perdas de água por evapotranspiração, reduzindo o risco de déficit hídrico');
    } else if (deficit <= 20) {
        pontos += 20;
        fatores.push('A reposição hídrica por chuva é parcialmente insuficiente para compensar as perdas por evapotranspiração, indicando atenção ao manejo da irrigação');
    } else {
        pontos += 30;
        fatores.push('A precipitação prevista é insuficiente para compensar as perdas de água por evapotranspiração, aumentando significativamente o risco de déficit hídrico');
    }

    //Calculo de Temperatura Média 20 Pontos
    const tempMediaMax = dadosClima.previsaoDias.reduce(
        (acc, dia) => acc + dia.temperaturaMaxima, 0
    );
    const tempMediaMin = dadosClima.previsaoDias.reduce(
        (acc, dia) => acc + dia.temperaturaMinima, 0
    );

    const mediaMax = tempMediaMax / 7;
    const mediaMin = tempMediaMin / 7;

    const tempMedia = (mediaMax + mediaMin) / 2;

    if (tempMedia < 20) {
        pontos += 5;
        fatores.push('Temperaturas amenas favorecem menores taxas de evapotranspiração, reduzindo a perda de água do sistema solo-planta');

    } else if (tempMedia <= 20 && tempMedia <= 28) {
        pontos += 10;
        fatores.push('Temperaturas moderadas contribuem para níveis intermediários de evapotranspiração, exigindo acompanhamento das condições hídricas da cultura');
    } else {
        pontos += 20;
        fatores.push('Temperaturas elevadas intensificam a evapotranspiração e aumentam a demanda hídrica das plantas, favorecendo a necessidade de irrigação');
    }

    return {
        indiceIrrigacao: pontos,
        classificacao: classificarIndice(pontos),
        fatores,
        temperaturaMedia: tempMedia,
        precipitacaoAcumulada: chuvaAcumulada,
        evapotranspiracaoAcumulada: etoAcumulado,        
        deficitHidrico: deficit
                
    };

};

module.exports ={
    calcularIndiceIrrigacao
};