# Temperature and Humidity Monitor

A small end-to-end system that collects real temperature and humidity data from an ESP32 sensor node, persists it in a Node.js backend, and displays the latest reading in a lightweight React UI.

This project was built to exercise the full path from embedded firmware to deployed web application, with an emphasis on understanding how data moves across machines, how services communicate over a network, and how a simple system is deployed and debugged in a Linux environment.

## System Overview

The system consists of three clearly separated parts:

- **Embedded sensor node** that collects real-world data and sends it over HTTP  
- **Backend API** that validates and stores readings  
- **Frontend UI** that fetches and displays the most recent values  

All components were developed and deployed on a local network to closely mirror a basic cloud-style setup.

## Architecture

### Sensor Node
**ESP32 + DHT11 (C++ / Arduino)**

- Connects to Wi-Fi  
- Reads temperature and humidity every ~5 seconds  
- Sends readings to the backend via HTTP POST  
- Payload format is a simple JSON object  

This approach avoids heavy client libraries and keeps the firmware small and easy to inspect.

### Backend
**Node.js + Express + SQLite**

- Exposes a single API endpoint at `/api/v1/data`  
- Accepts sensor POSTs, timestamps them on arrival, and persists them in SQLite  
- Returns the most recent reading on GET  
- Uses a file-based SQLite database (`sensor_readings.db`) for simplicity and transparency  

The backend is intentionally minimal, with a small routing surface and a single controller to keep the data flow obvious.

### Frontend
**React + Vite + TypeScript**

- Simple dashboard that fetches the latest reading from the API  
- Displays temperature and humidity on load  
- Includes a manual refresh button  
- Styling is minimal and left close to Vite defaults to keep focus on data flow  

## Key Design Decisions

- **SQLite for persistence**  
  Chosen for zero configuration, portability, and ease of inspection. The database lives as a single file and is created automatically if missing.

- **Minimal API surface**  
  One route and one controller make the backend easy to reason about and easy to audit.

- **Explicit CORS configuration**  
  The backend restricts allowed origins to the frontend origin. This was intentionally configured and debugged during deployment to understand browser security boundaries.

- **Raw HTTP from the ESP32**  
  Keeps the firmware lightweight and avoids unnecessary abstractions.

## Running the Project Locally

### Prerequisites

- Node.js 18+  
- npm  

### Backend

```bash
npm install
node server.js
```

The server listens on port 3000 and creates sensor_readings.db on first run.

### Frontend
```bash
cd frontend/tempnode-frontend
npm install
npm run dev
```

Vite serves the UI at http://127.0.0.1:5173 by default.

### Sensor Node
 - **Sketch:** sensorNode.io
 - **Hardware:** ESP32 with DHT11 wired to data pin 4
 - **Configuration:**
    - Set Wi-Fi SSID and password
    - Set server host/IP to the machine running the backend

The node send a JSON payload of the form

{
    "temperature": <float>,
    "humidity": <float>
}

to POST /api/v1/data on port 3000.

## API
POST /api/v1/data
- Accepts {temperature, humidity}
- Timestamps the reading on arrival
- Inserts into SQLite
- Returns the saved values

GET /api/v1/data
- Returns the most recent {tempearture, humidity} reading from the database

## Deployment Notes
The project was deployed on a Linux machine on a local network to simulate a basic hosted environment:
- Backend API bound to a LAN IP on port 3000 so the ESP32 can reach it
- Frontend served via the Vite dev server on port 5173
- CORS confugured to explicitly allow the frontend origin

For a production-style deployment, the frontend can be built with npm run build and served as static assets alongside the API, with CORS and sensor host configuration updated accordingly.

## Repository Structure
- server.js - Express app bootstrap and CORS configuration
- controllers/data.js - Handlers for inserting and retrieving sensor data
- routes/data.js - Route wiring for /api/v1/data
- db/connect.js - SQLite initialization and table creation
- sensorNode.ino - ESP32 firmware sending sensor readings
- frontend/tempnode-frontend/ - React + Vite frontend

## Possible Next Steps
- Add historical charts or rolling averages
- Export readings as CSV
- Add a simple shared secret or token for sensor authentication
- Expose basic health or status endpoints for the API
