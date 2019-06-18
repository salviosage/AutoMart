import  express from 'express';
import auth from '../middleware/auth';
import  carCtrl from '../controllers/car';
const router = express.Router();
import SchemaValidator from "../middleware/schemaValidator";
const validateRequest = SchemaValidator(true,"car");


router.post('/',validateRequest,auth, carCtrl.createAd );
router.get('/', auth,carCtrl.getAds );
router.get('/:id',validateRequest,auth, carCtrl.getOneAd );
router.delete('/:id',validateRequest,auth, carCtrl.deleteAd);
router.patch('/:id/status',validateRequest,auth, carCtrl.updateAd);
router.patch('/:id/price',validateRequest,auth, carCtrl.updateAd);


module.exports = router;