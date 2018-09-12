const moongose = require('moongose');

let ArtistSchema = moongose.Schema({
  name: String,
  description: String,
  image: String
});

module.exports = moongose.model('Artist', ArtistSchema);
