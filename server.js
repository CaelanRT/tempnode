// setting up express app
const express = require('express');
const app = express();
app.use(express.json());

// instance variables
const port = 3000;
let temperature, humidity;

// top-level route for my frontend
app.get('/', (req, res) => {
    res.send(`<h1>Values</h1>
        <p>Temperature: ${temperature}</p>
        <p>Humidity: ${humidity}</p>`);
})

// data route to consume the http request from the esp-32
app.post('/data', (req,res) => {
    ({temperature, humidity} = req.body);
    console.log(temperature + " " + humidity);
    
    res.send("Data Received");
})

// listening on the port for requests
app.listen(port, ()=>{
    console.log(`Server is listening on port ${3000}`)});