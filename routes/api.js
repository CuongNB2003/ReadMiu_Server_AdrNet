var express = require('express')
var router = express.Router();
var comicApi = require('../controller/API/comic.api')
var commentApi = require('../controller/API/comment.api')
var userApi = require('../controller/API/users.api')
var accountApi = require('../controller/API/account.api')
const multer = require('multer')
var uploadAvata = multer({dest : './tmp'})
var uploadComic = multer({dest : './tmp'})


//login
router.post('/login', accountApi.login)
router.post('/reg', accountApi.register)

//user 
router.get('/user', userApi.list)
router.post('/user/add', uploadAvata.single("upload-avata"), userApi.add)
router.put('/user/edit/:id', uploadAvata.single("upload-avata"), userApi.edit)
router.delete('/user/delete/:id', userApi.delete)

//comic 
router.get('/comic', comicApi.list)
router.post('/comic/add', uploadComic.single("upload-comic"), comicApi.add)
router.put('/comic/edit/:id', uploadComic.single("upload-comic"), comicApi.edit)
router.delete('/comic/delete/:id', comicApi.delete)

//comment tốt
router.get('/comment', commentApi.list)
router.post('/comment/add', commentApi.add)
router.put('/comment/edit/:id', commentApi.edit)
router.delete('/comment/delete/:id', commentApi.delete)


module.exports = router;

