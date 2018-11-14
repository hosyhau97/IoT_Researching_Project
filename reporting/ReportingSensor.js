var RawAirSensor = require('../repository/enity/raw/RawAirSensor');
var RawSoilSensor = require('../repository/enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../repository/enity/raw/RawHumiditySensor');
var RawLightSensor = require('../repository/enity/raw/RawLightSensor');
var RawTempSensor = require('../repository/enity/raw/RawTempSensor');
var TimeUtils = require('../util/TimeUtil');
var SensorData = require('./SensorData');
var size = 4;
var sizeDaySensor = 2;
module.exports.dataSensorChartByDay =async function (io) {
    io.on('connection', function (socket) {
        console.log('reporting connected');

        socket.on('light-data-by-day', async function (data) {
            var lights = await getLightDataByDay(sizeDaySensor, data, io);
        });

        socket.on('temperature-data-by-day', async function (data) {
            var temperatures = await getTemperatureDataByDay(sizeDaySensor, data, io);
        });

        socket.on('humidity-data-by-day', async function (data) {
            var humidities = await getHumidityDataByDay(sizeDaySensor, data, io);
        });

        socket.on('soil-data-by-day', async function (data) {
            var soils = await getSoilDataByDay(sizeDaySensor, data, io);
        });

        socket.on('air-data-by-day', async function (data) {
            var airs = await getAirDataByDay(sizeDaySensor, data, io);
        });

    });


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
                    val = val + data[j].value;
                    i = i + 1;
                }
                over_all_value = (val / size);
                values.push(over_all_value);
                overall_process_time.push(data[j].process_time);
                process_times.push(overall_process_time);
                val = 0; over_all_value = 0;
                overall_process_time = [];
            }
        }
    }
    result.push(values);
    result.push(process_times);
    return result;
}

async function getLightValueByDay(start, end, size) {
    var lights = await SensorData.getLightAllValue(start, end);
    var result = [];
    var light = generateDataBySize(size, lights, result);
    var data = {};
    data.value = light[0];
    data.process_time = light[1];
    return data;
}

async function getTemperatureValueByDay(start, end, size) {
    var temperatures = await SensorData.getTemperatureAllValue(start, end);
    console.log(`temp = ${temperatures}`);
    var result = [];
    var temperature = generateDataBySize(size, temperatures, result);
    var data = {};
    data.value = temperature[0];
    data.process_time = temperature[1];
    return data;
}

async function getHumidityValueByDay(start, end, size) {
    var humidities = await SensorData.getHumidityAllValue(start, end);
    console.log(`humidities = ${humidities}`);
    var result = [];
    var humidity = generateDataBySize(size, humidities, result);
    var data = {};
    data.value = humidity[0];
    data.process_time = humidity[1];
    return data;
}

async function getSoilValueByDay(start, end, size) {
    var soils = await SensorData.getSoilAllValue(start, end);
    console.log(`soil = ${soils}`)
    var result = [];
    var soil = generateDataBySize(size, soils, result);
    var data = {};
    data.value = soil[0];
    data.process_time = soil[1];
    return data;
}

async function getAirValueByDay(start, end, size) {
    var airs = await SensorData.getAirAllValue(start, end);
    console.log(`air = ${airs}`);
    var result = [];
    var air = generateDataBySize(size, airs, result);
    var data = {};
    data.value = air[0];
    data.process_time = air[1];
    return data;
}

async function getLightDataByDay(size, data, io) {
    var date = new Date();
    var end = Math.round(date.getTime() / 1000);
    if (data.time && checkTime(data.time)) {
        var start = data.time;
        var lights = await getLightValueByDay(start, end, size);
        if (lights)
            io.emit('data-chart-light', lights);
        else io.emit('data-chart-light', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var lights = await getLightValueByDay(start, end, size);
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
        if (temps)
            io.emit('data-chart-temperature', temps);
        else io.emit('data-chart-temperature', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var temps = getTemperatureValueByDay(start, end, size);
        io.emit('data-chart-temperature', temps);
    }
}

function getHumidityDataByDay(size, data, io) {
    var date = new Date();
    var end = Math.round(date.getTime() / 1000);
    if (data.time && checkTime(data.time)) {
        var start = data.time;
        var humidity = getHumidityValueByDay(start, end, size);
        if (humidity)
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
        if (air)
            io.emit('data-chart-air', air);
        else io.emit('data-chart-air', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var air = getAirValueByDay(start, end, size);
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
        if (soils)
            io.emit('data-chart-light', soils);
        else io.emit('data-chart-light', []);
    } else {
        var start = Math.round(end - (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()));
        var soils = getSoilValueByDay(start, end, size);
        console.log(soils);
        io.emit('data-chart-light', soils);
    }
}