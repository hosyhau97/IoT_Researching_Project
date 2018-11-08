var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RawSoilSensor = new Schema({
    name: {type:String, default: 'Soil sensor'},
    value:Number,
    sensor_type:String,
    status:Boolean,
    process_time:Number
});
var sensors= mongoose.model('RawSoilSensor',RawSoilSensor);
module.exports= sensors;