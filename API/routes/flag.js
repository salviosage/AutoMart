const express = require('express');
const router = express.Router();
import  auth from'../middleware/auth';

const flagCtrl = require('../controllers/flag');
import SchemaValidator from "../middleware/schemaValidator";
const validateRequest = SchemaValidator(true,"flag");

router.post('/',validateRequest,auth, flagCtrl.createFlag );
router.get('/',auth, flagCtrl.getAllFlag );


module.exports = router;