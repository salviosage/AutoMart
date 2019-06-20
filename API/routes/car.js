import  express from 'express';
import auth from '../middleware/auth';
import  { getAds,getOneAd,deleteAd,updateAd,createAd} from '../controllers/car';
import SchemaValidator from "../middleware/schemaValidator";
const validateRequest = SchemaValidator(true,"car");
const router = express.Router();

router.post('/',validateRequest,auth,createAd );
router.get('/', getAds );
router.get('/:id',validateRequest,auth, getOneAd );
router.delete('/:id',auth, deleteAd);
router.patch('/:id/status',validateRequest,auth, updateAd);
router.patch('/:id/price',validateRequest,auth, updateAd);


module.exports = router;