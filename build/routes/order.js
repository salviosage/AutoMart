"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../middleware/auth'); //const multer = require('../middleware/multer-config');


var orderCtrl = require('../controllers/order');

router.post('/', auth, orderCtrl.createOrder); //router.get('/', auth, orderCtrl.getAllOrders );
//router.get('/:id', auth,carCtrl.getOneAd );
//router.put('/:id', auth, carCtrl.modifycar);
//router.delete('/:id', auth, carCtrl.deleteAd);

router.patch('/:id/status', auth, orderCtrl.updateOrderStatus);
router.patch('/:id/price', auth, orderCtrl.updateOrderPrice);
module.exports = router;