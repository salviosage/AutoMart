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

var loginSchema = {
  email: _joi["default"].string().email({
    minDomainAtoms: 2
  }).required(),
  password: _joi["default"].string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
};
var _default = loginSchema;
exports["default"] = _default;