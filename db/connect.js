const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../sensor_readings.db');

const tableInit = () => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS data(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reading_date INTEGER,
    reading_time INTEGER,
    temperature INTEGER,
    humidity INTEGER
    )
    `);

    return db;
}

//NEED TO FIGURE OUT HOW TO PASS AROUND THE DB OBJECT!


module.exports = tableInit;