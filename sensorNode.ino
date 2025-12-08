#include <WiFi.h>
#include <DHT.h>

// define pin attributes
#define DHTPIN 4
#define DHTTYPE DHT11

// Setting up variables
char ssid[] = "******";
char pass[] = "*******";


// Initialize WiFiClient and Server and DHT object
WiFiClient client;
IPAddress server(***********);
DHT dht(DHTPIN, DHTTYPE);



bool sendData(float temp, float humidity) {
  
  // body of the http request
  String body = "{\"temperature\":" + String(temp) + ", \"humidity\":" + String(humidity) + "}";

  // writing the http request to the client
  client.println("POST /data HTTP/1.1");
  client.println("Host: 10.0.0.165:3000");
  client.println("Content-Type: application/json");
  client.println("Content-Length: " + String(body.length()));
  client.println();
  client.println(body);

  Serial.println("Request sent!");
  return true;
}

void setup() {

  // setting up the serial monitor and connecting to wifi
  Serial.begin(9600);
  Serial.printf("Connecting to WiFi network: %s\n", ssid);
  dht.begin();

  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println(".");
  }

  Serial.println("Connected to Wifi!");
  Serial.println(WiFi.localIP());

  if (client.connect(server, 3000)) {
    Serial.println("Connected to Server!");
  } else {
    Serial.println("Not connected to Server!");
  }

}

void loop() {

  // main variables for the readings
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  Serial.printf("%.1f degrees C, %.1f percent humidity\n", temperature, humidity);

  //send data
  sendData(temperature, humidity);
  //print if it was successful or not

  delay(5000);

}
