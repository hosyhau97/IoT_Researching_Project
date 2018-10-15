const userName = "jyfsuvjb";
const password = "27XuuEgTYxKt";

module.exports.mqtt= {
    CLOUDMQTT_URL: `mqtt://${userName}:${password}@m15.cloudmqtt.com:19067`,
    TOPIC_SUBCRIBE:"device/sensor/value",
    TOPIC_PUBLISH:" node/control/engine"
}