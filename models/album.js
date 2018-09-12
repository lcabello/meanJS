const moongose = require('mongoose');

let AlbumSchema = moongose.Schema({
  title: String,
  description: String,
  year: Number,
  image: String,
  artist: { type: moongose.Schema.ObjectId, ref: 'Artist' }
});

module.exports = moongose.module('Album', AlbumSchema);
