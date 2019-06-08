const express = require('express');
const router = express.Router();

const auth = require ('../middleware/auth');
//const multer = require('../middleware/multer-config');

import  carCtrl from '../controllers/car';



router.post('/', carCtrl.createAd );
router.get('/', carCtrl.getAds );
router.get('/:id', carCtrl.getOneAd );
//router.put('/:id', auth, function(req, res){carCtrl.modifycar});
router.delete('/:id',carCtrl.deleteAd);
router.patch('/:id/status', carCtrl.updateAd);
router.patch('/:id/price', carCtrl.updateAd);


module.exports = router;