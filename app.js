const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/user');

const app = express();

// Routes
app.use('/api', routes);

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

module.exports = app;
