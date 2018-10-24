var config={
    CLOUDKARAFKA_USERNAME:"i70b2bke",
    CLOUDKARAFKA_PASSWORD:"pbNVmkZSO64NbDoUneuwtebGA_kJERq3",
    CLOUDKARAFKA_BROKERS:["ark-01.srvs.cloudkafka.com:9094", "ark-02.srvs.cloudkafka.com:9094", "ark-03.srvs.cloudkafka.com:9094"]
};

module.exports.kafkaConfig = {
    "group.id": "cloudkarafka-example",
    "metadata.broker.list": config.CLOUDKARAFKA_BROKERS,
    "socket.keepalive.enable": true,
    "security.protocol": "SASL_SSL",
    "sasl.mechanisms": "SCRAM-SHA-256",
    "sasl.username":   config.CLOUDKARAFKA_USERNAME,
     "sasl.password": config.CLOUDKARAFKA_PASSWORD,
    "debug": "generic,broker,security"
}
module.exports.topics = {
    topics:["node/sensors", "node/engines"]
}