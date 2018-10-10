const express = require('express');
const UserController = require('../controllers/user');
const MD_AUTH = require('../middelwares/authenticated');

const api = express.Router();

api.get('/controller-user', MD_AUTH.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;
