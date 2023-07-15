var myDB = require('../../models/user.model')
var fs = require('fs')
// const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    try {
        let checkLogin = false;
        let inforUser = await myDB.userModel.findOne({ username: req.query.username });
        if (inforUser) {
            if (inforUser.password == req.query.password) {
                checkLogin = true
                return res.status(200).json({
                    inforUser: inforUser,
                    msg: "Đăng nhập thành công",
                    checkLogin: checkLogin
                })
            } else {
                return res.status(203).json({
                    msg: "Sai mật khẩu",
                    checkLogin: checkLogin
                })
            }
        }
        return res.status(203).json({
            msg: "Tài khoản không tồn tại",
            checkLogin: checkLogin
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}

exports.register = async (req, res, next) => {
    try {
        let checkReg = false;
        let checkUser = await myDB.userModel.findOne({ username: req.body.username })
        let obj = new myDB.userModel(req.body)
        if (!checkUser) {
            obj.username = req.body.username
            obj.password = req.body.password
            obj.fullname = req.body.fullname
            obj.email = req.body.email
            obj.phone = req.body.phone
            obj.acc_status = true
            obj.role = false
            try {
                if (req.file) {
                    fs.renameSync(req.file.path, './public/avata_upload/' + req.file.originalname)
                    obj.avata = '/avata_upload/' + req.file.originalname
                }
            } catch (error) {
                console.log("================= Ảnh lỗi rồi m ơi: " + error.message);
            }
            let new_user = await obj.save()
            checkReg = true;
            return res.status(201).json({
                msg: " Successful Add User",
                checkReg: checkReg,
                data: new_user
            })
        } else {
            return res.status(203).json({
                msg: "Tài khoản đã tồn tại, vui lòng tạo tk khác",
                checkReg: checkReg
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}

