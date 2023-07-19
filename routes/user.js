var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller');

router.get('/', userCtrl.listUser);

module.exports = router;