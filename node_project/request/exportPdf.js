var pdf = require('pdfkit');
var fs = require('fs');
var path = require('path');
var sqlAdm = require("./../sql/SqlAdm.js")


var _result;
var _request;
var _idUser;
var _doc;

var printCell = function(x,y,w,h,text)
{
    _doc.y = y;
    _doc.x = x;
    _doc.text(text,{width: w, height: h, ellipsis: "...", align: 'justify'});
}

var printPlacesInfo = function()
{
    _doc.addPage();
    _doc.end();
}


var printUserInfo = function()
{
    var query =
        "SELECT U.name, " +
        "  (SELECT COUNT(Fr_in.id_user_b) FROM Friends Fr_in WHERE Fr_in.id_user_a = U.id_user) AS _follower, " +
        "   (SELECT COUNT(Fr_in.id_user_b) FROM Friends Fr_in WHERE Fr_in.id_user_b = U.id_user) AS _followed, " +
        "   (SELECT COUNT(P_in.id_post) FROM Post P_in WHERE P_in.id_user = U.id_user) AS _numPost, " +
        "   (SELECT DATE_FORMAT(MAX(P_in.date),'%m-%d-%Y') FROM Post P_in WHERE P_in.id_user = U.id_user) AS _lastPost " +
        "FROM User U ";

    _doc.addPage();
    _doc.fontSize(20);
    _doc.text('Usuarios: ', 100, 100)
    _doc.fontSize(12);
    printCell(100,140,120,20,"Nombre");
    printCell(220,140,80,20, "Seguidores");
    printCell(300,140,80,20, "Siguiendo");
    printCell(380,140,80,20, "Numero de posts");
    printCell(460,140,120,20,"Último post");

    sqlAdm.getQuery(query, function(res){
        _doc.fontSize(10);
        for (var i = 0; i < res.length; i++)
        {
            if ((i+1) % 25 == 0) _doc.addPage();
            printCell(100,150+18*((i+1)%25),80, 20,res[i].name);
            printCell(240,150+18*((i+1)%25),200,20,res[i]._follower);
            printCell(320,150+18*((i+1)%25),70, 20,res[i]._followed);
            printCell(400,150+18*((i+1)%25),70, 20,res[i]._numPost);
            printCell(460,150+18*((i+1)%25),80, 20,res[i]._lastPost);
        }
        printPlacesInfo();

    });

}


var printPostInfo = function()
{
    var query =
        "SELECT DATE_FORMAT(P.date,'%m-%d-%Y') as _date, P.content, U.name AS _user, Pl.name AS _place, F.name AS _file, " +
        "(SELECT COUNT(L.id_like) FROM Likes L WHERE L.id_post = P.id_post) AS _likes " +
        "   FROM Post P " +
        "       JOIN User U           ON P.id_user  = U.id_user " +
        "       JOIN Place Pl         ON P.id_place = Pl.id_place " +
        "       LEFT JOIN PostFile PF ON P.id_post  = PF.id_post " +
        "       LEFT JOIN File F      ON PF.id_file = F.id_file " +
        "   ORDER BY P.date";

    sqlAdm.getQuery(query, function(res){
        _doc.fontSize(10);
        for (var i = 0; i < res.length; i++)
        {
            if ((i+1) % 25 == 0) _doc.addPage();
            printCell(100,150+18*((i+1)%25),80, 20,res[i]._date);
            printCell(180,150+18*((i+1)%25),200,20,res[i].content);
            printCell(380,150+18*((i+1)%25),70, 20,res[i]._place);
            printCell(450,150+18*((i+1)%25),70, 20,res[i]._file);
            printCell(520,150+18*((i+1)%25),30, 20,res[i]._likes);
        }
        printUserInfo();

    });

}


var exportPdf = function()
{
    _doc = new pdf();
    _doc.pipe(fs.createWriteStream('public/user-content/reporte.pdf'));
    _doc.pipe(_result);

    _doc.fontSize(20);
    _doc.text('Reporte tabular', 100, 300);
    _doc.fontSize(12);
    _doc.text('mySpot', 100, 325);


    _doc.addPage();

    _doc.fontSize(20);
    _doc.text('Posts: ', 100, 100)

    _doc.fontSize(12);
    printCell(100,140,80,20,"Fecha");
    printCell(180,140,200,20,"Contenido");
    printCell(380,140,70,20,"Lugar");
    printCell(450,140,70,20,"Archivos");
    printCell(520,140,30,20,"Likes");

    printPostInfo();

}


var handleRequest = function(req, res) {
    _result = res;
    _request = req;

    var sess = _request.session;
    _idUser = sess.userId;
    exportPdf();
};


exports.handleRequest = handleRequest;
