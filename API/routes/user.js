const express = require('express');
const router = express.Router();
import auth from "../middleware/auth"

const userCtrl = require('../controllers/user');
import SchemaValidator from "../middleware/schemaValidator";
const validateRequest = SchemaValidator(true,"auth");

router.post('/signup',validateRequest, userCtrl.signup); 
router.post('/login',validateRequest, userCtrl.login);
router.patch('/reset',validateRequest, userCtrl.reset);
router.get('/users',validateRequest,auth, userCtrl.getUser)

module.exports = router;