const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/mean_db', (err, res) => {
  if (err) throw err;

  console.log('Database connection established');

  app.listen(port, () => {
    console.log('Server running');
  });
});
