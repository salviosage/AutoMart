const express = require('express');
const router = express.Router();

import  auth from'../middleware/auth';
//const multer = require('../middleware/multer-config');

const flagCtrl = require('../controllers/flag');


router.post('/',auth, flagCtrl.createFlag );


module.exports = router;