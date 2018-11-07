var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RawHumiditySensor = new Schema({
    name: {type:String, default:'Humidity Sensor'},
    value:{
        analog_value:Number,
        sensor_value:String,
        pinmode_value:String
    },
    sensor_type:String,
    status:Boolean,
    process_time:Number
});
var sensors= mongoose.model('RawHumiditySensor',RawHumiditySensor);
module.exports= sensors;