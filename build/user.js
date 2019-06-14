'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var mart = require('../db/automart');

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: 'getUsers',
    value: function getUsers(req, res) {
      var users = mart.users;
      res.send(users);
    }
  }, {
    key: 'signup',
    value: function signup(req, res) {
      bcrypt.hash(req.body.password, 10).then(function (hash) {
        var newUser = {
          id: mart.users.length + 1,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          location: req.body.location,
          isAdmin: req.body.isAdmin,
          password: hash
        };

        if (req.body.isadmin == true) {
          newUser.role = 'admin';
        } else {
          ewUser.role = 'normal';
        }
      });
      var token = jwt.sign({
        userId: user.id
      }, 'RANDOM_TOKEN_SECRET', {
        expiresIn: '24h'
      });
      mart.users.push(newUser).then(function (data) {
        res.status(201).json({
          token: token,
          data: data
        });
      })["catch"](function (error) {
        res.status(500).json({
          status: 500,
          error: error
        });
      });
    }
  }, {
    key: 'login',
    value: function login(req, res, next) {
      var isUserExist = mart.users.find(function (user) {
        return user.email == reqemail;
      });
      mart.users.find(req.body.email).then(function (user) {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }

        bcrypt.compare(req.body.password, user.password).then(function (valid) {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }

          var token = jwt.sign({
            userId: user.id
          }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
          });
          res.status(200).json({
            token: token,
            user: user
          });
          console.log(user);
        })["catch"](function (error) {
          res.status(500).json({
            error: error
          });
        });
      })["catch"](function (error) {
        res.status(500).json({
          error: error
        });
      });
    }
  }, {
    key: 'find',
    value: function find(email) {
      return mart.users.find(function (user) {
        return user.id === id;
      });
    }
  }, {
    key: 'login',
    value: function login(req, res, next) {
      var isUserExist = mart.users.find(function (user) {
        return user.email == reqemail;
      });
      mart.users.find(req.body.email).then(function (user) {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }

        bcrypt.compare(req.body.password, user.password).then(function (valid) {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }

          var token = jwt.sign({
            userId: user.id
          }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h'
          });
          res.status(200).json({
            token: token,
            user: user
          });
          console.log(user);
        })["catch"](function (error) {
          res.status(500).json({
            error: error
          });
        });
      })["catch"](function (error) {
        res.status(500).json({
          error: error
        });
      });
    }
  }]);

  return User;
}();