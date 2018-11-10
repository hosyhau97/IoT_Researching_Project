var RawAirSensor = require('../repository/enity/raw/RawAirSensor');
var RawSoilSensor = require('../repository/enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../repository/enity/raw/RawHumiditySensor');
var RawLightSensor = require('../repository/enity/raw/RawLightSensor');
var RawTempSensor = require('../repository/enity/raw/RawTempSensor');
var TimeUtils = require('../util/TimeUtil');
module.exports.dataSensorChartByDay = function (io) {
    io.on('connection', function (socket) {
        console.log('reporting connected');
        socket.on('view-chart', async function (data) {

            var date = new Date();
            var end = Math.round(date.getTime() / 1000);
            if (data.time && checkTime(data.time)) {
                console.log("HiHI");
                var start = data.time;
                var lights = await getLightValue(start, end);
                if (lights.length > 0)
                    io.emit('data-chart', [{ light: lights }, { time: end }]);
                else io.emit('data-chart', []);
            } else {
                var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
                var lights = await getLightValue(start, end);
                console.log(lights);
                io.emit('data-chart', [{ light: lights }, { time: end }]);
            }
        });
    });
}
/*
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
}*/

function getAirValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawAirSensor.find({ process_time: { $gt: start, $lt: end } }, {value:1, process_time:1});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getSoilValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawSoilSensor.find({ process_time: { $gt: start, $lt: end } }, {value:1, process_time:1});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getLightValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawLightSensor.find({ process_time: { $gt: start, $lt: end }}, {value:1, process_time:1});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getHumidityValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawHumiditySensor.find({ process_time: { $gt: start, $lt: end } }, {value:1, process_time:1});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getTemperatureValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawTempSensor.find({ process_time: { $gt: start, $lt: end } }, {value:1, process_time:1});
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

async function getData(start, end) {
    var lights = await getLightValue(start, end);
    var temps = await getTemperatureValue(start, end);
    var airs = await getAirValue(start, end);
    var humidities = await getHumidityValue(start, end);
    var soils = await getSoilValue(start, end);

    var light = lights.map(item =>{
        
    });
    var result = [{light:lights},{temperature:temps},{},{},{},{}]
}

function checkTime(time) {
    var now = new Date();
    var date = convertTimestampToDate(time);
    var yearNow = now.getFullYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();

    var yearDate = date.getFullYear();
    var monthDate = date.getMonth();
    var dateDate = date.getDate();

    if (yearNow < yearDate) return false;
    if (monthNow < monthDate) return false;
    if (dateNow < dateDate) return false;

    return true;
}

function convertTimestampToDate(timestamp) {
    return new Date(timestamp * 1000);
}