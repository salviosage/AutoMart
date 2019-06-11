"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geAllFlag = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

var _automart = require("../db/automart");

var _flag = _interopRequireDefault(require("../schema/flag"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var geAllFlag = function geAllFlag(req, res, next) {
  console.log(_automart.cars);
  console.log("cool");
  res.send(orders);
};

exports.geAllFlag = geAllFlag;

exports.createFlag = function (req, res, next) {
  var flagValidation = _joi["default"].validate(req.body, _flag["default"]);

  if (flagValidation.error) {
    return res.status(400).json({
      error_msg: "".concat(flagValidation.error.details[0].message)
    });
  }

  console.log("im here ");
  console.log(_automart.cars);
  console.log(req.body);

  var car = _automart.cars.find(function (car) {
    return car.id === req.body.car_id;
  });

  console.log(car);
  console.log("then here second ");

  if (!car || car.status != "available") {
    return res.status(401).json({
      error: 'call you want to flag  not found!'
    });
  }

  console.log(req.body.description);
  console.log("gotta add a flag ");
  var newFlag = {
    id: _uuid["default"].v4(),
    buyer: req.body.buyer,
    // user id
    car_id: req.body.car_id,
    reason: req.body.reason,
    // price offered
    discription: req.body.description || '',
    created_on: _moment["default"].now()
  };

  _automart.flags.push(newFlag);

  return res.status(200).json({
    newFlag: newFlag
  });
};