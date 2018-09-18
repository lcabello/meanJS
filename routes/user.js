const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();

api.get('/controller-user', UserController.pruebas);

module.exports = api;
