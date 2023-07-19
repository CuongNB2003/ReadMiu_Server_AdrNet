var myDB = require('../models/user.model')

exports.listUser = async (req, res, next) => {
    let title = "Danh sách khách hàng"
    let msg = '';
    let dieuKienLoc = null;
    let dieuKienSapXep = null;
    //tìm kiếm
    if (req.query.fullname != '' && String(req.query.fullname) != 'undefined') {
        dieuKienLoc = {fullname: { $regex: req.query.fullname } }
    }
    // sắp xếp
    if (req.params.fullname != '0') {
        if (typeof (req.params.fullname) != 'undefined') {
            dieuKienSapXep = { fullname: Number(req.params.fullname) }
        }
    }
    if (req.params.age != '0') {
        if (typeof (req.params.age) != 'undefined') {
            dieuKienSapXep = { age: Number(req.params.age) }
        }
    }

    let listUser = await myDB.userModel.find(dieuKienLoc).skip(req.query.Index).limit(5).sort(dieuKienSapXep)
    let count = await myDB.userModel.find().count();

    res.render('user/listUser', {
        title: title, msg: msg,
        listUser: listUser,
        name: req.query.name,
        sortName: req.params.fullname,
        sortAge: req.params.age,
        count : count,
    });
}