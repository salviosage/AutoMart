const express = require('express');
const router = express.Router();
import auth from "../middleware/auth"

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);
router.patch('/reset', userCtrl.reset);
router.get('/users',auth, userCtrl.getUser);

module.exports = router;