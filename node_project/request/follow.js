var sanitizer = require('sanitizer');
var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;

var _idFollow;
var _idUser;

var follow = function() {
    var query =
        "SELECT COUNT(id_friends) AS _exists FROM Friends WHERE " +
        "   id_user_a = #1 AND id_user_b = #2";
    query = query.replace("#1", _idFollow);
    query = query.replace("#2", _idUser);

    sqlAdm.getQuery(query, onLikeVer);
}

var onLikeVer = function (res){
    if (res[0]._exists == 0)
        addFollow();
    else
        removeFollow();
}

var addFollow = function() {
    var query =
        "INSERT INTO Friends(id_user_a, id_user_b)  VALUE(#1,#2) ";
    query = query.replace("#1", _idFollow);
    query = query.replace("#2", _idUser);
    sqlAdm.getQuery(query, function() {
        _result.send("DONE");
    });
}

var removeFollow = function() {
    var query =
        "DELETE FROM Friends WHERE id_user_a = #1 AND id_user_b = #2 ";
    query = query.replace("#1", _idFollow);
    query = query.replace("#2", _idUser);
    sqlAdm.getQuery(query, function() {
        _result.send("DONE");
    });
}


var handleRequest = function(req, res) {
    _result = res;
    _request = req;
    var sess = _request.session;

    _idFollow = req.body.idUser;
    _idUser = sess.userId;
    if (_idFollow && _idUser){
        follow();
    }else{
        _result.send("");
    }
};

exports.handleRequest = handleRequest;
