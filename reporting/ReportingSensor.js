var RawAirSensor = require('../repository/enity/raw/RawAirSensor');
var RawSoilSensor = require('../repository/enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../repository/enity/raw/RawHumiditySensor');
var RawLightSensor = require('../repository/enity/raw/RawLightSensor');
var RawTempSensor = require('../repository/enity/raw/RawTempSensor');
var TimeUtils = require('../util/TimeUtil');

module.exports.dataSensorChartByDay = function (io) {
    io.on('connection', function (socket) {
        console.log('reporting connected');
        socket.on('chart-light', async function (data) {
            var date = new Date();
            var end = Math.round(date.getTime() / 1000);
            if (data.time && checkTime(data.time)) {
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

        socket.on('test-sac', async function (data) {
            console.log('tested');
            testData();
        });
    });

    
}

function getAirValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawAirSensor.find({ process_time: { $gt: start, $lt: end } }, { value: 1, process_time: 1 });
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
        var query = RawSoilSensor.find({ process_time: { $gt: start, $lt: end } }, { value: 1, process_time: 1 });
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
        var query = RawLightSensor.find({ process_time: { $gt: start, $lt: end } }, { value: 1, process_time: 1 });
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
        var query = RawHumiditySensor.find({ process_time: { $gt: start, $lt: end } }, { value: 1, process_time: 1 });
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
        var query = RawTempSensor.find({ process_time: { $gt: start, $lt: end } }, { value: 1, process_time: 1 });
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

    var light = lights.map(item => {

    });
    var result = [{ light: lights }, { temperature: temps }, {}, {}, {}, {}]
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

function generateDataBySize(size, data) {
    var values = [];
    var process_times = [];
    var i = 0, j = 0, val = 0, arr_size = data.length, over_all_value =0, overall_process_time = [], count = 0;
    console.log(`size = ${arr_size}`);
    if (arr_size > 0) {
        for (i = 0; i < arr_size;) {
            count += size;
            if (count >= arr_size) {
                overall_process_time.push(data[i].process_time);
                for (j = i; j < arr_size; j++) {
                    val += data[j].value;
                    i = i + 1;
                }
                over_all_value = (val / size);
                values.push(over_all_value);
                overall_process_time.push(data[i-1].process_time);
                process_times.push(overall_process_time);
                break;
            } else {
                overall_process_time.push(data[i].process_time);
                for (j = i; j < count; j++) {
                    val = val + data[j];
                    i = i + 1;
                }
                over_all_value = (val / size);
                values.push(over_all_value);
                overall_process_time.push(data[j].process_time);
                val = 0; over_all_value = 0;
            }
        }
    }
    var light = [];
    light.push(values);
    light.push(process_times);
    return light;
}

async function testData(){
    var lights = await getLightValue(0, 1541948903);
    console.log(lights);
    var light = generateDataBySize(4, lights);
    console.log(`lights = ${light}`);
}
    
/*
var x = [1, 2, 3, 4, 4, 4, 4, 4];
var count = 0;
var process_time = 0;
var val = 0;
var size = 5;

function generateDataBySize(size, data) {
    var result = [];
    var i = 0, j = 0, val = 0, arr_size = data.length, over_all = 0;
    var count = 0;
    if (arr_size > 0) {
        for (i = 0; i < arr_size;) {
            count += size;
            if (count >= arr_size) {
                for (j = i; j < arr_size; j++) {
                    val += data[j];
                    i = i + 1;
                }
                over_all = (val / size);
                result.push(over_all);
                break;
            } else {
                for (j = i; j < count; j++) {
                    val = val + data[j];
                    i = i + 1;
                }
                over_all = (val / size);
                result.push(over_all);
                val = 0; over_all = 0;
            }
        }
    }
    return result;
}

console.log(generateDataBySize(size, x));
*/