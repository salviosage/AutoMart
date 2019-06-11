"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _uuid = _interopRequireDefault(require("uuid"));

var _automart = require("../db/automart");

var _joi = _interopRequireDefault(require("joi"));

var _user = _interopRequireDefault(require("../schema/user"));

var _account = _interopRequireDefault(require("../schema/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUser = function getUser(req, res, next) {
  console.log(_automart.users);
  console.log("cool");
  res.send(_automart.users);
};

exports.getUser = getUser;

exports.signup = function (req, res, next) {
  var acountValidation = _joi["default"].validate(req.body, _account["default"]);

  if (flagValidation.error) {
    return res.status(400).json({
      error_msg: "".concat(acountValidation.error.details[0].message)
    });
  }

  _bcrypt["default"].hash(req.body.password, 10).then(function (hash) {
    var user = {
      id: _uuid["default"].v4(),
      email: req.body.email,
      password: hash,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: req.body.address,
      is_admin: req.body.is_admin
    };

    _automart.users.push(user);

    console.log("fvalidation passed  jst start");
    var role = "user";

    if (user.is_admin === "true") {
      role = "admin";
    }

    console.log(role);
    var userName = user.email;
    console.log(userName);

    var token = _jsonwebtoken["default"].sign({
      userName: userName,
      role: role
    }, 'RANDOM_TOKEN_SECRET', {
      expiresIn: '24h'
    });

    return res.status(200).json({
      message: "successfully account created and loged in ",
      userName: user.email,
      token: token
    });
  });
};

exports.login = function (req, res, next) {
  var userValidation = _joi["default"].validate(req.body, _user["default"]);

  if (flagValidation.error) {
    return res.status(400).json({
      error_msg: "".concat(userValidation.error.details[0].message)
    });
  }

  var user = _automart.users.find(function (user) {
    return user.email === req.body.email;
  });

  console.log("find start");

  if (!user) {
    return res.status(401).json({
      error: "User not found!"
    });
  }

  console.log("bycrypt start ");

  var compare = _bcrypt["default"].compare(req.body.password, user.password);

  if (!compare) {
    return res.status(401).json({
      error: new Error('Incorrect password!')
    });
  }

  console.log("validation passed  jst start");
  var role = "user";

  if (user.is_admin === "true") {
    role = "admin";
  }

  console.log(role);

  var token = _jsonwebtoken["default"].sign({
    userName: user.email,
    role: role
  }, 'RANDOM_TOKEN_SECRET', {
    expiresIn: '24h'
  });

  return res.status(200).json({
    message: "successfully logged in ",
    userName: user.email,
    token: token
  });
};

exports.reset = function (req, res, next) {
  var user = _automart.users.find(function (user) {
    return user.email === req.body.email;
  });

  console.log("find start");

  if (!user) {
    return res.status(401).json({
      error: 'User not found!'
    });
  }

  console.log("reset start ");

  var hash = _bcrypt["default"].hash(user.first_name, 10);

  console.log(user);
  console.log(hash);
  user.password = hash;
  console.log(user);
  console.log(user);
  return res.status(200).json({
    userId: user.id,
    message: "your password has been reseted to your first name"
  });
};