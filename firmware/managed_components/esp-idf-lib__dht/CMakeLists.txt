cmake_minimum_required(VERSION 3.16)

if(${IDF_VERSION_MAJOR} GREATER_EQUAL 5)
    idf_component_register(
        SRCS "dht.c"
        INCLUDE_DIRS "."
        REQUIRES esp_driver_gpio freertos log
    )
else()
    idf_component_register(
        SRCS "dht.c"
        INCLUDE_DIRS "."
        REQUIRES driver freertos log
    )
endif()
