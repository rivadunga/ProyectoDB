var sanitizer = require('sanitizer');
var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;

var _idPost;
var _idUser;

var like = function() {
    var query =
        "SELECT COUNT(id_like) AS _exists FROM Likes WHERE " +
        "   id_post = #1 AND id_user = #2";
    query = query.replace("#1", _idPost);
    query = query.replace("#2", _idUser);

    sqlAdm.getQuery(query, onLikeVer);
}

var onLikeVer = function (res){
    if (res[0]._exists == 0)
        addlike();
    else
        removeLike();
}

var addlike = function() {
    var query =
        "INSERT INTO Likes(id_post, id_user)  VALUE(#1,#2) ";
    query = query.replace("#1", _idPost);
    query = query.replace("#2", _idUser);
    sqlAdm.getQuery(query, function() {
        _result.send("DONE");
    });
}

var removeLike = function() {
    var query =
        "DELETE FROM Likes WHERE id_post = #1 AND id_user = #2 ";
    query = query.replace("#1", _idPost);
    query = query.replace("#2", _idUser);
    sqlAdm.getQuery(query, function() {
        _result.send("DONE");
    });
}


var handleRequest = function(req, res) {
    _result = res;
    _request = req;

    var sess = _request.session;

    _idPost = req.body.idPost;
    _idUser = sess.userId;

    if (_idUser && _idPost){
        like();
    }else{
        _result.send("");
    }
};

exports.handleRequest = handleRequest;
