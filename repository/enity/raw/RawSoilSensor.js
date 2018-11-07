var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RawSoilSensor = new Schema({
    name: {type:String, default: 'Soil sensor'},
    value:{
        analog_value:Number,
        sensor_value:String,
        pinmode_value:String
    },
    sensor_type:String,
    status:Boolean,
    process_time:Number
});
var sensors= mongoose.model('RawSoilSensor',RawSoilSensor);
module.exports= sensors;