var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RawLightSensor = new Schema({
    name: {type:String, default:'Light sensor'},
    value:Number,
    sensor_type:String,
    status:Boolean,
    process_time:Number
});
var sensors= mongoose.model('RawLightSensor',RawLightSensor);
module.exports= sensors;