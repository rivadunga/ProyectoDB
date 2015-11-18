var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;
var _idUser;


var getNotification = function() {

    var query =
        "SELECT P.id_post, P.content, F.name as _file, " +
        "(SELECT COUNT(L.id_like) FROM Likes L WHERE L.id_post = P.id_post) AS _likes " +
        "   FROM Post P " +
        "       JOIN User U  ON P.id_user  = U.id_user " +
        "       LEFT JOIN PostFile PF ON P.id_post = PF.id_post " +
        "       LEFT JOIN File F ON F.id_file = PF.id_file "
        "   WHERE U.user_id = #1";

    query = query.replace("#1", _idUser);
    sqlAdm.getQuery(query, onFinish);
}

var onFinish = function(res) {
    if (res)
        _result.render('notifications', {
            res: res,
            idUs: _idUser
        });
    else
        _result.send("");
}

var handleRequest = function(req, res) {
    _request = req;
    _result = res;

    var sess = _request.session;
    _idUser = sess.userId;

    if (_idUser){
        getNotification();
    }else{
        _result.send("");
    }
};


exports.handleRequest = handleRequest;
