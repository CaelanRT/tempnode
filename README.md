# ESP32 → Node.js IoT Telemetry Prototype

## Overview
This project demonstrates a complete end-to-end IoT communication pipeline using an **ESP32** microcontroller and a **Node.js/Express** backend.  
The ESP32 connects to a Wi-Fi network, constructs and sends **HTTP POST** requests with data payloads to a local web server, which then displays that data dynamically in a browser interface.

The goal of this project is to build foundational understanding of **embedded-to-web communication**, including how microcontrollers interface with web technologies using HTTP protocols, while maintaining low-level control over firmware logic.

This serves as the base for future work integrating real environmental sensors (such as a DHT11 temperature and humidity sensor) and live web-based data visualization.

---

## Current Functionality

### Firmware (ESP32)
- Written in C using the **ESP-IDF SDK**  
- Initializes the device, sets up NVS (non-volatile storage), and connects to a local Wi-Fi network  
- Uses the `esp_http_client` library to:
  - Open an HTTP connection to a server on the local network
  - Send a POST request containing a data payload (currently hardcoded)
  - Log connection and transfer details to the serial console  
- Repeats data transmission in a timed loop  
- Uses built-in ESP-IDF logging macros for real-time debugging via serial monitor

### Server (Node.js / Express)
- A simple Express web server written in JavaScript  
- Handles both:
  - `POST /data`: Receives incoming JSON payloads from the ESP32, parses them, logs the content, and updates an in-memory variable  
  - `GET /`: Serves a simple web page displaying the latest data received from the ESP32  
- The server runs on the host machine (Windows) and is reachable by the ESP32 over the local Wi-Fi network

---

## System Architecture

```text
+--------------------+             +--------------------------+
|    ESP32 Device    |             |   Node.js / Express App  |
|--------------------|             |--------------------------|
| - Written in C     |   HTTP POST | - Runs on local network  |
| - Uses ESP-IDF SDK | ───────────▶| - Handles /data endpoint |
| - Connects to Wi-Fi|             | - Displays latest data   |
+--------------------+             +--------------------------+
          │                                   │
          │                                   ▼
          │                        +---------------------+
          │                        |  Web Browser Client |
          │                        |---------------------|
          │                        | GET / → shows data  |
          └────────────────────────▶ Displays updates    |
                                   +---------------------+
```

The ESP32 acts as the **client**, periodically sending HTTP POST requests to the Express **server**.  
The Node.js app acts as both a **data receiver** and a **web interface provider**, allowing real-time observation of the data stream from any browser on the same network.

---

## Development Environment

### Firmware
- ESP-IDF v6.1 (running in Ubuntu WSL2)  
- C language (GCC cross-compiler for Xtensa architecture)  
- `idf.py` build system for flashing and monitoring  
- Serial connection via `usbipd` passthrough from Windows to WSL  

### Backend
- Node.js v20+ (running on Windows)  
- Express framework  
- JSON middleware for POST body parsing  

### Hardware
- ESP32-WROOM-32 module  
- Connected via USB to host machine  

---

## Learning Outcomes
This project demonstrates practical skills in:

- **Embedded systems programming:** configuring ESP-IDF, understanding build pipelines, and using event-driven firmware patterns  
- **Network communication:** setting up HTTP clients and understanding TCP/IP connectivity between microcontrollers and local web servers  
- **System integration:** bridging C-based firmware with a JavaScript backend and debugging real-world communication issues  
- **Cross-environment configuration:** managing development across Windows, WSL2 (Linux), and embedded hardware simultaneously  

---

## Setup and Run

### 1. ESP32 Firmware
1. Open a WSL terminal  
2. Navigate to your firmware directory:
   ```bash
   cd ~/esp/esp-idf/projects/your_project
   ```
3. Configure the environment (if needed):
   ```bash
   . $HOME/esp/esp-idf/export.sh
   ```
4. Build and flash the firmware:
   ```bash
   idf.py -p /dev/ttyUSB0 flash monitor
   ```

Make sure your ESP32 is connected and shared with WSL using `usbipd`.

### 2. Node.js Server
1. Navigate to the server directory (in Windows PowerShell):
   ```powershell
   cd "C:\path\to\your\project\server"
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Run the server:
   ```powershell
   node server.js
   ```
4. Open a browser and visit:
   ```
   http://<your-windows-ip>:3000/
   ```
   Example:
   ```
   http://10.0.0.164:3000/
   ```

You should see live data updating as the ESP32 sends new POST requests.

---

## Next Steps

### Short-Term
- **Integrate DHT11 Sensor:**  
  Read live temperature and humidity data from the DHT11 sensor and send it to the Express backend in JSON format.

- **Add Auto-Refreshing Web Interface:**  
  Implement a simple JavaScript front-end (or use WebSockets) to auto-refresh the displayed data on the browser page in real time.

- **Improve Error Handling:**  
  Implement HTTP response verification, retry mechanisms, and reconnect logic on the ESP32 side.

### Medium-Term
- **Data Logging and Persistence:**  
  Store incoming data in a lightweight database such as SQLite or MongoDB for historical tracking and visualization.

- **Data Visualization Dashboard:**  
  Use a front-end charting library (Chart.js or D3.js) to display sensor readings over time.

- **Move to HTTPS or MQTT:**  
  Explore secure and scalable communication methods for IoT deployments.

---

## Project Goals
The broader goal is to build a foundation for an **IoT telemetry platform**, where embedded devices collect sensor data and publish it to web services for visualization, analysis, or remote monitoring.  

This prototype demonstrates proof-of-concept communication between a hardware device and a local server—showing the developer’s ability to understand and implement the entire data flow from firmware to web application.

---
