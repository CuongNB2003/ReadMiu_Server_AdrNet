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
router.post('/user', uploadAvata.single("upload-avata"), userApi.add)
router.put('/user/:id', uploadAvata.single("upload-avata"), userApi.edit)
router.delete('/user/:id', userApi.delete)

//comic 
router.get('/comic', comicApi.list)
router.get('/comic/detail/:id', comicApi.detail)
router.get('/comic/read/:id', comicApi.read)
router.post('/comic', uploadComic.single("upload-comic"), comicApi.add)
router.put('/comic/:id', uploadComic.single("upload-comic"), comicApi.edit)
router.delete('/comic/:id', comicApi.delete)

//comment tốt
router.get('/comment', commentApi.list)
router.post('/comment', commentApi.add)
router.put('/comment/:id', commentApi.edit)
router.delete('/comment/:id', commentApi.delete)


module.exports = router;

