const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const jwt = require('../services/jwt');

function pruebas (req, res) {
  res.status(200).send({
    message: 'Trying user controller'
  });
}

function saveUser (req, res) {
  const user = new User();
  const params = req.body || {};

  if (params && !params.password) {
    res.status(500).send({
      message: 'No password'
    });
  } else {
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    bcrypt.hash(params.password, null, null, (err, hash) => {
      if (err) {
        res.status(500).send({
          message: 'Problem saving data'
        });
      }
      user.password = hash;
      if (user.name !== null && user.email !== null) {
        // Saving user
        user.save((errSave, userStored) => {
          if (errSave) {
            res.status(500).send({
              message: 'Problem saving data'
            });
          } else {
            res.status(200).send({
              message: 'User saved',
              user: userStored
            });
          }
        });
      } else {
        res.status(500).send({
          message: 'No correct info'
        });
      }
    });

    res.status(200).send({
      message: 'OK password'
    });
  }
}

function loginUser (req, res) {
  const params = req.body;

  User.findOne({
    email: params.email.toLowerCase()
  }, (errFind, user) => {
    if (errFind) {
      res.status(500).send({
        message: 'Error'
      });
    } else if (!user) {
      res.status(404).send({
        message: 'Not found'
      });
    } else {
      bcrypt.compare(params.password, user.password, (errPass, check) => {
        if (check && params.gethash) {
          res.status(200).send({
            token: jwt.createToken(user)
          });
        } else {
          res.status(404).send({
            message: 'password not correct'
          });
        }
      });
    }
  });
}

function updateUser (req, res) {
  const userId = req.params.id;
  const params = req.body;

  User.findByIdAndUpdate(userId, params, (err, userUpdated) => {
    if (err) {
      res.status(500).send({
        message: 'Error'
      });
    } else if (!userUpdated) {
      res.status(500).send({
        message: 'Not updated'
      });
    }

    res.status(200).send({
      message: 'User updated'
    });
  });
}

function uploadImage (req, res) {
  const userId = req.params.id;
  let fileName = `No upload`;

  if (req.files) {
    /* We´ll insert control about extension */
    fileName = req.files.image.path.split('/')[2];
    User.findByIdAndUpdate(userId, { image: fileName }, (errUpload, userUpdated) => {
      if (errUpload) {
        res.status(404).send({
          message: 'Problem uploading'
        });
      } else {
        res.status(200).send({
          message: 'User updated'
        });
      }
    });
  } else {
    res.status(500).send({
      message: 'No image'
    });
  }
}

function getImageFile (req, res) {
  const imageFile = req.params.imageFile;
  const pathFile = `./uploads/users/${imageFile}`;
  fs.exists(`./uploads/users/${imageFile}`, (exists) => {
    if (exists) {
      res.sendFile(path.resolve(pathFile));
    } else {
      res.status(200).send({
        message: 'No image found'
      });
    }
  });
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
};
