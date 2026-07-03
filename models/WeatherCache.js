const mongoose = require('mongoose');

const WeatherCacheSchema = new mongoose.Schema({

  latitude:{
    type:Number,
    required:true
  },

  longitude:{
    type:Number,
    required:true
  },

  weatherHash:{
    type:String,
    required:true
  },

  hoje:{
    data:String,
    chuva:Number,
    temperaturaMaxima:Number,
    temperaturaMinima:Number,
    chanceChuva:Number,
    codigoClima:Number
  },

  previsaoDias:[{
    data:String,
    chuva:Number,
    temperaturaMaxima:Number,
    temperaturaMinima:Number,
    chanceChuva:Number,
    codigoClima:Number
  }],

  resumoHorario:{
    temperaturaAtual:Number,
    umidadeAtual:Number,
    ventoAtual:Number,
    chanceChuvaAtual:Number
  },

  rawData:{
    type:mongoose.Schema.Types.Mixed,
    required:true
  }

},{
  timestamps:true
});

WeatherCacheSchema.index({
  latitude:1,
  longitude:1,
  updatedAt: -1  
});

module.exports =
  mongoose.model(
    'weatherCache',
    WeatherCacheSchema
  );