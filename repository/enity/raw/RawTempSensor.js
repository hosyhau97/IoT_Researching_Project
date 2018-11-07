var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RawTemperatureSensor = new Schema({
    name: {type: String, default:'Temperature Sensor'},
    value:{
        analog_value:Number,
        sensor_value:String,
        pinmode_value:String
    },
    sensor_type:String,
    status:Boolean,
    process_time:Number
});
var sensors= mongoose.model('RawTemperatureSensor',RawTemperatureSensor);
module.exports= sensors;