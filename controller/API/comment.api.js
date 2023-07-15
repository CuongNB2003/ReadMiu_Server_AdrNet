var myDB = require('../../models/comic.model')

exports.list = async (req, res, next) => {
    try {
        //api phân trang http://localhost:3000/comment?limit=&page=
        if (req.query.limit && req.query.page) {
            let skip = (req.query.page - 1) * req.query.limit;
            let total = await myDB.commentModel.countDocuments();
            let data = await myDB.commentModel.find().skip(skip).limit(req.query.limit);
            let totalPage = Math.ceil(total / req.query.limit);
            if (req.query.page > totalPage) {
                return res.status(203).json({
                    msg: "Fail Load Data",
                })
            }
            return res.status(200).json({
                data: [...data],
                msg: "Successful Data Paging",
            })
        }
        // load toàn bộ
        let list = await myDB.commentModel.find().populate('id_comic')
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
        let obj = new myDB.commentModel()
        obj.id_user = req.body.id_user
        obj.id_comic = req.body.id_comic
        obj.cmt_content = req.body.cmt_content
        obj.cmt_date = req.body.cmt_date

        let new_cate = await obj.save()
        return res.status(201).json({
            msg: " Successful Add Comment",
            data: new_cate
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
        obj.cmt_content = req.body.cmt_content

        await myDB.commentModel.findByIdAndUpdate(req.params.id, obj)
        return res.status(200).json({
            msg: " Successful Edit Comment",
            data: obj,
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
            msg: " Successful Delete Comment",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",

        })
    }
}