"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var orderStatusUpdateChema = {
  contacts: _joi["default"].string().email({
    minDomainAtoms: 2
  }).required(),
  status: _joi["default"].string().required()
};
var _default = orderStatusUpdateChema;
exports["default"] = _default;