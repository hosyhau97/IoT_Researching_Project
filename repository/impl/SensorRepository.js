var RawAirSensor = require('../enity/raw/RawAirSensor');
var RawSoilSensor = require('../enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../enity/raw/RawHumiditySensor');
var RawLightSensor = require('../enity/raw/RawLightSensor');
var RawTempSensor = require('../enity/raw/RawTempSensor');

function saveAirSensor(object) {
    try {
        RawAirSensor.create(
            {
                value:object.value || null,
                sensor_type: object.sensor_type || null,
                status: true,
                process_time: Math.round(new Date().getTime()/1000)
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert document to Engine collection.')
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert document to Engine collection.')
    }
}

function saveSoilSensor(object) {
    try {
        RawSoilSensor.create(
            {
                value:object.value || null,
                sensor_type: object.sensor_type || null,
                status: true,
                process_time: Math.round(new Date().getTime()/1000)
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert document to Engine collection.')
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert document to Engine collection.')
    }
}

function saveTempSensor(object) {
    try {
        RawTempSensor.create(
            {
                value:object.value || null,
                sensor_type: object.sensor_type || null,
                status: true,
                process_time: Math.round(new Date().getTime()/1000)
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert document to Engine collection.')
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert document to Engine collection.')
    }
}

function saveHumiditySensor(object) {
    try {
        RawHumiditySensor.create(
            {
                value:object.value || null,
                sensor_type: object.sensor_type || null,
                status: true,
                process_time: Math.round(new Date().getTime()/1000)
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert document to Engine collection.')
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert document to Engine collection.')
    }
}

function saveLightSensor(object) {
    try {
        RawLightSensor.create(
            {
                value:object.value || null,
                sensor_type: object.sensor_type || null,
                status: true,
                process_time: Math.round(new Date().getTime()/1000)
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert document to Engine collection.')
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert document to Engine collection.')
    }
}

module.exports = {
    saveAirSensor,
    saveHumiditySensor,
    saveTempSensor,
    saveLightSensor,
    saveSoilSensor
}