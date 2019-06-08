"use strict";

var _car = _interopRequireDefault(require("../controllers/car"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth'); //const multer = require('../middleware/multer-config');


router.post('/', _car["default"].createAd);
router.get('/', _car["default"].getAds);
router.get('/:id', _car["default"].getOneAd); //router.put('/:id', auth, function(req, res){carCtrl.modifycar});

router["delete"]('/:id', _car["default"].deleteAd);
router.patch('/:id/status', _car["default"].updateAd);
router.patch('/:id/price', _car["default"].updateAd);
module.exports = router;