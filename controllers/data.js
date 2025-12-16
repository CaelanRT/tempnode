const sqlite3 = require('sqlite3');
const {getDB} = require('../db/connect');

const db = getDB();

const readData = (req,res) => {
    // destructuring the request
    const {temperature, humidity} = req.body;

    //logging
    console.log(temperature + " " + humidity);

    // running the query
    db.run("INSERT INTO data(reading_date, reading_time, temperature, humidity) VALUES(?, ?, ?, ?)", 1, 1, temperature, humidity);

    //sending response
    res.status(200).json({temperature:temperature, humidity:humidity});
}

module.exports = readData;