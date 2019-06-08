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

var orderPriceUpdateChema = {
  new_price_offered: _joi["default"].number().required()
};
var _default = orderPriceUpdateChema;
exports["default"] = _default;