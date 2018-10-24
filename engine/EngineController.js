var mqtt = require('mqtt');
var config = require('../mqtt/config');
var Engine = require('./Engine');
var AppError = require('../handling_error/AppError').AppError;

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_engine = config.mqtt.TOPIC_ENGINE;
var client = mqtt.connect(mqtt_url);

module.exports.subscribeEngine = function (io) {

    var object_water = {};
    var object_light = {};
    var object_fan = {};
    var object_roof = {};
    io.on('connection', function (socket) {
        console.log("socket connected");
        socket.on('control/light', function (data) {
            console.log(`Publishing data to control/light`);
            client.publish('control/light', data.payload);
        });

        socket.on('control/fan', function (data) {
            console.log(`Publishing data to control/fan`);
            client.publish('control/fan', data.payload);
        });

        socket.on('control/water', function (data) {
            console.log(`Publishing data to control/water`);
            client.publish('control/water', data.payload);
        });

        socket.on('control/roof', function (data) {
            console.log(`Publishing data to control/roof`);
            client.publish('control/roof', data.payload);
        });
    });

    client.on('connect', function () {
        console.log('MQTT engine connected');
        client.subscribe(topic_engine, function (err) {
            if (err) {
                console.log(err);
                throw new AppError('Cannot subcribe topic', 500);
            }
            console.log('subcribed engine.');
        });
    });

    client.on('message', function (topic, message) {
        try {
            handleEngine(message, topic);
        } catch (error) {
            throw new AppError('Can not read message from cloud', 500);
        }
    });

    function handleEngine(message, topic) {
        var object = {
            topic: topic,
            message: message.toString()
        };

        switch (topic) {
            case 'control/water':
                object_water = object.message;
                handleWater();
                break;
            case 'control/light':
                object_light = object.message;
                handleLight();
                break;
            case 'control/fan':
                object_fan = object.message;
                handleFans();
                break;
            case 'control/roof':
                object_roof = object.message;
                handleRoof();
                break;
        }
        console.log(`topic = ${topic}, message = ${message.toString()}`);
    }

    function handleWater() {
        switch (object_water.time_type) {
            case 'start_time':
                var start_time = new Date();
                object_water.start_time = start_time;
                io.emit('water/start_time', start_time);
                break;
            case 'end_time':
                var end_time = new Date();
                object_water.end_time = end_time;
                saveDataEngine(object_water);
                io.emit('water/end_time', end_time);
                object_water =null;
                break;
            default:
                io.emit('nothing', new Date());
        }
    }

    function handleLight() {
        switch (object_light.time_type) {
            case 'start_time':
                var start_time = new Date();
                object_light.start_time = start_time;
                io.emit('light/start_time', object_light);
                break;
            case 'end_time':
                var end_time = new Date();
                object_light.end_time = end_time;
                saveDataEngine(object_light);
                io.emit('light/end_time', object_light);
                break;
            default:
                io.emit('nothing', null);
        }
    }

    function handleFans() {
        switch (object_fan.time_type) {
            case 'start_time':
                var start_time = new Date();
                object_fan.start_time = start_time;
                io.emit('fan/start_time', object_fan);
                break;
            case 'end_time':
                var end_time = new Date();
                object_fan.end_time = end_time;
                saveDataEngine(object_fan);
                io.emit('fan/end_time', object_fan);
                object_fan = null;
                break;
            default:
                io.emit('nothing', null);
        }
    }

    function handleRoof() {
        switch (object_roof.time_type) {
            case 'start_time':
                var start_time = new Date();
                object_roof.start_time = start_time;
                io.emit('roof/start_time', start_time);
                break;
            case 'end_time':
                var end_time = new Date();
                object_roof.end_time = end_time;
                saveDataEngine(object_fan);
                io.emit('roof/end_time', end_time);
                object_roof = null;
                break;
            default:
                io.emit('nothing', null);
        }
    }

    function saveDataEngine(object) {
        Engine.create(
            {
                name: object.name,
                value: {
                    analog_value: object.value.analog_value,
                    engine_value: object.value.sensor_value,
                    pinmode_value: object.value.pinmode_value
                },
                engine_type: object.engine_type,
                status: object.status,
                start_time: object.start_time,
                end_time: object.end_time,
                time_type: object.time_type,
                process_time: new Date()
            },
            function (err, sensor) {
                if (err) {
                    throw new AppError('Cannot create engine documents', 400);
                }
            }
        )
    }
}