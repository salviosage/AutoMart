"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi$object$keys;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Joi = require('@hapi/joi');

var name = Joi.string().alphanum().min(3).max(30).required();
var password = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
var number = Joi.number().integer().min(1900).max(2013);
var email = Joi.string().email({
  minDomainSegments: 2
});
var string = joi.string();
var userSchema = Joi.object().keys(_defineProperty({
  fistname: name,
  lastname: name,
  location: name,
  email: email,
  type: string.valid(['admin', 'user']).required(),
  password: password,
  access_token: [Joi.string(), Joi.number()]
}, "email", email));
var signinSchema = joi.object().keys({
  email: email,
  password: joi.string().min(8).required()
});
var adsSchema = joi.object().keys({
  owner: number.required(),
  // user id
  state: string.valid(['new', 'used']).required(),
  // new,used
  status: string.valid(['sold', 'available']).required(),
  price: number.required(),
  manufacturer: joi.string().required(),
  model: string.required(),
  body_type: sting.required()
});
var flagSchema = joi.object().keys((_joi$object$keys = {
  id: number,
  car_id: number,
  reason: string,
  // [pricing, weird demands, etc]
  description: String
}, _defineProperty(_joi$object$keys, "id", number), _defineProperty(_joi$object$keys, "state", string.valid(['new', 'used']).required()), _defineProperty(_joi$object$keys, "status", string.valid(['sold', 'available']).required()), _defineProperty(_joi$object$keys, "price", number.required()), _defineProperty(_joi$object$keys, "manufacturer", joi.string().required()), _defineProperty(_joi$object$keys, "model", string.required()), _defineProperty(_joi$object$keys, "body_type", string.required()), _joi$object$keys));
var orderChema = joi.object().keys({
  id: number,
  car_id: number,
  owner: number.required(),
  // user id
  amount: number // price offered

});
var _default = {
  userSchema: userSchema,
  signinSchema: signinSchema,
  adsSchema: adsSchema,
  orderChema: orderChema,
  flagSchema: flagSchema
};
exports["default"] = _default;