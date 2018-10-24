var config = require('./config');
var Kafka = require("node-rdkafka");
var kafkaConf = config.kafkaConfig;
const topics = config.topics;
const producer = new Kafka.Producer(kafkaConf);

const genMessage = i => new Buffer(`Kafka example, message number ${i}`);

producer.on('ready', function() {
    try {
      producer.produce(
        'topic',
        null,
        new Buffer('Awesome message'),
        'Stormwind',
        Date.now(),
      );
    } catch (err) {
      console.error('A problem occurred when sending our message');
      console.error(err);
    }
    setTimeout(() => producer.disconnect(), 0);
  });
  producer.on("disconnected", function(arg) {
    process.exit();
  });
  
  producer.on('event.error', function(err) {
    console.error(err);
    process.exit(1);
  });
  producer.on('event.log', function(log) {
    console.log(log);
  });
  producer.connect();
