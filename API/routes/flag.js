const express = require('express');
const router = express.Router();
import  auth from'../middleware/auth';

const flagCtrl = require('../controllers/flag');

router.post('/',auth, flagCtrl.createFlag );
router.get('/',auth, flagCtrl.getAllFlag );


module.exports = router;