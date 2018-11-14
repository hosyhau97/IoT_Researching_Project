#include <ESP8266WiFi.h>
#include <PubSubClient.h>
//int D0   = 16;
int light_1   = 5; //D1
int light_2   = 4; //D2
int light_3   = 0; //D3
int light_4   = 2; //D4
int light_5   = 14; //D5
int light_6   = 12; //D6
//int D7   = 13;
//int D8   = 15;
static int check = 0;
const char* ssid = "Tenda_2420B0";
const char* password =  "12345678";
const char* mqttServer = "m15.cloudmqtt.com";
const int mqttPort = 19067;
const char* mqttUser = "jyfsuvjb";
const char* mqttPassword = "27XuuEgTYxKt";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  pinMode(light_1, OUTPUT);
  pinMode(light_2, OUTPUT);
  pinMode(light_3, OUTPUT);
  pinMode(light_4, OUTPUT);
  pinMode(light_5, OUTPUT);
  pinMode(light_6, OUTPUT);
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
  client.subscribe("control/light/status");
}

void callback(char* topic, byte* payload, unsigned int length) {

  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("length = ");
  Serial.println(length);

  Serial.print("Message:");
  String message = "";
  for (int i = 0; i < length; i++) {
    char ch = (char)payload[i];
    message += ch;
    //Serial.print((char)payload[i]);
  }
  Serial.print(message);
  compareString(message);
  Serial.println();
  Serial.println("-----------------------");

}

void turnOnLight() {
  digitalWrite(light_1, HIGH);
  digitalWrite(light_2, HIGH);
  digitalWrite(light_3, HIGH);
  digitalWrite(light_4, HIGH);
  digitalWrite(light_5, HIGH);
  digitalWrite(light_6, HIGH);
  check = 1;
}

void turnOffLight() {
  digitalWrite(light_1, LOW);
  digitalWrite(light_2, LOW);
  digitalWrite(light_3, LOW);
  digitalWrite(light_4, LOW);
  digitalWrite(light_5, LOW);
  digitalWrite(light_6, LOW);
  check = 0;
}

void compareString(String message) {

  if (message.equalsIgnoreCase("off") && check == 1) {
    turnOffLight();
  } else if (message.equalsIgnoreCase("on") && check == 0) {
    turnOnLight();
  }
}

void loop() {
  client.loop();
}



