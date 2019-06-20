const express = require('express');
const router = express.Router();
import  auth from'../middleware/auth';

import  {createOrder,updateOrderPrice,updateOrderStatus,geAllOrder} from '../controllers/order';
import SchemaValidator from "../middleware/schemaValidator";
const validateRequest = SchemaValidator(true,"order");


router.post('/',validateRequest,auth, createOrder );
router.get('/',auth, geAllOrder );
router.patch('/:id/status',validateRequest,auth, updateOrderStatus);
router.patch('/:id/price',validateRequest, auth,updateOrderPrice);

module.exports = router;