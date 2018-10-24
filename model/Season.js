var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SeasonSchema = new Schema({
    name:String,
    overall_value:{
        overall_temp:Number,
        overall_hummidity:Number,
        overall_watering:String,
        overall_light:String,
        overall_air_quality:String,
        overall_revenue:Number
    },
    start_time:Date,
    end_time:Date,
    process_time:Date
});
var seasons= mongoose.model('Season',SeasonSchema);
module.exports= seasons;