const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./sensor_readings.db');

const tableInit = () => {
    db.exec(`
    CREATE TABLE IF NOT EXISTS data(
    id INTEGER PRIMARY KEY,
    reading_date INTEGER,
    reading_time INTEGER,
    temperature INTEGER,
    humidity INTEGER
    )
    `);

    return db;
}

const getDB = () => {
    return db;
}

module.exports = {
    tableInit,
    getDB
};