"use strict";

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var router = express.Router();

//const multer = require('../middleware/multer-config');
var flagCtrl = require('../controllers/flag');

router.post('/', _auth["default"], flagCtrl.createFlag);
module.exports = router;