const moongose = require('mongoose');

let SongSchema = moongose.Schema({
  number: Number,
  name: String,
  duration: String,
  file: String,
  album: { type: moongose.Schema.ObjectId, ref: 'Album' }
});

module.exports = moongose.model('Song', SongSchema);
