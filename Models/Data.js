const mongoose= require('mongoose');

const dataSchema=new mongoose.Schema({
  officeName:String,
  pincode:Number,
  taluk:String,
  cityName:String,
  stateName:String
});


const Data = mongoose.model('data',dataSchema);

module.exports.Data= Data;