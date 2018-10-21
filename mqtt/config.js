const userName = "jyfsuvjb";
const password = "27XuuEgTYxKt";

module.exports.mqtt = {
    CLOUDMQTT_URL: `mqtt://${userName}:${password}@m15.cloudmqtt.com:19067`,
    TOPIC_SENSOR: ["device/sensor/value"],
    TOPIC_ENGINE:
        ["control/water" ,"control/light","control/fan"]
    }