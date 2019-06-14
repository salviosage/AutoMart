import  express from 'express';
import auth from '../middleware/auth';
import  carCtrl from '../controllers/car';
const router = express.Router();

router.post('/',auth, carCtrl.createAd );
router.get('/', auth,carCtrl.getAds );
router.get('/:id',auth, carCtrl.getOneAd );
router.delete('/:id',auth, carCtrl.deleteAd);
router.patch('/:id/status',auth, carCtrl.updateAd);
router.patch('/:id/price',auth, carCtrl.updateAd);


module.exports = router;