"use strict";

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    var decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    var userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (_unused) {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};