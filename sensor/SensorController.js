var mqtt = require('mqtt');
var config = require('../mqtt/config');
var Sensor = require('./Sensor');
var AppError = require('../handling_error/AppError').AppError;

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_subcribe = config.mqtt.TOPIC_SENSOR;
var client = mqtt.connect(mqtt_url);

module.exports.subscribeSensor = function (io){
    io.on('connection', function (socket) {
        console.log("socket connected");
        socket.on('publish', function(data){
            console.log(`Publishing data to ${data.topic}`);
            client.publish(data.topic, data.payload);
        });
    });
    
    client.on('connect', function (){
        console.log('MQTT sensor connected');
        client.subscribe(topic_subcribe, function (err) {
            if (err) {
                throw new AppError(`Cannot subcribe a topic ${topic_subcribe}`, 500);
            }
            console.log('subcribed');
        });
    });
    
    client.on('message', function (topic, message) {
        handleSensor(message, topic);
      });
    
    function handleSensor(message, topic){
        var object = {
            topic: topic,
            message: message.toString()
        };
        saveDataSensor(object.message);
        io.emit('sensor', object);
        console.log(`topic = ${topic}, message = ${message.toString()}`);
    }

    function saveDataSensor(object){
            Sensor.create(
                {
                    name:object.name,
                    value:{
                        analog_value:object.value.analog_value,
                        sensor_value:object.value.sensor_value,
                        pinmode_value:object.value.pinmode_value
                    },
                    sensor_type:object.sensor_type,
                    status:true,
                    process_time: new Date()
                },
                function(err, sensor){
                    if (err) {
                        throw new AppError('cannot creat data sensor documents', 500);
                    }
                }
            )
    }
}