"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth'); //const multer = require('../middleware/multer-config');


var orderCtrl = require('../controllers/order');

router.post('/', orderCtrl.createOrder); //router.get('/', orderCtrl.getAllOrders );
//router.get('/:id', auth,function(req, res){carCtrl.getOneAd} );
//router.put('/:id', auth, function(req, res){carCtrl.modifycar});
//router.delete('/:id', auth,function(req, res){ carCtrl.deleteAd});

router.patch('/:id/status', orderCtrl.updateOrder);
router.patch('/:id/price', orderCtrl.updateOrder);
module.exports = router;