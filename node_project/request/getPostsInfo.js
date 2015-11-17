var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;
var _idUser;


var loadPosts = function() {

    var query =
        "SELECT P.id_post, " +
        "(SELECT COUNT(L.id_like) FROM Likes L WHERE L.id_post = P.id_post) AS _likes, " +
        "(SELECT COUNT(L.id_like) FROM Likes L WHERE L.id_post = P.id_post AND L.id_user = #1) AS _iLike, " +
        "(SELECT COUNT(Fr.id_friends) FROM Friends Fr WHERE Fr.id_user_a = U.id_user AND Fr.id_user_b = #2) AS _iFollow " +
        "   FROM Post P " +
        "       JOIN User U           ON P.id_user  = U.id_user ";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", _idUser);
    sqlAdm.getQuery(query, onFinish);
}

var onFinish = function(res) {
    if (res)
        _result.send(res);
    else
        _result.send("");
}

var handleRequest = function(req, res) {
    _request = req;
    _result = res;

    var sess = _request.session;
    _idUser = sess.userId;

    loadPosts();
};


exports.handleRequest = handleRequest;
