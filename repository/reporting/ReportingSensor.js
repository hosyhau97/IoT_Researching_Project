var cron = require('node-cron');
var MetaCronJobs = require('../enity/flatterner/MetaCronJobs');
var RawAirSensor = require('../enity/raw/RawAirSensor');
var RawSoilSensor = require('../enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../enity/raw/RawHumiditySensor');
var RawLightSensor = require('../enity/raw/RawLightSensor');
var RawTempSensor = require('../enity/raw/RawTempSensor');
module.exports.cronJobsSensor = function(){
    
    cron.schedule('00 0 6 * * *', async function(){
        
    },
    {
        scheduled: true,
        timeZone: 'Asia/Ho_Chi_Minh'
      });   
}
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

function getAirValue(start, end){
    return new Promise(function (resolve, reject) {
        var query = RawAirSensor.find({process_time:{$gt:start, $lt:end}});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getSoilValue(start, end){
    return new Promise(function (resolve, reject) {
        var query = RawSoilSensor.find({process_time:{$gt:start, $lt:end}});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getLightValue(start, end){
    return new Promise(function (resolve, reject) {
        var query = RawLightSensor.find({process_time:{$gt:start, $lt:end}});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getHumidityValue(start, end){
    return new Promise(function (resolve, reject) {
        var query = RawHumiditySensor.find({process_time:{$gt:start, $lt:end}});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getTemperatureValue(start, end){
    return new Promise(function (resolve, reject) {
        var query = RawTempSensor.find({process_time:{$gt:start, $lt:end}});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}