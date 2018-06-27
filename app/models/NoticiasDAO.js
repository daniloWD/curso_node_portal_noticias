function NoticiasDAO(connection) {
    this._connection = connection;

}

NoticiasDAO.prototype.getNoticias = function(callback) {
    this._connection.then(function(conn) {
        conn.execute(
                `SELECT * FROM noticias ORDER BY data_criacao DESC`, [], { outFormat: conn.OBJEC }, callback)
            // return res.render("noticias/noticias", { noticias: result.rows })

    });
};

NoticiasDAO.prototype.getNoticia = function(id_noticia, callback) {
    // console.log(id_noticia);
    this._connection.then(function(conn) {
        conn.execute(
                `SELECT * FROM noticias WHERE id_noticia = :id`, [id_noticia.id_noticia], { outFormat: conn.OBJEC }, callback)
            // return res.render("noticias/noticias", { noticias: result.rows })


    });


};

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback) {
    this._connection.then(function(conn) {
        noticia.data_noticia = noticia.data_noticia.replace("T", " ");
        console.log(noticia.data_noticia);

        conn.execute(
                `INSERT INTO noticias(titulo, noticia,resumo,autor,data_noticia) VALUES (:titulo, :noticia,:resumo,:autor,TO_DATE(:data_noticia, 'yyyy/mm/dd hh24:mi'))`, [noticia.titulo, noticia.noticia, noticia.resumo, noticia.autor, noticia.data_noticia], { autoCommit: true }, callback)
            // return res.render("noticias/noticias", { noticias: result.rows })

    });
}

NoticiasDAO.prototype.get5UltimasNoticias = function(callback) {
    this._connection.then(function(conn) {
        conn.execute(
            `SELECT * FROM (SELECT * FROM noticias ORDER BY data_criacao DESC) WHERE rownum < 6`, [], { outFormat: conn.OBJEC }, callback)

        // return res.render("noticias/noticias", { noticias: result.rows })

    });
};

module.exports = function() {
    return NoticiasDAO;
};