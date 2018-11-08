var RawAirSensor = require('../repository/enity/raw/RawAirSensor');
var RawSoilSensor = require('../repository/enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../repository/enity/raw/RawHumiditySensor');
var RawLightSensor = require('../repository/enity/raw/RawLightSensor');
var RawTempSensor = require('../repository/enity/raw/RawTempSensor');
var constants = require('../constants/config');
var verifyToken = require('../auth/VerifyToken');

module.exports.sensorAPI = function (app) {

    app.get('/sensor-data', verifyToken, async function (req, res) {
        try {
            var sensor = [];
            var air = await getRawAirSensor();
            var soil = await getRawSoilSensor();
            var hum = await getRawHumiditySensor();
            var light = await getRawLightSensor();
            var temp = await getRawTempSensor();
            
            sensor.push(temp);
            sensor.push(hum);
            sensor.push(light);
            sensor.push(soil);
            sensor.push(air);
            
        } catch (error) {
            return res.status(500).json({message:constants.INTERNAL_SERVER, code:500});
        }
        return res.status(200).json({ sensor });
    });

    function getRawAirSensor() {
        return new Promise(function (resolve, reject) {
            var query = RawAirSensor.find({}, {name:1, value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }

    function getRawSoilSensor() {
        return new Promise(function (resolve, reject) {
            var query = RawSoilSensor.find({}, {name:1, value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }

    function getRawHumiditySensor() {
        return new Promise(function (resolve, reject) {
            var query = RawHumiditySensor.find({}, {name:1, value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }

    function getRawLightSensor() {
        return new Promise(function (resolve, reject) {
            var query = RawLightSensor.find({}, {name:1, value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }

    function getRawTempSensor() {
        return new Promise(function (resolve, reject) {
            var query = RawTempSensor.find({}, {name:1, value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }
}