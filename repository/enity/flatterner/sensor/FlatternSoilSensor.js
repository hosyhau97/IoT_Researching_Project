var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlatternSoilSensor = new Schema({
    name: { type: String, default: 'SoilSensor' },
    value: {
        analog_value: Number,
        sensor_value: String,
        pinmode_value: String
    },
    sensor_type: { type: String, default: 'SoilSensor' },
    status: String,
    over_all_value:Number,
    start_time:Date,
    end_time:Date,
    process_time:Date
});
var sensors = mongoose.model('FlatternSoilSensor', FlatternSoilSensor);
module.exports = sensors;