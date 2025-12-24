// setting up express app
const express = require('express');
const app = express();
const router = require('./routes/data');
const {tableInit} = require('./db/connect');
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cors({
  origin: 'http://127.0.0.1:5173'
}));


// instance variables
const port = 3000;

// initializing db table
tableInit();

// data route
app.use('/api/v1/data', router);

// listening on the port for requests
app.listen(port, ()=>{
    console.log(`Server is listening on port ${3000}`)
});