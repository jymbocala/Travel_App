// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
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

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};

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