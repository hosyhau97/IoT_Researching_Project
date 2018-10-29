var mqtt = require('mqtt');
var config = require('../mqtt/config');
var EngineRepository = require('../repository/impl/EngineRepository');

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_engine = config.mqtt.TOPIC_ENGINE;
var client = mqtt.connect(mqtt_url);

var object_water = {};
var object_light = {};
var object_fan = {};
var object_roof = {};
module.exports.subscribeEngine = function (io) {

    io.on('connection', function (socket) {
        console.log("socket engine connected");
        socket.on('control/light/receive', function (data) {
            console.log(`Publishing data to control/light ${JSON.stringify(data.payload.light_object)}`);
            var buf = Buffer.from(JSON.stringify(data.payload.light_object));
            client.publish('control/light', buf);
        });

        socket.on('control/fan/receive', function (data) {
            console.log(`Publishing data to control/fan ${data.payload.fan_object}`);
            var buf = Buffer.from(JSON.stringify(data.payload.fan_object));
            client.publish('control/fan', buf);
        });

        socket.on('control/water/receive', function (data) {
            console.log(`Publishing data to control/water ${data.payload.water_object}`);
            var buf = Buffer.from(JSON.stringify(data.payload.water_object));
            client.publish('control/water', buf);
        });

        socket.on('control/roof/receive', function (data) {
            console.log(`Publishing data to control/roof ${data.payload.roof_object}`);
            var buf = Buffer.from(JSON.stringify(data.payload.roof_object));
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
            io.emit(topic, message);
            var data = JSON.parse(message);
            handleEngine(topic, data);
        } catch (err) {
            console.log('Failed to get message data from cloud.')
        }
    });

    function handleEngine(topic, message) {
        console.log(`type = ${message.time_type}`)
        switch (topic) {
            case 'control/water':
                if (message.time_type === "start_time") {
                    object_water = message;
                    object_water.status = false;
                } else if (message.time_type === "start-end") {
                    object_water.time_type = "start-end";
                    object_water.status = true;
                    object_water.end_time = message.end_time;
                }
                handleWater();
                break;
            case 'control/light':
                if (message.time_type === "start_time") {
                    object_light = message;
                    object_light.status = false;
                } else if (message.time_type === "start-end") {
                    object_light.time_type = "start-end";
                    object_light.status = true;
                    object_light.end_time = message.end_time;
                }
                handleLight();
                break;
            case 'control/fan':
                if (message.time_type === "start_time") {
                    object_fan = message;
                    object_fan.status = false;
                } else if (message.time_type === "start-end") {
                    object_fan.time_type = "start-end";
                    object_fan.status = true;
                    object_fan.end_time = message.end_time;
                }
                handleFans();
                break;
            case 'control/roof':
                if (message.time_type === "start_time") {
                    object_roof = message;
                    object_roof.status = false;
                } else if (message.time_type === "start-end") {
                    object_roof.time_type = "start-end";
                    object_roof.status = true;
                    object_roof.end_time = message.end_time;
                }
                handleRoof();
                break;
        }
    }

    function handleWater() {
        switch (object_water.time_type) {
            case 'start_time':
                io.emit('water/start_time', object_water);
                break;
            case "start-end":
                EngineRepository.saveDataWaterEngine(object_water);
                io.emit('water/end_time', object_water);
                object_water = null;
                break;
            default:
                io.emit('nothing', null);
        }
    }

    function handleLight() {
        switch (object_light.time_type) {
            case "start_time":
                io.emit('light/start_time', object_light);
                break;
            case "start-end":
                EngineRepository.saveDataLightEngine(object_light);
                io.emit('light/end_time', object_light);
                break;
            default:
                console.log(`time_type = ${object_light.time_type}`);
                io.emit('nothing', null);
        }
    }

    function handleFans() {
        switch (object_fan.time_type) {
            case 'start_time':
                io.emit('fan/start_time', object_fan);
                break;
            case "start-end":
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
                io.emit('roof/start_time', object_roof);
                break;
            case "start-end":
                EngineRepository.saveDataRoofEngine(object_roof);
                io.emit('roof/end_time', object_roof);
                object_roof = null;
                break;
            default:
                io.emit('nothing', null);
        }
    }
}