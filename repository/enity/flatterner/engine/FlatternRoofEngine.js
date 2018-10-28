var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlatternRoofEngine = new Schema({
    name: { type: String, default: 'Roof engine control' },
    value: {
        analog_value: Number,
        engine_value: String,
        pinmode_value: String
    },
    engine_type: String,
    status: Boolean,
    start_time: Date,
    end_time: Date,
    time_type: String,
    process_time: Date
});
var engines = mongoose.model('FlatternRoofEngine', FlatternRoofEngine);
module.exports = engines;