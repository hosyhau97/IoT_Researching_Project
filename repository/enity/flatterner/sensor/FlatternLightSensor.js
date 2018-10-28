var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlatternLightSensor = new Schema({
    name: { type: String, default: 'LightSensor' },
    value: {
        analog_value: Number,
        sensor_value: String,
        pinmode_value: String
    },
    sensor_type: { type: String, default: 'LightSensor' },
    status: String,
    over_all_value:Number,
    start_time:Date,
    end_time:Date,
    process_time:Date
});
var sensors = mongoose.model('FlatternLightSensor', FlatternLightSensor);
module.exports = sensors;