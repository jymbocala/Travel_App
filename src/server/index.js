// Setup empty JS object to act as endpoint for all routes
projectData = {}; // DO I NEED THIS???????

var path = require('path')
const express = require('express');
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
// const fetch = require('node-fetch');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// console.log(__dirname)

// app.get('/', function (req, res) {
//   res.sendFile("dist/index.html");
// })

// Setup Server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

//DATABASE
const tripsData = [];

// GET route
app.get('/trips', getData);

function getData (req, res) {
  console.log("GET request received");
  res.send(tripsData);
  console.log(tripsData);
};

// POST route
app.post('/trips', addTrip);

function addTrip(req, res){
    console.log("POST request received");

    const newTrip = { // create new trip object
      date: req.body.date,
      city: req.body.city, 
      country: req.body.country,
      daysLeft: req.body.daysLeft,
      weather: req.body.weather,
      img: req.body.img,
    }
  
    console.log(newTrip, "new trip - post request");
    res.send(newTrip) // send new trip object to client
    tripsData.unshift(newTrip) // add new trip object to tripsData array
    console.log(tripsData, "tripsData after post request");
};

// DELETE route
app.delete('/trips', deleteTrip);

function deleteTrip(req, res){
    console.log("DELETE request received");
    const tripToDelete = req.body.id;
    tripsData.splice(tripToDelete, 1);
    res.send(tripsData);
    console.log(tripsData);
};