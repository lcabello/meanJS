const fs = require('fs');
const path = require('path');
const Artist = require('../models/artist');
const Song = require('../models/song');
const Album = require('../models/album');

function getArtist (req, res) {
  res.status(200).send({
    message: 'getArtist'
  });
}

module.exports = {
  getArtist
};
