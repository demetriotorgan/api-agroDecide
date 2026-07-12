const weatherMapper = (data) => {

  const previsaoDias = data.daily.time.map((dataStr, index) => ({
    data: dataStr,
    chuva:
      data.daily.precipitation_sum?.[index] ?? 0,
    temperaturaMaxima:
      data.daily.temperature_2m_max?.[index] ?? 0,
    temperaturaMinima:
      data.daily.temperature_2m_min?.[index] ?? 0,
    chanceChuva:
      data.daily.precipitation_probability_max?.[index] ?? 0,
    codigoClima:
      data.daily.weather_code?.[index] ?? null,
    evapotranspiracao:
      data.daily.et0_fao_evapotranspiration?.[index] ?? 0
  }));

  const hoje = previsaoDias[0];

  const agora = new Date();

  const horaAtual = `${agora.getFullYear()}-${String(
    agora.getMonth() + 1
  ).padStart(2, '0')}-${String(
    agora.getDate()
  ).padStart(2, '0')}T${String(
    agora.getHours()
  ).padStart(2, '0')}:00`;

  const indiceHoraAtual =
    data.hourly.time.findIndex(
      hora => hora === horaAtual
    );

  const indiceAtual =
    indiceHoraAtual >= 0
      ? indiceHoraAtual
      : 0;

  const resumoHorario = {

    temperaturaAtual:
      data.hourly.temperature_2m?.[indiceAtual] ?? null,

    umidadeAtual:
      data.hourly.relative_humidity_2m?.[indiceAtual] ?? null,

    ventoAtual:
      data.hourly.wind_speed_10m?.[indiceAtual] ?? null,

    chanceChuvaAtual:
      data.hourly.precipitation_probability?.[indiceAtual] ?? null,

    umidadeAtual:
      data.hourly.relative_humidity_2m[indiceAtual] ?? null,
      
    ventoAtual:
      data.hourly.wind_speed_10m[indiceAtual] ?? null
  };

  return {

    ...data,
    hoje,
    previsaoDias,
    resumoHorario
  };
};

module.exports = weatherMapper;