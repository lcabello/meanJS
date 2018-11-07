const express = require('express');
const bodyParser = require('body-parser');
const user_routes = require('./routes/user');
const artist_routes = require('./routes/artist');

const app = express();

// Body parser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Head configuration

// Defaults Routes
app.get('/connection-test', (req, res) => {
  res.status(200).send({
    Message: 'First connection'
  });
});

// Routes
app.use('/api', user_routes);
app.use('/api', artist_routes);

module.exports = app;
