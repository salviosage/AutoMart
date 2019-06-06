
const express = require('express');
const router = express.Router();

const auth = require ('../middleware/auth');
//const multer = require('../middleware/multer-config');

const orderCtrl = require('../controllers/order');


router.post('/', orderCtrl.createOrder );
//router.get('/', orderCtrl.getAllOrders );
//router.get('/:id', auth,function(req, res){carCtrl.getOneAd} );
//router.put('/:id', auth, function(req, res){carCtrl.modifycar});
//router.delete('/:id', auth,function(req, res){ carCtrl.deleteAd});
//router.patch('/:id/status', auth,function(req, res){ carCtrl.updateAdStatus});
//router.patch('/:id/price',  auth,function(req, res){ carCtrl.updateAdprice});

module.exports = router;