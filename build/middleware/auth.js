"use strict";

var _automart = require("../db/automart");

var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  console.log(req.headers);

  try {
    console.log("try started ");
    var token = req.headers.token;
    console.log("try started ");
    var decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken);
    var userName = decodedToken.userName;
    console.log(userName);
    var role = decodedToken.role;
    console.log(role);

    var user = _automart.users.find(function (user) {
      return user.email === userName;
    });

    console.log("find start");

    if (!user) {
      res.status(401).json({
        error: 'Authentiction failed '
      });
    } else {
      console.log("user found ");
      next();
    }
  } catch (_unused) {
    res.status(401).json({
      error: 'Invalid request! you must login first '
    });
  }
};