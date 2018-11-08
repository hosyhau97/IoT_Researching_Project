var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RawTemperatureSensor = new Schema({
    name: {type: String, default:'Temperature Sensor'},
    value:Number,
    sensor_type:String,
    status:Boolean,
    process_time:Number
});
var sensors= mongoose.model('RawTemperatureSensor',RawTemperatureSensor);
module.exports= sensors;