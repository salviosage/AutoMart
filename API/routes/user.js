const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', function(req, res){userCtrl.signup}); 
router.post('/login', function(req, res){userCtrl.login});
 
router.get('/users', function(req, res){userCtrl.getUsers});

module.exports = router;