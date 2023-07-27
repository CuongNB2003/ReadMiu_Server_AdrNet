const { log } = require('console');
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

exports.getInfoUser = async (req, res, next) => {
    try {
        let inforUser = await myDB.userModel.findOne({ username: req.query.username });
        return res.status(203).json({
            data: inforUser
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
        let user = await myDB.userModel.findOne({username: req.body.username})
        console.log("log user "+ req.body.username);
        if (!user) {
            checkReg = true;
            let obj = new myDB.userModel(req.body);
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

            try {
                await obj.save()
            } catch (error) {
                console.log("Lỗi ghi cơ sở dữ liệu " + error.message);
            }
            return res.status(201).json({
                msg: " Successful Add User",
                checkReg: checkReg,
            })
        } else {
            return res.status(203).json({
                msg: "Tài khoản đã tồn tại, vui lòng tạo tài khoản khác",
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
