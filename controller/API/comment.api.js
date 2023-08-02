var myDB = require('../../models/comic.model')

exports.list = async (req, res, next) => {
    try {
        //api phân trang http://localhost:3000/comment?limit=&page=
        // if (req.query.limit && req.query.page) {
        //     let skip = (req.query.page - 1) * req.query.limit;
        //     let total = await myDB.commentModel.countDocuments();
        //     let data = await myDB.commentModel.find().skip(skip).limit(req.query.limit);
        //     let totalPage = Math.ceil(total / req.query.limit);
        //     if (req.query.page > totalPage) {
        //         return res.status(203).json({
        //             msg: "Fail Load Data",
        //         })
        //     }
        //     return res.status(200).json({
        //         msg: "Successful Data Paging",
        //         data: data,
        //     })
        // }
        // load toàn bộ
        let list = await myDB.commentModel.find({ id_comic: req.query.id }).populate('id_user')
        return res.status(200).json({
            msg: " Successful Data Comment",
            data: list
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }

}

exports.add = async (req, res, next) => {
    try {
        
        let obj = new myDB.commentModel(req.body)
        obj.cmt_date = Date.now()

        try {
            await obj.save()
        } catch (error) {
            console.log("Lỗi ghi cơ sở dữ liệu " + error.message);
        }

        // let date = obj.cmt_date.toLocaleDateString('en-GB')
        return res.status(201).json({
            msg: "Thêm thành công",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}

exports.edit = async (req, res, next) => {
    try {
        let obj = await myDB.commentModel.findById(req.params.id)
        obj.cmt_content = req.query.cmt_new

        await myDB.commentModel.findByIdAndUpdate(req.params.id, obj)
        return res.status(200).json({
            msg: "Sửa thành công",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })

    }
}

exports.delete = async (req, res, next) => {
    try {
        await myDB.commentModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            msg: "Đã xóa comment",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}