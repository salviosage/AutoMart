"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var carSchema = {
  owner: _joi["default"].string().email({
    minDomainAtoms: 2
  }).required(),
  manufacturer: _joi["default"].string().regex(/^[a-zA-Z]{2,20}$/).required(),
  model: _joi["default"].string().required(),
  body_type: _joi["default"].string().required(),
  price: _joi["default"].number().required(),
  state: _joi["default"].string().regex(/^[a-zA-Z]{3,5}$/).required(),
  status: _joi["default"].string().regex(/^[a-zA-Z]{3,20}$/).required()
};
var _default = carSchema;
exports["default"] = _default;