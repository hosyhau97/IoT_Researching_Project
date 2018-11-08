var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RawHumiditySensor = new Schema({
    name: {type:String, default:'Humidity Sensor'},
    value:Number,
    sensor_type:String,
    status:Boolean,
    process_time:Number
});
var sensors= mongoose.model('RawHumiditySensor',RawHumiditySensor);
module.exports= sensors;