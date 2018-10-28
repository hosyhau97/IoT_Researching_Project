var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlatternLightEngine = new Schema({
    name: {type:String, default:'Light engine'},
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
var engines = mongoose.model('FlatternLightEngine', FlatternLightEngine);
module.exports = engines;