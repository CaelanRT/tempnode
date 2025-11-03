const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;

let data = "";

app.get('/', (req, res) => {
    res.send(`<h1>${data}</h1>`);
})

app.post('/data', (req,res) => {
    data = req.body.message;
    console.log(data);
    res.send("Data Received");
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${3000}`);
    
})