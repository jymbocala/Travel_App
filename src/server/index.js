const FormData = require('form-data');

var path = require("path");
const express = require("express");
const app = express();

const fetch = require('node-fetch');


app.use(express.static("dist"));
app.use(express.json()) // for parsing application/json

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// Setup Server
app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})

//DATABASE
let tripsData = [];

// GET route
app.get('/trips', getData);

export function getData (req, res) {
  console.log("GET request received");
  res.send(tripsData);
  console.log(tripsData);
};

// POST route
app.post('/trips', addTrip);

function addTrip(req, res){
    console.log("POST request received");

    const newTrip = {
      date: req.body.date,
      city: req.body.city, 
      country: req.body.country,
      daysLeft: req.body.daysLeft,
      weather: req.body.weather,
      icon: req.body.icon,
      img: req.body.img,
    }
  
    console.log(newTrip, "new trip - post request");
    res.send(newTrip)
    tripsData.unshift(newTrip)
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