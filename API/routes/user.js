const express = require('express');
const router = express.Router();
import auth from "../middleware/auth"

const {login,signup,reset,getUser} = require('../controllers/user');
import SchemaValidator from "../middleware/schemaValidator";
const validateRequest = SchemaValidator(true,"auth");

router.post('/signup',validateRequest, signup); 
router.post('/login',validateRequest, login);
router.patch('/reset',validateRequest, reset);
router.get('/users',validateRequest,auth, getUser)

module.exports = router;