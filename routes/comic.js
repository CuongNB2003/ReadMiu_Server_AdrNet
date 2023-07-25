var express = require('express');
var router = express.Router();
var comciCtrl = require('../controller/comic.controller');
const multer = require('multer')
var uploadImgComic = multer({dest : './tmp'})

router.get('/', comciCtrl.listComic);
router.get('/search', comciCtrl.listComic);
router.get('/sort-name-write/:tentacgia', comciCtrl.listComic);
router.get('/sort-year/:namxuatban', comciCtrl.listComic);

router.get('/add', comciCtrl.addComic);
router.post('/add', uploadImgComic.single('upload-comic'), 
                    uploadImgComic.array("upload-listImg", 10), 
                    comciCtrl.addComic);
router.post('/',    uploadImgComic.single("upload-comic"), comciCtrl.editComic)
router.get('/delete/:id', comciCtrl.deleteComic)
router.get('/detail/:id', comciCtrl.detailComic)




module.exports = router;