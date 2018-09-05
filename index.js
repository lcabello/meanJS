'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mean_db', (err, res) => {
  if (err) throw err;

  console.log('Connection established');
});
