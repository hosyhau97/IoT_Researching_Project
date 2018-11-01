var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlatternFanEngine = new Schema({
    name: { type: String, default: 'Fan engine control' },
    engine_type: String,
    status: Boolean,
    start_time: Number,
    end_time: Number,
    duration:Number,
    time_type: String,
    process_time: Number
});
var engines = mongoose.model('FlatternFanEngine', FlatternFanEngine);
module.exports = engines;