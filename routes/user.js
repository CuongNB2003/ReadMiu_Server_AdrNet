var express = require('express');
var router = express.Router();
var userCtrl = require('../controller/user.controller');
const multer = require('multer')
var uploadAvata = multer({dest : './tmp'})

router.get('/', userCtrl.listUser);
router.get('/search', userCtrl.listUser)
router.get('/sort-name/:fullname', userCtrl.listUser)

router.get('/add', userCtrl.addUser);
router.post('/add', uploadAvata.single("upload-avata"), userCtrl.addUser);

module.exports = router;