"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _uuid = _interopRequireDefault(require("uuid"));

var _automart = require("../db/automart");

var _car = _interopRequireDefault(require("../schema/car"));

var _carUpdate = _interopRequireDefault(require("../schema/carUpdate"));

var _carDelete = _interopRequireDefault(require("../schema/carDelete"));

var _oneCar = _interopRequireDefault(require("../schema/oneCar"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

exports.getAds = function (req, res, next) {
  console.log("here");
  var inReturn = []; // define an array to hold relevant data from database 
  //if user signed in 

  if (req.headers.token) {
    var token = req.headers.token;

    try {
      console.log('in a token ');
      console.log(token);
      var decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      console.log(decodedToken);
      var userName = decodedToken.userName;
      console.log(userName);
      var role = decodedToken.role;
      console.log(role); // for admin request 

      if (role && role === "admin") {
        inReturn = _automart.cars;
        console.log(inReturn);
        console.log("admin found");
      } // for any user signed in 
      else if (role && userName) {
          console.log("norml user are here ");

          for (var i = 0; i <= _automart.cars.length - 1; i++) {
            if (_automart.cars[i].owner === userName || _automart.cars[i].status === "available") {
              inReturn.push(_automart.cars[i]);
            }
          }

          console.log(inReturn);
        }
    } catch (_unused) {
      return res.status(401).json({
        error: 'Invalid request !'
      });
    }
  } else {
    for (var _i = 0; _i <= _automart.cars.length - 1; _i++) {
      if (_automart.cars[_i].status === "available") {
        inReturn.push(_automart.cars[_i]);
      }
    }
  }

  if (req.query) {
    console.log(req.query);
    var state = req.query.state;
    var minPrice = parseInt(req.query.min_price);
    var maxPrice = parseInt(req.query.max_price);
    var manufacturer = req.query.manufacturer;
    var body_type = req.query.body_type;
    var carSaleFound = []; //all get specification for cars withou price range specification 

    for (var _i2 = 0; _i2 <= inReturn.length - 1; _i2++) {
      //get car with specified state 
      if (state && !manufacturer && !body_type) {
        if (inReturn[_i2].state === state) {
          carSaleFound.push(inReturn[_i2]);
        }
      } //get car with specified manufacturer 
      else if (!state && manufacturer && !body_type) {
          if (inReturn[_i2].manufacturer === manufacturer) {
            carSaleFound.push(inReturn[_i2]);
          }
        } //get car with specified  body-type
        else if (!state && !manufacturer && body_type) {
            if (inReturn[_i2].body_type === body_type) {
              console.log("im in body type only");
              carSaleFound.push(inReturn[_i2]);
            }
          } //get car with specified manufacturer and body_type
          else if (!state && manufacturer && body_type) {
              if (inReturn[_i2].manufacturer === manufacturer && inReturn[_i2].body_type === body_type) {
                carSaleFound.push(inReturn[_i2]);
              }
            } //get car with specified manufactirer body_type and state 
            else if (state && manufacturer && body_type) {
                if (inReturn[_i2].state === state && inReturn[_i2].manufacturer === manufacturer && inReturn[_i2].body_type === body_type) {
                  carSaleFound.push(inReturn[_i2]);
                }
              } //get car with specified manufacturer and state 
              else if (state && manufacturer && !body_type) {
                  if (inReturn[_i2].manufacturer === manufacturer && inReturn[_i2].state === state) {
                    carSaleFound.push(inReturn[_i2]);
                  }
                } //get car with specified state and body-type
                else if (state && !manufacturer && body_type) {
                    if (inReturn[_i2].body_type === body_type && inReturn[_i2].state === state) {
                      carSaleFound.push(inReturn[_i2]);
                    }
                  } //get car with specified manufacturer and body_type
                  else if (!state && manufacturer && body_type) {
                      if (inReturn[_i2].manufacturer === manufacturer && inReturn[_i2].body_type === body_type) {
                        carSaleFound.push(inReturn[_i2]);
                      }
                    }

      if (carSaleFound.length <= 0) {
        carSaleFound = inReturn;
      } // check if there is specified price range 


      if (minPrice && maxPrice) {
        console.log(maxPrice);
        var carFilterByPrice = [];

        for (var j = 0; j <= carSaleFound.length - 1; j++) {
          if (carSaleFound[j].price >= minPrice && carSaleFound[j].price <= maxPrice) {
            carFilterByPrice.push(carSaleFound[j]);
          }
        } //return car filter by price range


        return res.status(320).json({
          data: carFilterByPrice
        });
      }

      return res.status(302).json({
        data: carSaleFound
      });
    }
  } else if (inReturn.length > 0) {
    return res.status(302).json({
      data: inReturn
    });
  } else {
    return res.status(400).json({
      error: "no car found "
    });
  }
}; //create a car ad endpoint 


exports.createAd = function (req, res, next) {
  var carAdValidation = _joi["default"].validate(req.body, _car["default"]);

  if (carAdValidation.error) {
    return res.status(400).json({
      error_msg: "".concat(carAdValidation.error.details[0].message)
    });
  }

  var newAd = {
    id: _uuid["default"].v4(),
    owner: req.body.owner,
    state: req.body.state || 'new',
    status: req.body.status || 'available',
    body_type: req.body.body_type,
    model: req.body.model,
    manufacturer: req.body.manufacturer,
    price: req.body.price,
    created_on: _moment["default"].now(),
    modified_on: _moment["default"].now()
  };

  _automart.cars.push(newAd);

  return res.status(200).json({
    newAd: newAd
  });
};

exports.getOneAd = function (req, res, next) {
  console.log(req.params);

  var carAdValidation = _joi["default"].validate(req.params, _oneCar["default"]);

  if (carAdValidation.error) {
    return res.status(400).json({
      error: "".concat(carAdValidation.error.details[0].message)
    });
  }

  var car = _automart.cars.find(function (car) {
    return car.id === req.params.id;
  });

  console.log(car);
  console.log(req.params.id);
  console.log("then here second ");

  if (!car || car.status != "available") {
    return res.status(401).json({
      error: 'call you want to car not found from one add get!'
    });
  }

  console.log(car);
  console.log("cool");
  res.send(car);
};

exports.updateAd = function (req, res, next) {
  console.log(req.params);

  var carAdValidation = _joi["default"].validate(req.body, _carUpdate["default"]);

  if (carAdValidation.error) {
    return res.status(400).json({
      error: "".concat(carAdValidation.error.details[0].message)
    });
  }

  var car = _automart.cars.find(function (car) {
    return car.id === req.params.id;
  });

  console.log("then here second ");

  if (!car || car.status != "available") {
    return res.status(401).json({
      error: new Error('car not found !')
    });
  }

  console.log("gotta add an car ");
  var price = car.price;
  var status = car.status;

  if (req.body.price) {
    price = req.body.price;
  } else {
    status = req.body.status;
  }

  var index = _automart.cars.indexOf(car);

  console.log(index);
  console.log(_automart.cars[index]);
  console.log(req.body);
  _automart.cars[index].id = car.id, _automart.cars[index].owner = car.owner, // user id
  _automart.cars[index].state = car.state, _automart.cars[index].price = price, // price offered
  _automart.cars[index].status = status, _automart.cars[index].created_on = car.created_on, _automart.cars[index].modified_on = _moment["default"].now();
  console.log(_automart.cars[index]);
  return res.status(200).json({
    car: car
  });
};

exports.deleteAd = function (req, res, next) {
  console.log(req.params);

  var carAdValidation = _joi["default"].validate(req.body, _carDelete["default"]);

  if (carAdValidation.error) {
    return res.status(400).json({
      error: "".concat(carAdValidation.error.details[0].message)
    });
  }

  var car = _automart.cars.find(function (car) {
    return car.id === req.params.id;
  });

  console.log("then here second ");

  if (!car) {
    return res.status(401).json({
      error: new Error('car not found !')
    });
  }

  console.log("gotta delete ");

  var index = _automart.cars.indexOf(car);

  console.log(index);
  console.log(_automart.cars[index]);

  _automart.cars.splice(index, 1);

  console.log(req.body);
  console.log(_automart.cars[index]);
  return res.status(200).json({
    cars: _automart.cars
  });
};