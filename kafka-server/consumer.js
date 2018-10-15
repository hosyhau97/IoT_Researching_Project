var config = require('./config');
var Kafka = require("node-rdkafka");
var kafkaConf = config.kafkaConfig;
const topics = config.topics;
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
    "auto.offset.reset": "beginning"
});

consumer.on("error", function(err) {
    console.error(err);
  });

  consumer.on("ready", function(arg){
    console.log(`Consumer ${arg.name} ready`);
    consumer.subcribe(topics);
    consumer.consume();
  });

  consumer.on("data", function(data){
    consumer.commit(data);
    console.log(data.value.toString());
  });

  consumer.on("disconnected", function(arg){
    console.log("disconnected");
    process.exit();
  });

  consumer.on('event.error', function(err) {
    console.error(err);
    process.exit(1);
  });
  consumer.on('event.log', function(log) {
    console.log(log);
  });

  consumer.connect();

  setTimeout(function(){
    consumer.disconnect();
  }, 3000000);