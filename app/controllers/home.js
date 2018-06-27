module.exports.index = function(app, req, res) {

    var Connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(Connection);

    noticiasModel.get5UltimasNoticias(function(error, result) {
        // console.log(result.rows[0][0]);
        res.render("home/index", { noticias: result.rows });
    });


}