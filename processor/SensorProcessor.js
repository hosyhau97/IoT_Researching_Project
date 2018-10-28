var mqtt = require('mqtt');
var config = require('../mqtt/config');
var SensorRepository = require('../repository/impl/SensorRepository');
var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_subcribe = config.mqtt.TOPIC_SENSOR;
var client = mqtt.connect(mqtt_url);

module.exports.subscribeSensor = function (io) {
    io.on('connection', function (socket) {
        console.log("socket connected");
        socket.on('publish', function (data) {
            console.log(`Publishing data to ${data.topic}`);
            client.publish(data.topic, data.payload);
        });
    });

    client.on('connect', function () {
        console.log('MQTT sensor connected');
        client.subscribe(topic_subcribe, function (err) {
            if (err) {
                console.log(`Không thể subcribe ${topic_subcribe}`);
            }
            console.log('subcribed');
        });
    });

    client.on('message', function (topic, message) {
        handleSensor(message, topic);
    });

    function handleSensor(message, topic) {
        var object = {
            topic: topic,
            message: message.toString()
        };
        var listMessages = message;
        listMessages.array.forEach(element => {

            switch (element.sensor_type) {
                case "air_sensor":
                    SensorRepository.saveAirSensor(element);
                    break;
                case "light_sensor":
                    SensorRepository.saveLightSensor(element);
                    break;
                case "temperature_sensor":
                    SensorRepository.saveTempSensor(element);
                    break;
                case "humidity_sensor":
                    SensorRepository.saveHumiditySensor(element);
                    break;
                case "soil_sensor":
                    SensorRepository.saveSoilSensor(element);
                    break;
            }
        });
        saveDataSensor(object.message);
        io.emit('sensor', object);
        console.log(`topic = ${topic}, message = ${message.toString()}`);
    }
}