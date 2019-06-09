
const express = require('express');
const router = express.Router();

const auth = require ('../middleware/auth');
//const multer = require('../middleware/multer-config');

const orderCtrl = require('../controllers/order');


router.post('/',auth, orderCtrl.createOrder );
//router.get('/', orderCtrl.getAllOrders );
//router.get('/:id', auth,function(req, res){carCtrl.getOneAd} );
//router.put('/:id', auth, function(req, res){carCtrl.modifycar});
//router.delete('/:id', auth,function(req, res){ carCtrl.deleteAd});
router.patch('/:id/status',auth, orderCtrl.updateOrder);
router.patch('/:id/price',auth, orderCtrl.updateOrder);

module.exports = router;