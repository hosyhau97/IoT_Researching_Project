var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MetaCronJobs = new Schema({
    job_name:String,
    source_table:String,
    status:String,
    batch:Date,
    batch_start_time:Date,
    batch_end_time:Date,
    modified_time:Date,
    process_time:Date
});
var sensors= mongoose.model('MetaCronJobs',MetaCronJobs);
module.exports= sensors;