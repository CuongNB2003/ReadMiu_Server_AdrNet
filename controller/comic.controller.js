exports.listComic = (req, res, next) => {
    let title = "Danh sách truyện"
    res.render('comic/listComic', {title: title});
}