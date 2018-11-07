var RawAirSensor = require('../enity/raw/RawAirSensor');
var RawSoilSensor = require('../enity/raw/RawSoilSensor');
var RawHumiditySensor = require('../enity/raw/RawHumiditySensor');
var RawLightSensor = require('../enity/raw/RawLightSensor');
var RawTempSensor = require('../enity/raw/RawTempSensor');

function saveAirSensor(object) {
    try {
        RawAirSensor.create(
            {
                value: {
                    analog_value: object.value.analog_value || null,
                    sensor_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                sensor_type: object.sensor_type || null,
                status: object.status,
                process_time: new Date()
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
                value: {
                    analog_value: object.value.analog_value || null,
                    sensor_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                sensor_type: object.sensor_type || null,
                status: object.status,
                process_time: new Date()
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
                value: {
                    analog_value: object.value.analog_value || null,
                    sensor_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                sensor_type: object.sensor_type || null,
                status: object.status,
                process_time: new Date()
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
                value: {
                    analog_value: object.value.analog_value || null,
                    sensor_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                sensor_type: object.sensor_type || null,
                status: object.status,
                process_time: new Date()
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
                value: {
                    analog_value: object.value.analog_value || null,
                    sensor_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                sensor_type: object.sensor_type || null,
                status: object.status,
                process_time: new Date()
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