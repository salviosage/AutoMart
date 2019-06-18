
const express = require('express');
const router = express.Router();

const auth = require ('../middleware/auth');
//const multer = require('../middleware/multer-config');

const orderCtrl = require('../controllers/order');
import SchemaValidator from "../middleware/schemaValidator";
const validateRequest = SchemaValidator(true,"order");


router.post('/',validateRequest,auth, orderCtrl.createOrder );
router.get('/',auth, orderCtrl.geAllOrder );
router.patch('/:id/status',validateRequest,auth, orderCtrl.updateOrderStatus);
router.patch('/:id/price',validateRequest, auth,orderCtrl.updateOrderPrice);

module.exports = router;