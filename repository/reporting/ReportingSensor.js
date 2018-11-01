var cron = require('node-cron');
var MetaCronJobs = require('../enity/flatterner/MetaCronJobs');

module.exports.cronJobsSensor = function(){
    
    cron.schedule('00 30 11 * * *', function(){
       var cronJob = MetaCronJobs.find().sort({batch :-1}).limit(1);
    },
    {
        scheduled: true,
        timeZone: 'Asia/Ho_Chi_Minh'
      });
}