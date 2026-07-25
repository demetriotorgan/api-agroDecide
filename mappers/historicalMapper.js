const historicalMapper = (data) => {
    if(!data.daily || !data.daily.time){
        throw new Error('Resposta inválida da OpenMeteo');
    }

    const historicoDias = data.daily.time.map((dataDia, index) => ({
        data: dataDia,
        chuva: data.daily.precipitation_sum?.[index] ?? 0,
        temperatura: data.daily.temperature_2m_mean?.[index] ?? 0,
        eto: data.daily.et0_fao_evapotranspiration?.[index] ?? 0
    }));

    //----médias
    
    const temperaturaMedia = historicoDias.reduce((acc,dia)=> acc + dia.temperatura,0)/historicoDias.length    
    const chuvaAcumulada = historicoDias.reduce((acc, dia) => acc + dia.chuva, 0);
    const etoMedio = historicoDias.reduce((acc,dia)=>acc + dia.eto,0);

    //----metricas extras
    const diasComChuva = historicoDias.filter(dia => dia.chuva > 0).length;
    const diasSecos = historicoDias.filter(dia => dia.chuva === 0).length;
    const maiorChuva = Math.max(...historicoDias.map(dia=>dia.chuva));

    return {
        periodo: {
            inicio: data.daily.time[0],
            fim: data.daily.time.at(-1)
        },
        resumo:{
            chuvaAcumulada,
            temperaturaMedia,
            etoMedio,
            diasComChuva,
            diasSecos,
            maiorChuva
        },          
        historicoDias
    }
}

module.exports = historicalMapper;