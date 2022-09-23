// Setup empty JS object to act as endpoint for all routes
projectData = {};

var path = require('path')
const express = require('express');
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname)

app.get('/', function (req, res) {
  res.sendFile("dist/index.html");
})

// Setup Server
app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

//DATABASE
const entryData = []

// GET route
app.get('/entries', getData);

function getData (req, res) {
  res.send(entryData);
  console.log(entryData)
};

// POST route
app.post('/entries', addEntry);

function addEntry(req,res){
    const newEntry = {
      date: req.body.date,
      temp: req.body.temp,
      content: req.body.content
    }
  
    res.send(newEntry)
    entryData.unshift(newEntry)
    console.log(entryData)
};