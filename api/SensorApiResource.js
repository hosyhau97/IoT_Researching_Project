var RawAirSensor = require('../repository/enity/raw/RawAirSensor');
var RawSoilSensor = require('../repository/enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../repository/enity/raw/RawHumiditySensor');
var RawLightSensor = require('../repository/enity/raw/RawLightSensor');
var RawTempSensor = require('../repository/enity/raw/RawTempSensor');
var constants = require('../constants/config');

module.exports.sensorAPI = function (app) {

    app.get('/sensor-data', async function (req, res) {
        try {
            var object = [];
            var airs = await getRawAirSensor();
            var soils = await getRawSoilSensor();
            var hums = await getRawHumiditySensor();
            var lights = await getRawLightSensor();
            var temps = await getRawTempSensor();
            var air = { "air": airs[0] };
            var soil = { "soil": soils[0] };
            var hum = { "humidity": hums[0] };
            var light = { "light": lights[0] };
            var temp = { "temperature": temps[0] };
            object.push(air);
            object.push(soil);
            object.push(hum);
            object.push(light);
            object.push(temp);
        } catch (error) {
            return res.status(500).json({message:constants.INTERNAL_SERVER, code:500});
        }
        return res.status(200).json({ object });
    });

    function getRawAirSensor() {
        return new Promise(function (resolve, reject) {
            var query = RawAirSensor.find({}, { value: 1, status: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        })
    }

    function getRawSoilSensor() {
        return new Promise(function (resolve, reject) {
            var query = RawSoilSensor.find({}, { value: 1, status: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        })
    }

    function getRawHumiditySensor() {
        return new Promise(function (resolve, reject) {
            var query = RawHumiditySensor.find({}, { value: 1, status: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        })
    }

    function getRawLightSensor() {
        return new Promise(function (resolve, reject) {
            var query = RawLightSensor.find({}, { value: 1, status: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        })
    }

    function getRawTempSensor() {
        return new Promise(function (resolve, reject) {
            var query = RawTempSensor.find({}, { value: 1, status: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
        })
    }
}