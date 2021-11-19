'use strict';

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const { UnauthorizedError } = require('../expressError');

// JWT is being validated on every single request
function authenticateJWT(req, res, next) {
  try {
    // jwt.verify(token, SECRET_KEY) --> token = entire jwt Token
    // returns whatever is stored in the payload
    // This will return error if invalid
    const payload = jwt.verify(
      req.body._token || req.headers.authorization.split(' ')[1],
      SECRET_KEY
    );
    req.user = payload;
    console.log('you have a valid token');
    return next();
  } catch (err) {
    console.log('you have an invalid token');
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    if (!req.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

function loggedInAndUser(req, res, next) {
  console.log('loggedInAndUser');
  console.log(req.user);
  console.log(req.params.username);
  console.log(req.user == req.params.username);
  try {
    if (!req.user) throw new UnauthorizedError();
    if (req.user.username !== req.params.username) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  loggedInAndUser,
};
