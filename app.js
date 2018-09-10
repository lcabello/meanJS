'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Routes

//Body parser configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Head configuration


//Defaults Routes
app.get('/', function (req, res) {
  res.status(200).send({
    Message: 'First connection'
  })
});

module.exports = app;