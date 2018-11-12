var RawAirSensor = require('../repository/enity/raw/RawAirSensor');
var RawSoilSensor = require('../repository/enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../repository/enity/raw/RawHumiditySensor');
var RawLightSensor = require('../repository/enity/raw/RawLightSensor');
var RawTempSensor = require('../repository/enity/raw/RawTempSensor');
var TimeUtils = require('../util/TimeUtil');
var size = 4;
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

        socket.on('light-data-by-day', function (data) {
            var lights = getLightDataByDay(size, data, io);
        });

        socket.on('temperature-data-by-day', function (data) {
            var temperatures = getTemperatureDataByDay(size, data, io);
        });

        socket.on('humidity-data-by-day', function (data) {
            var humidities = getHumidityDataByDay(size, data, io);
        });

        socket.on('soil-data-by-day', function (data) {
            var soils = getSoilDataByDay(size, data, io);
        });

        socket.on('air-data-by-day', function (data) {
            var airs = getAirDataByDay(size, data, io);
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
        return item.value;
    }).filter(item => item > 40)
        .reduce(function (pre, next) {
            return pre.concat(next);
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

function generateDataBySize(size, data, result) {
    var values = [];
    var process_times = [];
    var i = 0, j = 0, val = 0, arr_size = data.length, over_all_value = 0, overall_process_time = [], count = 0;
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
                overall_process_time.push(data[i - 1].process_time);
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
    result.push(values);
    result.push(process_times);
    return result;
}

async function getLightValueByDay(start, end, size) {
    var lights = await getLightValue(start, end);
    var result = [];
    var light = generateDataBySize(size, lights, result);
    return light;
}

async function getTemperatureValueByDay(start, end, size) {
    var temperatures = await getTemperatureValue(start, end);
    var result = [];
    var temperature = generateDataBySize(size, temperatures, result);
    return temperature;
}

async function getHumidityValueByDay(start, end, size) {
    var humidities = await getHumidityValue(start, end);
    var result = [];
    var humidity = generateDataBySize(size, humidities, result);
    return humidity;
}

async function getSoilValueByDay(start, end, size) {
    var soils = await getSoilValue(start, end);
    var result = [];
    var soil = generateDataBySize(size, soils, result);
    return soil;
}

async function getAirValueByDay(start, end, size) {
    var airs = await getLightValue(start, end);
    var result = [];
    var air = generateDataBySize(size, airs, result);
    return air;
}

function getLightDataByDay(size, data, io) {
    var date = new Date();
    var end = Math.round(date.getTime() / 1000);
    if (data.time && checkTime(data.time)) {
        var start = data.time;
        var lights = getLightValueByDay(start, end, size);
        if (lights.length > 0)
            io.emit('data-chart-light', lights);
        else io.emit('data-chart-light', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var lights = getLightValueByDay(start, end, size);
        console.log(lights);
        io.emit('data-chart-light', lights);
    }
}

function getTemperatureDataByDay(size, data, io) {
    var date = new Date();
    var end = Math.round(date.getTime() / 1000);
    if (data.time && checkTime(data.time)) {
        var start = data.time;
        var temps = getTemperatureValueByDay(start, end, size);
        if (temps.length > 0)
            io.emit('data-chart-temperature', temps);
        else io.emit('data-chart-temperature', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var temps = getTemperatureValueByDay(start, end, size);
        console.log(temps);
        io.emit('data-chart-temperature', temps);
    }
}

function getHumidityDataByDay(size, data, io) {
    var date = new Date();
    var end = Math.round(date.getTime() / 1000);
    if (data.time && checkTime(data.time)) {
        var start = data.time;
        var humidity = getHumidityValueByDay(start, end, size);
        if (humidity.length > 0)
            io.emit('data-chart-humidity', humidity);
        else io.emit('data-chart-humidity', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var humidity = getHumidityValueByDay(start, end, size);
        console.log(humidity);
        io.emit('data-chart-humidity', humidity);
    }
}

function getAirDataByDay(size, data, io) {
    var date = new Date();
    var end = Math.round(date.getTime() / 1000);
    if (data.time && checkTime(data.time)) {
        var start = data.time;
        var air = getAirValueByDay(start, end, size);
        if (air.length > 0)
            io.emit('data-chart-air', lights);
        else io.emit('data-chart-air', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var air = getLightValueByDay(start, end, size);
        console.log(air);
        io.emit('data-chart-air', air);
    }
}

function getSoilDataByDay(size, data, io) {
    var date = new Date();
    var end = Math.round(date.getTime() / 1000);
    if (data.time && checkTime(data.time)) {
        var start = data.time;
        var soils = getSoilValueByDay(start, end, size);
        if (soils.length > 0)
            io.emit('data-chart-light', soils);
        else io.emit('data-chart-light', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var soils = getSoilValueByDay(start, end, size);
        console.log(soils);
        io.emit('data-chart-light', soils);
    }
}