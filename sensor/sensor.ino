#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Tenda_2420B0";
const char* password =  "12345678";
const char* mqttServer = "m15.cloudmqtt.com";
const int mqttPort = 19067;
const char* mqttUser = "jyfsuvjb";
const char* mqttPassword = "27XuuEgTYxKt";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {

  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
    if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {

      Serial.println("connected");

    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(500);

    }
  }
}
void callback(char* topic, byte* payload, unsigned int length) {

  Serial.print("Message arrived in topic: ");
  Serial.println(topic);

  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }

  Serial.println();
  Serial.println("-----------------------");

}
void sendJsonSensorToCloud() {
  StaticJsonBuffer<300> JSONbuffer;
  JsonObject& JSONTemp = JSONbuffer.createObject();
  JSONTemp["sensor_type"] = "temperature_sensor";
  JSONTemp["value"] = 30;

  JsonObject& JSONHumidity = JSONbuffer.createObject();
  JSONHumidity["sensor_type"] = "humidity_sensor";
  JSONHumidity["value"] = 80;

  JsonObject& JSONAir = JSONbuffer.createObject();
  JSONAir["sensor_type"] = "air_sensor";
  JSONAir["value"] = 79;

  JsonObject& JSONSoil = JSONbuffer.createObject();
  JSONSoil["sensor_type"] = "soil_sensor";
  JSONSoil["value"] = 88;

  JsonObject& JSONLight = JSONbuffer.createObject();
  JSONLight["sensor_type"] = "light_sensor";
  JSONLight["value"] = 89;

  StaticJsonBuffer<300> JSONbufferArray;
  JsonArray& values = JSONbufferArray.createArray();

  values.add(JSONTemp);
  values.add(JSONHumidity);
  values.add(JSONAir);
  values.add(JSONSoil);
  values.add(JSONLight);

  char JSONmessageBuffer[300];
  values.printTo(JSONmessageBuffer, sizeof(JSONmessageBuffer));

  Serial.println("Sending message to MQTT topic..");
  Serial.println(JSONmessageBuffer);

  if (client.publish("device/sensor", JSONmessageBuffer) == true) {
    Serial.println("Success sending message");
  } else {
    Serial.println("Error sending message");
  }
}
void loop() {

  sendJsonSensorToCloud();
  client.loop();
  Serial.println("-------------");

  delay(3000);
}
