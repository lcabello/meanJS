const express = require('express');
const MULTIPART = require('connect-multiparty');
const UserController = require('../controllers/user');
const MD_AUTH = require('../middelwares/authenticated');

const MD_UPLOAD = MULTIPART({ uploadDir: './uploads/users' });

const api = express.Router();

api.get('/controller-user', MD_AUTH.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/updateUser/:id', MD_AUTH.ensureAuth, UserController.updateUser);
api.post('/uploadImageUser/:id', [MD_AUTH.ensureAuth, MD_UPLOAD], UserController.uploadImage);
api.get('/getImageUser/:id', UserController.getImageFile);

module.exports = api;
