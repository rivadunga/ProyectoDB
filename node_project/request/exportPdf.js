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
        for (var i = 0; i < res.length; i++)
        {
            printCell(100,150+18*(i+1),80, 20,res[i]._date);
            printCell(180,150+18*(i+1),200,20,res[i].content);
            printCell(380,150+18*(i+1),70, 20,res[i]._place);
            printCell(450,150+18*(i+1),70, 20,res[i]._file);
            printCell(520,150+18*(i+1),30, 20,res[i]._likes);
        }
        _doc.end();

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

    _doc.fontSize(10);

    printCell(100,150,80,20,"Fecha");
    printCell(180,150,200,20,"Contenido");
    printCell(380,150,70,20,"Lugar");
    printCell(450,150,70,20,"Archivos");
    printCell(520,150,30,20,"Likes");

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
