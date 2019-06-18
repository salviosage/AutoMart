import express from'express'
import auth from '../middleware/auth'
import  {getAds,getOneAd,createAd,deleteAd,updateAd} from '../controllers/car'
import {geAllOrder,createOrder,updateOrderPrice,updateOrderStatus} from'../controllers/order'
import {createFlag, getAllFlag} from'../controllers/flag'
import {login,signup,reset,getUser} from '../controllers/user'

import SchemaValidator from "../middleware/schemaValidaator"



const validateRequest = SchemaValidator(true);
const router = express.Router();


router.get('/car/:id',validateRequest,auth, getOneAd );
router.get('/order/',auth, geAllOrder );
router.get('/flag/',auth, getAllFlag );
router.get('/auth/users',auth, getUser);
router.get('/car/', auth,getAds );
router.post('/order/',validateRequest,auth, createOrder );
router.post('/flg/',validateRequest,auth, createFlag );
router.post('/auth/signup',validateRequest, signup); 
router.post('/auth/login',validateRequest, login);
router.post('/car/',validateRequest,auth, createAd );
router.patch('/order/:id/status',validateRequest,auth, updateOrderStatus);
router.patch('/order/:id/price',validateRequest, auth,updateOrderPrice);
router.patch('/car/:id/status',validateRequest,auth, updateAd);
router.patch('/car/:id/price',validateRequest,auth, updateAd);
router.patch('/auth/reset',validateRequest, reset);
router.delete('/car/:id',validateRequest,auth, deleteAd);

export default router;