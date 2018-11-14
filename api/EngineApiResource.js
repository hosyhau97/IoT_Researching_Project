var FlatternFanEngine = require('../repository/enity/flatterner/engine/FlatternFanEngine');
var FlatternLightEngine = require('../repository/enity/flatterner/engine/FlatternLightEngine');
var FlatternRoofEngine = require('../repository/enity/flatterner/engine/FlatternRoofEngine');
var FlatternWaterEngine = require('../repository/enity/flatterner/engine/FlatternWaterEngine');

var constants = require('../constants/config');
var verifyToken = require('../auth/VerifyToken');

module.exports.enngineAPI = function (app) {

    app.get('/engine-data', verifyToken, async function (req, res) {
        try {
            var engine = [];
            var air = await getRawAirSensor();
            var soil = await getRawSoilSensor();
            var hum = await getRawHumiditySensor();
            var light = await getRawLightSensor();
            var temp = await getRawTempSensor();
            
            engine.push(temp);
            engine.push(hum);
            engine.push(light);
            engine.push(soil);
        } catch (error) {
            return res.status(500).json({message:constants.INTERNAL_SERVER, code:500});
        }
        return res.status(200).json({ engine });
    });

    function getFlatternFan() {
        return new Promise(function (resolve, reject) {
            var query = FlatternFanEngine.find({}, {name:1, value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }

    function getFlatternLight() {
        return new Promise(function (resolve, reject) {
            var query = FlatternLightEngine.find({}, {name:1, value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }

    function getFlatternRoof() {
        return new Promise(function (resolve, reject) {
            var query = FlatternRoofEngine.find({}, {name:1, value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }

    function getFlatternWater() {
        return new Promise(function (resolve, reject) {
            var query = FlatternWaterEngine.find({}, {value: 1, process_time: 1 }).sort({ "process_time": -1 }).limit(1);

            query.exec(function (err, data) {
                if (err) {
                    return reject(err);
                }
                return resolve(data[0]);
            });
        })
    }
}