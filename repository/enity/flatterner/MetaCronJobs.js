var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MetaCronJobs = new Schema({
    job_name:String,
    source_table:String,
    status:String,
    batch:Number,
    batch_start_time:Number,
    batch_end_time:Number,
    modified_time:Number,
    process_time:Number
});
var sensors= mongoose.model('MetaCronJobs',MetaCronJobs);
module.exports= sensors;