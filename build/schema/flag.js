"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var flagSchema = {
  buyer: _joi["default"].string().email({
    minDomainAtoms: 2
  }).required(),
  car_id: _joi["default"].number().required(),
  reason: _joi["default"].string().required(),
  description: _joi["default"].string()
};
var _default = flagSchema;
exports["default"] = _default;