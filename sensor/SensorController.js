var mqtt = require('mqtt');
var config = require('../mqtt/config')

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_subcribe = config.mqtt.TOPIC_SUBCRIBE;
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
                console.log(err);
                throw err;
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
        io.emit('sensor', object);
        console.log(`topic = ${topic}, message = ${message.toString()}`);
    }
}