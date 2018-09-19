const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

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

module.exports = {
  pruebas,
  saveUser
};
