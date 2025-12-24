const sqlite3 = require('sqlite3');
const {getDB} = require('../db/connect');

const db = getDB();

const readData = (req,res) => {
    // destructuring the request
    const {temperature, humidity} = req.body;

    // timestamp
    const now = new Date();
    const reading_date = now.toISOString().slice(0, 10);
    const reading_time = now.toTimeString().slice(0, 8);

    //logging
    console.log(`${reading_date} - ${reading_time} - temperature: ${temperature}, humidity: ${humidity}`);

    // running the query
    db.run("INSERT INTO data(reading_date, reading_time, temperature, humidity) VALUES(?, ?, ?, ?)", reading_date, reading_time, temperature, humidity);

    //sending response
    res.status(201).json({temperature:temperature, humidity:humidity});
}

// gets the latest readings
const getLatest = (req,res) => {
    const sql = "SELECT * FROM data ORDER BY id DESC LIMIT 1";
    let temperature = 0, humidity = 0;

    db.get(sql,[], (err, row) => {
        if (err) {
            res.send(500).json({error:'DB error'});
        }

        if (row) {
            temperature = row.temperature;
            humidity = row.humidity;

            res.status(200).json({temperature:temperature, humidity:humidity});
            
        } else {
            console.log("No data found.");
            res.status(500).json({temperature:null,humidiy:null});
        }
    })    
}

module.exports = {
    readData,
    getLatest
};