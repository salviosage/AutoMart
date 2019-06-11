"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var purchoseOrderSchema = {
  car_ID: _joi["default"].number().required(),
  buyer_contacts: _joi["default"].string().trim().regex(/^[0-9]{7,10}$/).required(),
  price: _joi["default"].number().required(),
  price_offered: _joi["default"].number().required()
};
var _default = purchoseOrderSchema;
exports["default"] = _default;