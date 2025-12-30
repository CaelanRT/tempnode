# Temperature and Humidity Monitor

Full-stack project that streams DHT11 temperature/humidity readings from an ESP32 to a Node.js API backed by SQLite, then surfaces the latest reading in a small React UI. Built to be easy to deploy on a home network and to keep a lightweight, inspectable stack for a junior-dev portfolio.

## Architecture
- **Sensor node (ESP32 + DHT11, C++/Arduino)**: Connects to Wi-Fi, reads temp/humidity every 5s, and POSTs a JSON payload to the server over HTTP.
- **Backend (Node.js + Express + SQLite)**: `/api/v1/data` accepts POSTs from the sensor and persists them with timestamps; GET on the same route returns the latest reading.
- **Frontend (React + Vite + TS)**: Simple dashboard that fetches the most recent reading and lets you refresh on demand.

## Key Design Choices
- **SQLite for persistence**: Zero-config database that ships as a file (`sensor_readings.db`), easy to inspect and back up.
- **Minimal Express surface area**: Single controller (`controllers/data.js`) and route (`routes/data.js`) to keep the API obvious and small.
- **CORS locked to the UI**: Backend only allows requests from `http://127.0.0.1:5173` to match the Vite dev server; change this if you deploy elsewhere.
- **Raw HTTP from the ESP32**: Avoids heavier HTTP client libraries and keeps the sketch small; payload is a simple JSON body.

## Running the Project Locally
Prereqs: Node.js 18+ (backend) and npm.

**Backend**
```bash
npm install
node server.js
# server listens on :3000 and will create sensor_readings.db if missing
```

**Frontend**
```bash
cd frontend/tempnode-frontend
npm install
npm run dev
# Vite serves on http://127.0.0.1:5173 by default
```

## Sensor Node Sketch (C++/Arduino)
- File: `sensorNode.ino`
- Hardware: ESP32 + DHT11 wired to data pin 4.
- Networking: Configure `ssid`, `pass`, and `server` IP to point at the machine running the Node backend.
- Payload: `{"temperature": <float>, "humidity": <float>}` sent every ~5 seconds.
- Endpoint: Sketch now posts to the Express route at `POST /api/v1/data` on port 3000 (update host/IP as needed).

## API
- `POST /api/v1/data`: Accepts `{ temperature, humidity }`, timestamps on arrival, inserts into SQLite, returns the saved values.
- `GET /api/v1/data`: Returns the most recent `{ temperature, humidity }` from SQLite.

## Frontend UX
- File: `frontend/tempnode-frontend/src/App.tsx`
- On load, fetches the latest reading and displays it; a button triggers a manual refresh.
- Lightweight styling lives in `src/App.css` (Vite/React defaults kept minimal for clarity).

## Deployment Notes
- Developed and deployed on a local network: Node/SQLite API bound to a LAN IP on port 3000 (e.g., `10.x.x.x:3000`) so the ESP32 can reach it; React app served via Vite dev server at `127.0.0.1:5173`.
- For a hosted deployment, run `npm run build` in the frontend and serve the static assets behind the API; update CORS origins and the ESP32 host/IP accordingly.
- Persisting data is file-based; back up or mount `sensor_readings.db` if you containerize.

## Repository Map
- `server.js` – Express bootstrap and CORS config.
- `controllers/data.js` – Insert/read handlers for sensor data.
- `routes/data.js` – Route wiring for `/api/v1/data`.
- `db/connect.js` – SQLite setup (`sensor_readings.db`) and table creation.
- `sensorNode.ino` – ESP32/DHT11 sketch sending readings over HTTP.
- `frontend/tempnode-frontend/` – React + Vite UI for latest readings.

## Future Improvements
- Add rolling history charts and CSV export.
- Expose health checks/metrics for the API.
- Secure the sensor endpoint with a shared secret or token.
