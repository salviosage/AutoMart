const express = require('express');
const router = express.Router();

const auth = require ('../middleware/auth');
//const multer = require('../middleware/multer-config');

const carCtrl = require('../controllers/car');



router.post('/', carCtrl.createAd );
router.get('/', carCtrl.getAds );
router.get('/:id', carCtrl.getOneAd );
//router.put('/:id', auth, function(req, res){carCtrl.modifycar});
router.delete('/:id',carCtrl.deleteAd);
//router.patch('/:id/status', auth,function(req, res){ carCtrl.updateAdStatus});
router.patch('/:id/price', carCtrl.updateAd);


module.exports = router;