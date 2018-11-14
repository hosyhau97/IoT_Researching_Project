var RawAirSensor = require('../repository/enity/raw/RawAirSensor');
var RawSoilSensor = require('../repository/enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../repository/enity/raw/RawHumiditySensor');
var RawLightSensor = require('../repository/enity/raw/RawLightSensor');
var RawTempSensor = require('../repository/enity/raw/RawTempSensor');

function getAirAllValue(start, end) {
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

function getAirMinValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawAirSensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.min(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getAirMaxValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawAirSensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.max(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getSoilAllValue(start, end) {
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

function getSoilMinValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawSoilSensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.min(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getSoilMaxValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawSoilSensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.max(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getLightAllValue(start, end) {
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

function getLightMinValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawLightSensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.min(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getLightMaxValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawLightSensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.max(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getHumidityAllValue(start, end) {
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

function getHumidityMinValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawHumiditySensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.min(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getHumidityMaxValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawHumiditySensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.max(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getTemperatureAllValue(start, end) {
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

function getTemperatureMinValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawTempSensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.min(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}

function getTemperatureMaxValue(start, end) {
    return new Promise(function (resolve, reject) {
        var query = RawTempSensor.group({
            "initial": {},
            "reduce": function(obj, prev) {
                prev.value = isNaN(prev.value) ? obj.value : Math.max(prev.value, obj.value);
            },
            "cond": {
                "process_time": {
                    "$gt": start,
                    "$lt": end
                }
            }
        });
        query.exec(function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    })
}
module.exports = {
    getAirAllValue,
    getAirMinValue,
    getAirMaxValue,
    getSoilAllValue,
    getSoilMaxValue,
    getSoilMinValue,
    getLightAllValue,
    getLightMaxValue,
    getLightMinValue,
    getHumidityAllValue,
    getHumidityMaxValue,
    getHumidityMinValue,
    getTemperatureAllValue,
    getTemperatureMaxValue,
    getTemperatureMinValue
}