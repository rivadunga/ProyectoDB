var fs = require('fs');
var path = require('path');
var sqlAdm = require("./../sql/SqlAdm.js")


var _result;
var _request;
var _idUser;


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

var onExport = function (res) {
    var json = JSON.stringify(res);
    var csv = json.substring(1,json.length-2);

    csv = replaceAll(csv,"{","");
    csv = replaceAll(csv,":",",");
    csv = replaceAll(csv,"},","\n");


    console.log(csv);
    fs.unlinkSync('public/user-content/reporte.csv');
    fs.appendFile('public/user-content/reporte.csv',csv );
    _result.redirect('/user-content/reporte.csv');
}

var exportCsv = function()
{
    var query =
        "SELECT * from " +
        "   Post P " +
        "       LEFT JOIN User U ON P.id_user = U.id_user " +
        "       LEFT JOIN PostFile PF ON P.id_post = PF.id_post " +
        "       LEFT JOIN File F ON F.id_file = PF.id_file " +
        "       LEFT JOIN Place Pl ON Pl.id_place = P.id_place";
    sqlAdm.getQuery(query, onExport);

}

var handleRequest = function(req, res) {
    _result = res;
    _request = req;

    var sess = _request.session;
    _idUser = sess.userId;
    exportCsv();
};


exports.handleRequest = handleRequest;
