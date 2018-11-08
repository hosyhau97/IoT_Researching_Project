var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RawAirSensor = new Schema({
    name:{type : String, default :'Air sensor'},
    value:Number,
    sensor_type:String,
    status:Boolean,
    process_time:Number
});
var sensors= mongoose.model('RawAirSensor',RawAirSensor);
module.exports= sensors;