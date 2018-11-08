var cron = require('node-cron');
var MetaCronJobs = require('../enity/flatterner/MetaCronJobs');

module.exports.cronJobsSensor = function(){
    
    cron.schedule('00 30 11 * * *', async function(){
       
        var data = await getMetaCronJobs();
        var meta = data[0];
        var date = new Date();
    },
    {
        scheduled: true,
        timeZone: 'Asia/Ho_Chi_Minh'
      });

      function getMetaCronJobs() {
        return new Promise(function (resolve, reject) {
            var query = MetaCronJobs.find().sort({ "batch": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        })
    }
}