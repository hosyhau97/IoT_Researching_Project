var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlatternWaterEngine = new Schema({
    name: {type:String, default:'Water engine control'},
    engine_type: String,
    status: Boolean,
    start_time: Date,
    end_time: Date,
    time_type: String,
    process_time: Date
});
var engines = mongoose.model('FlatternWaterEngine', FlatternWaterEngine);
module.exports = engines;