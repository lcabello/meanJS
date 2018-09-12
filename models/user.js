const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  rol: String,
  image: String
});

module.exports = mongoose.model('User', UserSchema);
