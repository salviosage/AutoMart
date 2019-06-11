"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.geAllOrder = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

var _automart = require("../db/automart");

var _order = _interopRequireDefault(require("../schema/order"));

var _joi = _interopRequireDefault(require("joi"));

var _orderPriceChange = _interopRequireDefault(require("../schema/orderPriceChange"));

var _orderStatusUpdate = _interopRequireDefault(require("../schema/orderStatusUpdate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var geAllOrder = function geAllOrder(req, res, next) {
  console.log(_automart.cars);
  console.log("cool");
  res.send(_automart.orders);
};

exports.geAllOrder = geAllOrder;

exports.createOrder = function (req, res, next) {
  console.log("im here ");

  var orderValidation = _joi["default"].validate(req.body, _order["default"]);

  if (orderValidation.error) {
    return res.status(400).json({
      error_msg: "".concat(orderValidation.error.details[0].message)
    });
  }

  var car = _automart.cars.find(function (car) {
    return car.id === req.body.car_id;
  });

  console.log("then here second ");

  if (!car || car.status != "available") {
    return res.status(401).json({
      error: new Error('call you want to order not found!')
    });
  }

  console.log("gotta add an order ");
  var newOrder = {
    id: _uuid["default"].v4(),
    buyer: req.body.buyer,
    // user id
    car_id: req.body.car_id,
    amount: req.body.amount,
    // price offered
    status: 'pending',
    created_on: _moment["default"].now(),
    modified_on: _moment["default"].now()
  };

  _automart.orders.push(newOrder);

  return res.status(200).json({
    newOrder: newOrder
  });
};

exports.updateOrderPrice = function (req, res, next) {
  console.log(req.params);

  var orderUpdateValidation = _joi["default"].validate(req.body, _orderPriceChange["default"]);

  if (orderUpdateValidation.error) {
    return res.status(400).json({
      error_msg: "".concat(orderUpdateValidation.error.details[0].message)
    });
  }

  console.log(req.params.id);

  var order = _automart.orders.find(function (order) {
    return order.id === req.params.id;
  });

  console.log("then here second ");
  console.log(order.status);
  console.log(order.buyer);
  console.log(req.params.contacts);

  if (!order || order.status != "pending" || order.buyer != req.body.contacts) {
    return res.status(401).json({
      error: new Error('invalid request!')
    });
  }

  console.log("gotta update order  an order ");

  var index = _automart.orders.indexOf(order);

  console.log(index);
  console.log(_automart.orders[index]);
  console.log(req.body.amount);
  console.log(req.body);
  _automart.orders[index].id = order.id, _automart.orders[index].buyer = order.buyer, // user id
  _automart.orders[index].car_id = order.car_id, _automart.orders[index].amount = _automart.orders.amaout || req.body.amount, // price offered
  _automart.orders[index].status = order.satus;
  _automart.orders[index].created_on = order.created_on, _automart.orders[index].modified_on = _moment["default"].now();
  console.log(_automart.orders[index]);
  return res.status(200).json({
    order: order
  });
};

exports.updateOrderStatus = function (req, res, next) {
  console.log(req.params);

  var orderStatusUpdate = _joi["default"].validate(req.body, _orderStatusUpdate["default"]);

  if (orderUpdateValidation.error) {
    return res.status(400).json({
      error_msg: "".concat(orderStatusUpdate.error.details[0].message)
    });
  }

  var order = _automart.orders.find(function (order) {
    return order.id === req.params.id;
  });

  console.log("then here second ");

  if (!order || order.status != "pending") {
    return res.status(401).json({
      error: new Error('order you want to edit not found!')
    });
  }

  var car = _automart.cars.find(function (car) {
    return car.id === order.car_id;
  });

  if (!car || car.owner != req.body.contact) {
    return res.status(401).json({
      error: new Error('invalid request !')
    });
  }

  console.log("gotta update order  an order ");

  var index = _automart.orders.indexOf(order);

  console.log(index);
  console.log(_automart.orders[index]);
  console.log(req.body.amount);
  console.log(req.body);
  _automart.orders[index].id = order.id, _automart.orders[index].buyer = order.buyer, // user id
  _automart.orders[index].car_id = order.car_id, _automart.orders[index].amount = _automart.orders.amaout; // price offered

  _automart.orders[index].status = order.satus || req.body.status, _automart.orders[index].created_on = order.created_on, _automart.orders[index].modified_on = _moment["default"].now();
  console.log(_automart.orders[index]);
  return res.status(200).json({
    order: order
  });
};