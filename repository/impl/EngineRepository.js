var FlatternFanEngine = require('../enity/flatterner/engine/FlatternFanEngine');
var FlatternWaterEngine = require('../enity/flatterner/engine/FlatternWaterEngine');
var FlatternRoofEngine = require('../enity/flatterner/engine/FlatternRoofEngine');
var FlatternLightEngine = require('../enity/flatterner/engine/FlatternLightEngine');

function saveDataFanEngine (object) {
    try {
        FlatternFanEngine.create(
            {
                value: {
                    analog_value: object.value.analog_value || null,
                    engine_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                engine_type: object.engine_type || null,
                status: object.status || null,
                start_time: object.start_time || null,
                end_time: object.end_time || null,
                time_type: object.time_type || null,
                process_time: new Date()
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert fan to mongoDB');
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert fan to mongoDB');
    }
}

function saveDataWaterEngine (object) {
    try {
        FlatternWaterEngine.create(
            {
                value: {
                    analog_value: object.value.analog_value || null,
                    engine_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                engine_type: object.engine_type || null,
                status: object.status || null,
                start_time: object.start_time || null,
                end_time: object.end_time || null,
                time_type: object.time_type || null,
                process_time: new Date()
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert water engine to mongoDB');
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert water engine to mongoDB');
    }
}

function saveDataRoofEngine (object) {
    try {
        FlatternRoofEngine.create(
            {
                value: {
                    analog_value: object.value.analog_value || null,
                    engine_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                engine_type: object.engine_type || null,
                status: object.status || null,
                start_time: object.start_time || null,
                end_time: object.end_time || null,
                time_type: object.time_type || null,
                process_time: new Date()
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert roof to mongoDB');
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert roof to mongoDB');
    }
}

function saveDataLightEngine (object) {
    try {
        FlatternLightEngine.create(
            {
                value: {
                    analog_value: object.value.analog_value || null,
                    engine_value: object.value.sensor_value || null,
                    pinmode_value: object.value.pinmode_value || null
                },
                engine_type: object.engine_type || null,
                status: object.status || null,
                start_time: object.start_time || null,
                end_time: object.end_time || null,
                time_type: object.time_type || null,
                process_time: new Date()
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert light to mongoDB');
                }
            }
        )
    } catch (error) {
        console.log('Failed to insert light to mongoDB');
    }
}

module.exports ={
    saveDataFanEngine,
    saveDataLightEngine,
    saveDataRoofEngine,
    saveDataWaterEngine
}