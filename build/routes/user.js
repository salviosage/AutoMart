"use strict";

var express = require('express');

var router = express.Router();

var userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.patch('/reset', userCtrl.reset);
router.get('/users', userCtrl.getUser);
module.exports = router;