import  express from 'express';
import auth from '../middleware/auth';
import  carCtrl from '../controllers/car';
const router = express.Router();

router.post('/', auth, carCtrl.createAd );
router.get('/:id', carCtrl.getOneAd );
router.get('/', carCtrl.getAds );

//router.put('/:id', auth,carCtrl.modifycar);
router.delete('/:id',auth, carCtrl.deleteAd);
router.patch('/:id/status',auth, carCtrl.updateAd);
router.patch('/:id/price',auth, carCtrl.updateAd);


module.exports = router;