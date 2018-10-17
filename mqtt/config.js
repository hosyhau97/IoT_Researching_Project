const userName = "jyfsuvjb";
const password = "27XuuEgTYxKt";

module.exports.mqtt = {
    CLOUDMQTT_URL: `mqtt://${userName}:${password}@m15.cloudmqtt.com:19067`,
    TOPIC_SUBCRIBE: ["device/sensor/value", "device/control/value"],
    TOPIC_PUBLISH_ENGINE:
        { water: "control/water" , led:"control/led", fan:"control/fan"}
    }