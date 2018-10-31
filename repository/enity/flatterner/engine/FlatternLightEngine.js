var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FlatternLightEngine = new Schema({
    name: {type:String, default:'Light engine'},
    engine_type: String,
    status: Boolean,
    start_time: Number,
    end_time: Number,
    duration:Number,
    time_type: String,
    process_time: Number
});
var engine_lights = mongoose.model('FlatternLightEngine', FlatternLightEngine);
module.exports = engine_lights;