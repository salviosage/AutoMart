import express from'express'
import auth from '../middleware/auth'
import  carCtrl from '../controllers/car'
import orderCtrl from'../controllers/order'
import flagCtrl from'../controllers/flag'
import userCtrl from'../controllers/user'
import SchemaValidator from "../middleware/schemaValidaator"



// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true);
const router = express.Router();


router.get('/car/:id',validateRequest,auth, carCtrl.getOneAd );
router.get('/order/',auth, orderCtrl.geAllOrder );
router.get('/flag/',auth, flagCtrl.getAllFlag );
router.get('/auth/users',auth, userCtrl.getUser);
router.get('/car/', auth,carCtrl.getAds );
router.post('/order/',validateRequest,auth, orderCtrl.createOrder );
router.post('/flg/',validateRequest,auth, flagCtrl.createFlag );
router.post('/auth/signup',validateRequest, userCtrl.signup); 
router.post('/auth/login',validateRequest, userCtrl.login);
router.post('/car/',validateRequest,auth, carCtrl.createAd );
router.patch('/order/:id/status',validateRequest,auth, orderCtrl.updateOrderStatus);
router.patch('/order/:id/price',validateRequest, auth,orderCtrl.updateOrderPrice);
router.patch('/car/:id/status',validateRequest,auth, carCtrl.updateAd);
router.patch('/car/:id/price',validateRequest,auth, carCtrl.updateAd);
router.patch('/auth/reset',validateRequest, userCtrl.reset);
router.delete('/car/:id',validateRequest,auth, carCtrl.deleteAd);

export default router;