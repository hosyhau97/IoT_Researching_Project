var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EngineSchema = new Schema({
    name:String,
    value:{
        analog_value:Number,
        light_value:String,
        pinmode_value:String
    },
    engine_type:String,
    status:Boolean,
    start_time:Date,
    end_time:Date,
    time_type:Boolean,
    process_time:Date
});
var engines= mongoose.model('Engine',EngineSchema);
module.exports= engines;