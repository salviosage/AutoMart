const express = require('express');
const router = express.Router();
import  auth from'../middleware/auth';

const {createFlag,getAllFlag} = require('../controllers/flag');
import SchemaValidator from "../middleware/schemaValidator";
const validateRequest = SchemaValidator(true,"flag");

router.post('/',validateRequest,auth, createFlag );
router.get('/',auth, getAllFlag );


module.exports = router;