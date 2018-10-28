var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlatternAirSensor = new Schema({
    name: { type: String, default: 'AirSensor' },
    value: {
        analog_value: Number,
        sensor_value: String,
        pinmode_value: String
    },
    sensor_type: { type: String, default: 'AirSensor' },
    status: String,
    start_time:Date,
    end_time:Date,
    process_time:Date
});
var sensors = mongoose.model('FlatternAirSensor', FlatternAirSensor);
module.exports = sensors;