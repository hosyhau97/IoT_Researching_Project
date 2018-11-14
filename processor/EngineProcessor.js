var mqtt = require('mqtt');
var config = require('../mqtt/config');
var EngineRepository = require('../repository/impl/EngineRepository');
var TimeUtil = require('../util/TimeUtil');
var storage = require('node-persist');

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_engine = config.mqtt.TOPIC_ENGINE;
var client = mqtt.connect(mqtt_url);

var object_water = {};
var object_light = {};
var object_fan = {};
var object_roof = {};
module.exports.subscribeEngine = function (io) {

    io.on('connection',async function (socket) {

        await storage.init({
            stringify :JSON.stringify,
            parse : JSON.parse,
            encoding : 'utf8',
            ttl :false
        });

        console.log("socket engine connected");
        socket.on('control/light/receive', function (data) {
            try {
                var buf = Buffer.from(JSON.stringify(data.payload.light_object));
                var status = Buffer.from(data.payload.message);
                client.publish('control/light', buf);
                client.publish('control/light/status', status);
            } catch (error) {
                console.log('socket light convert error');
            }
        });

        socket.on('control/fan/receive', function (data) {
            try{
                var buf = Buffer.from(JSON.stringify(data.payload.fan_object));
                var status = Buffer.from(data.payload.message);
                client.publish('control/fan', buf);
                client.publish('control/fan/status', status);
            }catch(error){
                console.log('socket fan convert error');
            }
        });

        socket.on('control/water/receive', function (data) {
            try {
                var buf = Buffer.from(JSON.stringify(data.payload.water_object));
                var status = Buffer.from(data.payload.message);
                client.publish('control/water', buf);
                client.publish('control/water/status', status);
            }catch(error){
                console.log('socket water convert error');
            }
        });

        socket.on('control/roof/receive', function (data) {
            try {
                var buf = Buffer.from(JSON.stringify(data.payload.roof_object));
                var status = Buffer.from(data.payload.message);
                client.publish('control/roof', buf);
                client.publish('control/roof/status', status);
            }catch(error){
                console.log('socket roof convert error');
            }
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
                    await storage.setItem('control/water', 'on');
                } else if (message.time_type === "start-end") {
                    object_water.time_type = "start-end";
                    object_water.status = true;
                    object_water.duration = TimeUtil.miniusTime(object_water.start_time, message.end_time);
                    object_water.end_time = message.end_time;
                    object_water.process_time = TimeUtil.convertDateToTimestamp();
                    await storage.setItem('control/water', 'off');
                }
                handleWater();
                break;
            case 'control/light':
                if (message.time_type === "start_time") {
                    object_light = message;
                    object_light.status = false;
                    await storage.setItem('control/light', 'on');
                } else if (message.time_type === "start-end") {
                    object_light.time_type = "start-end";
                    object_light.status = true;
                    object_light.end_time = message.end_time;
                    object_light.duration = TimeUtil.miniusTime(object_light.start_time, object_light.end_time);
                    object_light.process_time = TimeUtil.convertDateToTimestamp();
                    await storage.setItem('control/light', 'off');
                }
                handleLight();
                break;
            case 'control/fan':
                if (message.time_type === "start_time") {
                    object_fan = message;
                    object_fan.status = false;
                    await storage.setItem('control/fan', 'on');
                } else if (message.time_type === "start-end") {
                    object_fan.time_type = "start-end";
                    object_fan.status = true;
                    object_fan.end_time = message.end_time;
                    object_fan.duration = TimeUtil.miniusTime(object_fan.start_time, message.end_time);
                    object_fan.process_time = TimeUtil.convertDateToTimestamp();
                    await storage.setItem('control/fan', 'off');
                }
                handleFans();
                break;
            case 'control/roof':
                if (message.time_type === "start_time") {
                    object_roof = message;
                    object_roof.status = false;
                    await storage.setItem('control/roof', 'on');
                } else if (message.time_type === "start-end") {
                    object_roof.time_type = "start-end";
                    object_roof.status = true;
                    object_roof.end_time = message.end_time;
                    object_roof.duration = TimeUtil.miniusTime(object_roof.start_time, message.end_time);
                    object_roof.process_time = TimeUtil.convertDateToTimestamp();
                    await storage.setItem('control/roof', 'off');
                }
                handleRoof();
                break;
        }
    }

    function handleWater() {
        switch (object_water.time_type) {
            case 'start_time':
                io.emit('control/water', "on");
                break;
            case "start-end":
                EngineRepository.saveDataWaterEngine(object_water);
                io.emit('control/water', "off");
                object_water = null;
                break;
            default:
                io.emit('nothing', null);
        }
    }

    function handleLight() {
        switch (object_light.time_type) {
            case "start_time":
                io.emit('control/light', "on");
                break;
            case "start-end":
                EngineRepository.saveDataLightEngine(object_light);
                io.emit('control/light', "off");
                break;
            default:
                console.log(`time_type = ${object_light.time_type}`);
                io.emit('nothing', null);
        }
    }

    function handleFans() {
        switch (object_fan.time_type) {
            case 'start_time':
                io.emit('control/fan', "on");
                break;
            case "start-end":
                EngineRepository.saveDataFanEngine(object_fan);
                io.emit('control/fan', "off");
                object_fan = null;
                break;
            default:
                io.emit('nothing', null);
        }
    }

    function handleRoof() {
        switch (object_roof.time_type) {
            case 'start_time':
                io.emit('control/roof', "on");
                break;
            case "start-end":
                EngineRepository.saveDataRoofEngine(object_roof);
                io.emit('control/roof', "off");
                object_roof = null;
                break;
            default:
                io.emit('nothing', null);
        }
    }
}