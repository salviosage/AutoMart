"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var oneCarSchema = {
  id: _joi["default"].string().required()
};
var _default = oneCarSchema;
exports["default"] = _default;