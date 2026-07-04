const mongoose = require('mongoose');

const InightCacheSchema = new mongoose.Schema({
    
  weatherHash:{
    type:String,
    required:true
  },
  insight:{
    type:String,
    required:true
  },
  modeloIA:{
    type:String,
    required:true
  }

},{
    timestamps:true
});

InightCacheSchema.index({
  weatherHash:1
},{
  unique:true
});

module.exports = mongoose.model('insightCache', InightCacheSchema);