if(${IDF_VERSION_MAJOR} GREATER_EQUAL 5)
    set(req esp_driver_gpio freertos log esp_idf_lib_helpers)
else()
    set(req driver freertos log esp_idf_lib_helpers)
endif()

idf_component_register(
    SRCS dht.c
    INCLUDE_DIRS .
    REQUIRES ${req}
)

# include common cmake file for components
set(ESP_IDF_LIB_CMAKE ${CMAKE_CURRENT_LIST_DIR}/common/cmake/esp-idf-lib.cmake)
if(EXISTS ${ESP_IDF_LIB_CMAKE})
    include(${ESP_IDF_LIB_CMAKE})
else()
    message(WARNING "${ESP_IDF_LIB_CMAKE} not found")
endif()
