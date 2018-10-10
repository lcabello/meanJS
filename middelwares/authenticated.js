const jwt = require('jwt-simple');
const moment = require('moment');

const secrect = 'secrect_key';

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'No authorization detected'
    });
  }

  const token = req.headers.authorization.replace(/['"]*/g, '');
  let payload;
  try {
    payload = jwt.decode(token, secrect);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'Token expirated'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(403).send({
      message: 'No valid authorization'
    });
  }
  req.user = payload;
  next();
};
