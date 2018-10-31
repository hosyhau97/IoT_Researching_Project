var FlatternFanEngine = require('../enity/flatterner/engine/FlatternFanEngine');
var FlatternWaterEngine = require('../enity/flatterner/engine/FlatternWaterEngine');
var FlatternRoofEngine = require('../enity/flatterner/engine/FlatternRoofEngine');
var FlatternLightEngine = require('../enity/flatterner/engine/FlatternLightEngine');

function saveDataFanEngine (object) {
    try {
        FlatternFanEngine.create(
            {
                engine_type: object.engine_type || null,
                status: object.status || null,
                start_time: object.start_time || null,
                end_time: object.end_time || null,
                duration:object.duration || null,
                time_type: object.time_type || null,
                process_time: object.process_time
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert fan to mongoDB');
                } else {
                    console.log('insert fan success!!!');
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
                engine_type: object.engine_type || null,
                status: object.status || null,
                start_time: object.start_time || null,
                end_time: object.end_time || null,
                duration:object.duration || null,
                time_type: object.time_type || null,
                process_time: object.process_time || null
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert water engine to mongoDB');
                } else {
                    console.log('insert water success!!!');
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
                engine_type: object.engine_type || null,
                status: object.status || null,
                start_time: object.start_time || null,
                end_time: object.end_time || null,
                duration:object.duration || null,
                time_type: object.time_type || null,
                process_time: object.process_time
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert roof to mongoDB');
                } else {
                    console.log('insert roof success!!!');
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
                engine_type: object.engine_type,
                status: object.status,
                start_time: object.start_time,
                end_time: object.end_time,
                duration:object.duration || null,
                time_type: object.time_type,
                process_time: object.process_time
            },
            function (err, sensor) {
                if (err) {
                    console.log('Failed to insert light to mongoDB');
                } else {
                    console.log('insert light success!!!');
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