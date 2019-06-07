'use strict';

var express = require('./node_modules/express');
var bodyParser = require('./node_modules/body-parser');
var path = require('path');
var router = express.Router();
//const carRoutes= require('./routes/car');
var userRoutes = require('./routes/user');
//const orderRoutes= require('./routes/order');
//const flagRoutes = require('./routes/flag');
var app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

var api_version = 'v1';

var base_url = '/api/' + api_version;

//app.use(base_url +'/car', carRoutes);
app.use(base_url + '/auth', userRoutes);
//app.use(base_url +'/order', orderRoutes);
//app.use(base_url +'/flag',flagRoutes);
module.exports = app;