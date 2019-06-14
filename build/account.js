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

var accountSchema = {
  email: _joi["default"].string().email({
    minDomainAtoms: 2
  }).required(),
  first_name: _joi["default"].string().regex(/^[a-zA-Z]{2,20}$/).required(),
  last_name: _joi["default"].string().regex(/^[a-zA-Z]{2,20}$/).required(),
  password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  address: _joi["default"].string().trim().regex(/^[0-9]{7,10}$/).required(),
  is_admin: _joi["default"].bool().valid([1, 0]).required()
};
var _default = accountSchema;
exports["default"] = _default;