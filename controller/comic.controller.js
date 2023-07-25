var myDB = require('../models/comic.model')
let fs = require('fs')

exports.listComic = async (req, res, next) => {
    let title = "Danh sách truyện"
    let msg = ""
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    //tìm kiếm
    if (req.query.name != '' && String(req.query.name) != 'undefined') {
        dieuKienLoc = { name: { $regex: req.query.name } }
    }
    // sắp xếp theo tên tác giả
    if (req.params.tentacgia != '0') {
        if (typeof (req.params.tentacgia) != 'undefined') {
            dieuKienSapXep = { writer_name: Number(req.params.tentacgia) }
        }
    }
    // sắp xếp theo năm xuất bản
    if (req.params.namxuatban != '0') {
        if (typeof (req.params.namxuatban) != 'undefined') {
            dieuKienSapXep = { publishing_year: Number(req.params.namxuatban) }
        }
    }

    let listComic = await myDB.comicModel.find(dieuKienLoc).skip(req.query.Index).limit(5).sort(dieuKienSapXep)
    let count = await myDB.comicModel.countDocuments();

    res.render('comic/listComic', {
        title: title, msg:msg,
        listComic: listComic,
        count: count,
        name: req.query.name,
        sortNameWrite: req.params.tentacgia,
        sortYear: req.params.namxuatban,

    });
}

exports.detailComic = async (req, res, next) => {
    let title = "Chi tiết truyện"
    let msg = ""
    let Comic = await myDB.comicModel.findById(req.params.id)
    let listCmt = await myDB.commentModel.find({ id_comic: req.params.id}).populate('id_user')
    
    res.render('comic/detailComic', {
        title: title, msg: msg,
        data: Comic, listCmt: listCmt,
    })
}

exports.addComic = async (req, res, next) => {
    let title = "Thêm truyện tranh"
    let msg = ""

    res.render('comic/addComic', {
        title: title, msg: msg,
    })
}

exports.editComic = async (req, res, next) => {
    let title = "Thêm truyện tranh"
    let msg = ""
    
    res.render('comic/listComic', {})
}

exports.deleteComic = async (req, res, next) => {
    let title = "Thêm truyện tranh"
    let msg = ""
    
    res.render('comic/listComic', {})
}