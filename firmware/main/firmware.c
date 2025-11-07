#include <stdio.h>
#include <string.h>
#include "esp_log.h"
#include "nvs_flash.h"
#include "esp_netif.h"
#include "esp_event.h"
#include "esp_http_client.h"
#include "dht.h"

#include "protocol_examples_common.h"
#include "esp_wifi.h"

#define TAG "simple_connect_example"
#define DHT_GPIO GPIO_NUM_21
#define DHT_TYPE DHT_TYPE_DHT11

static void post_rest_function() {
    
    char* data = "{\"message\":\"Hello World\"}";

    // configure the client
    esp_http_client_config_t config = {
        .url = "http://10.0.0.164:3000/data",
        .method = HTTP_METHOD_POST,
    };

    // initialize the client
    esp_http_client_handle_t client = esp_http_client_init(&config);

    // set the http headers
    esp_http_client_set_header(client, "Content-Type", "application/json");

    // attach body
    esp_http_client_set_post_field(client, data, strlen(data));

    // perform request
    esp_err_t err = esp_http_client_perform(client);

    if (err == ESP_OK) {
        int status = esp_http_client_get_status_code(client);
        int content_length = esp_http_client_get_content_length(client);
        ESP_LOGI(TAG, "POST OK, Status %d, length = %d", status, content_length);
    } else {
        ESP_LOGE(TAG, "HTTP Post failed: %s", esp_err_to_name(err));
    }

    esp_http_client_cleanup(client);


}

void app_main(void) {

    float temperature = 0.0;
    float humidity = 0.0;

    // System Initialization
    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    // Establish Wifi connection
   // ESP_ERROR_CHECK(example_connect());

   // printf("Wifi is connected......\n");


    while (1) {

        vTaskDelay(pdMS_TO_TICKS(2000));


        if (dht_read_float_data(DHT_GPIO, DHT_TYPE, &temperature, &humidity) == ESP_OK) {
            printf("Temperature: %.1f°C, Humidity: %.1f%%\n", temperature, humidity);
        } else {
            printf("Failed to read data from DHT sensor.\n");
        }

        // need to pass in the pointer to the sensor
        // need to then convert the sensor data from a string to a float with a buffer.
        // talk to chat about malloc'ing things and where these should go.
        // Helper funciton to read the data and it passes it back then pass that formatted data in?
       // post_rest_function();

        printf("Request Sent\n");
        vTaskDelay(pdMS_TO_TICKS(5000));
	    
    }

    // Disconnect from Wi-Fi
	//ESP_ERROR_CHECK(example_disconnect());
    //printf("Disconnected\n");
}
