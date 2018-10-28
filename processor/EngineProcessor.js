var mqtt = require('mqtt');
var config = require('../mqtt/config');
var EngineRepository = require('../repository/impl/EngineRepository');

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_engine = config.mqtt.TOPIC_ENGINE;
var client = mqtt.connect(mqtt_url);

module.exports.subscribeEngine = function (io) {

    var object_water = {};
    var object_light = {};
    var object_fan = {};
    var object_roof = {};
    io.on('connection', function (socket) {
        console.log("socket engine connected");
        socket.on('control/light/receive', function (data) {
            console.log(`Publishing data to control/light ${data.payload.message}`);
            var buf = Buffer.from(JSON.stringify(data.payload));
            client.publish('control/light', buf);
        });

        socket.on('control/fan/receive', function (data) {
            console.log(`Publishing data to control/fan ${data.payload.message}`);
            var buf = Buffer.from(JSON.stringify(data.payload));
            client.publish('control/fan', buf);
        });

        socket.on('control/water/receive', function (data) {
            console.log(`Publishing data to control/water ${data.payload.message}`);
            var buf = Buffer.from(JSON.stringify(data.payload));
            client.publish('control/water', buf);
        });

        socket.on('control/roof/receive', function (data) {
            console.log(`Publishing data to control/roof ${data.payload.message}`);
            var buf = Buffer.from(JSON.stringify(data.payload));
            client.publish('control/roof', buf);
        });
    });

    client.on('connect', function () {
        console.log('MQTT engine connected');
        client.subscribe(topic_engine, function (err) {
            if (err) {
                console.log('Failed to subcribe topic.');
            }
            console.log('subcribed engine.');
        });
    });

    client.on('message', function (topic, message) {
        try {
            var json = JSON.parse(message.toString());
            io.emit(topic, json);
            handleEngine();
        } catch (err) {
            console.log('Failed to parse data engine to json.')
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
                EngineRepository.saveDataWaterEngine(object_water);
                io.emit('water/end_time', end_time);
                object_water = null;
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
                EngineRepository.saveDataLightEngine(object_light);
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
                EngineRepository.saveDataFanEngine(object_fan);
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
                EngineRepository.saveDataRoofEngine(object_roof);
                io.emit('roof/end_time', end_time);
                object_roof = null;
                break;
            default:
                io.emit('nothing', null);
        }
    }
}