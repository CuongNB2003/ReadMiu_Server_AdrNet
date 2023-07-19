var express = require('express');
var router = express.Router();
var comciCtrl = require('../controller/comic.controller');

router.get('/', comciCtrl.listComic);

module.exports = router;