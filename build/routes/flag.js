"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth'); //const multer = require('../middleware/multer-config');


var flagCtrl = require('../controllers/flag');

router.post('/', flagCtrl.createFlag);
module.exports = router;