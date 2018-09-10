'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/mean_db', (err, res) => {
  if (err) throw err;

  console.log('Database connection established');

  app.listen(port, () => {
    console.log('Server running');
  });
});
