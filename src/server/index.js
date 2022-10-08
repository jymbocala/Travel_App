// Setup empty JS object to act as endpoint for all routes
projectData = {};

var path = require('path')
const express = require('express');
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
const fetch = require('node-fetch');

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
const tripsData = []

/* ROUTES */
// GET ROUTE
app.get('/trips', getData);

function getData (req, res) {
  res.send(tripsData);
  console.log(tripsData);
};

// POST ROUTE
app.post('/trips', addTrip);

function addTrip(req,res){
    const newTrip = { // create new trip object
      date: req.body.date, // get date from request body
      temp: req.body.temp, 
      content: req.body.content
    }
  
    res.send(newTrip)
    entryData.unshift(newTrip)
    console.log(tripsData)
};