var mqtt = require('mqtt');
var config = require('../mqtt/config');
var Engine = require('./Engine');

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
                throw err;
            }
            console.log('subcribed engine.');
        });
    });

    client.on('message', function (topic, message) {
        handleEngine(message, topic);
    });

    function handleEngine(message, topic) {
        var object = {
            topic: topic,
            message: message.toString()
        };

        switch (object.topic) {
            case 'control/water':
                handleWater(object);
                break;
            case 'control/light':
                handleLight(object);
                break;
            case 'control/fan':
                handleFans(object);
                break;
        }
        saveDataEngine(object.message);
        console.log(`topic = ${topic}, message = ${message.toString()}`);
    }

    function handleWater(object) {
        switch (object.message.time_type) {
            case 'start_time':
                io.emit('water/start_time', object);
                break;
            case 'end_time':
                io.emit('water/end_time', object);
                break;
        }
    }

    function handleLight(object) {
        switch (object.message.time_type) {
            case 'start_time':
                io.emit('light/start_time', object);
                break;
            case 'end_time':
                io.emit('light/end_time', object);
                break;
        }
    }

    function handleFans(object) {
        switch (object.message.time_type) {
            case 'start_time':
                io.emit('fan/start_time', object);
                break;
            case 'end_time':
                io.emit('fan/end_time', object);
                break;
        }
    }

    function saveDataEngine(object) {
        Engine.create(
            {
                name: object.name,
                value: {
                    analog_value: object.value.analog_value,
                    sensor_value: object.value.sensor_value,
                    pinmode_value: object.value.pinmode_value
                },
                sensor_type: object.sensor_type,
                status: true,
                process_time: new Date()
            },
            function (err, sensor) {
                if (err) throw err;
            }
        )
    }
}