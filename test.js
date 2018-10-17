var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var config = require('./mqtt/config');
var io = require('socket.io');

var mqtt_url = config.mqtt.CLOUDMQTT_URL;
var topic_subcribe = config.mqtt.TOPIC_SUBCRIBE;
var client  = mqtt.connect(mqtt_url);
var topic_public = config.mqtt.TOPIC_PUBLISH;


client.on('connect', function (){
    console.log('connected');
    client.subscribe(topic_subcribe, function (err) {
    if (!err) {
      client.publish('device/sensor/value', 'Hello mqtt');
    }
  });
});

client.on('message', function (topic, message) {
    if (topic === 'device/sensor/value') {
        console.log(`${message.toString()} 1`);
        handleReceiveSensorValue(router, message);
    }
  });

  router.get('/covaodaykhong', function(req, res){
      res.status(200).json({message:"message"});
  })

  module.exports ={
      client,
      router
  }