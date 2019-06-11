"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var carUpdateSchema = {
  status: _joi["default"].string().regex(/^[a-zA-Z]{3,20}$/),
  price: _joi["default"].number(),
  id: _joi["default"].string().required()
};
var _default = carUpdateSchema;
exports["default"] = _default;