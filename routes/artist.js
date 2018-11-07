const express = require('express');
const ArtistController = require('../controllers/artist');

const api = express.Router();
const MD_AUTH = require('../middelwares/authenticated');

api.get('/artist', MD_AUTH.ensureAuth, ArtistController.getArtist);

module.exports = api;
