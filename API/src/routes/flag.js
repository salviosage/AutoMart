const express = require('express');
const router = express.Router();

const auth = require ('../middleware/auth');
//const multer = require('../middleware/multer-config');

const flagCtrl = require('../controllers/flag');


router.post('/', flagCtrl.createFlag );


module.exports = router;