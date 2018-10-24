var mqtt = require('mqtt');
var config = require('../mqtt/config');
var Engine = require('./Engine');
var AppError = require('../handling_error/AppError').AppError;

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_engine = config.mqtt.TOPIC_ENGINE;
var client = mqtt.connect(mqtt_url);

module.exports.subscribeEngine = function (io) {

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
           throw new  AppError('Can not read message from cloud', 500);
       } 
    });

    function handleEngine(message, topic) {
        var object = {
            topic: topic,
            message: message.toString()
        };

        switch (object.topic) {
            case 'control/water':
                handleWater(object.message);
                break;
            case 'control/light':
                handleLight(object.message);
                break;
            case 'control/fan':
                handleFans(object.message);
                break;
        }
        console.log(`topic = ${topic}, message = ${message.toString()}`);
    }

    function handleWater(object) {
        switch (object.time_type) {
            case 'start_time':
                var start_time = new Date();
                object.start_time = start_time;
                io.emit('water/start_time', start_time);
                break;
            case 'end_time':
                var end_time = new Date();
                object.end_time = end_time;
                saveDataEngine(object);
                io.emit('water/end_time', end_time);
                break;
            default:
                io.emit('nothing', new Date());
        }
    }

    function handleLight(object) {
        switch (object.time_type) {
            case 'start_time':
                var start_time = new Date();
                object.start_time = start_time;
                io.emit('light/start_time', object);
                break;
            case 'end_time':
                var end_time = new Date();
                object.end_time = end_time;
                saveDataEngine(object);
                io.emit('light/end_time', object);
                break;
            default:
                io.emit('nothing', object);
        }
    }

    function handleFans(object) {
        switch (object.time_type) {
            case 'start_time':
                var start_time = new Date();
                object.start_time = start_time;
                io.emit('fan/start_time', object);
                break;
            case 'end_time':
                var end_time = new Date();
                object.end_time = end_time;
                saveDataEngine(object);
                io.emit('fan/end_time', object);
                break;
            default:
                io.emit('nothing', object);
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
                engine_type: object.sensor_type,
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