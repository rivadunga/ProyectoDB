var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;
var _idUser;


var loadPosts = function() {
    var lastIndex = _request.body.lastIndex;

    var query =
        "SELECT P.id_post, P.date, P.content, U.name AS _user, U.id_user, Pl.name AS _place, F.name AS _file, " +
        "(SELECT COUNT(L.id_like) FROM Likes L WHERE L.id_post = P.id_post) AS _likes, " +
        "(SELECT COUNT(L.id_like) FROM Likes L WHERE L.id_post = P.id_post AND L.id_user = #1) AS _iLike, " +
        "(SELECT COUNT(Fr.id_friends) FROM Friends Fr WHERE Fr.id_user_a = U.id_user AND Fr.id_user_b = #2) AS _iFollow " +
        "   FROM Post P " +
        "       JOIN User U           ON P.id_user  = U.id_user " +
        "       JOIN Place Pl         ON P.id_place = Pl.id_place " +
        "       LEFT JOIN PostFile PF ON P.id_post  = PF.id_post " +
        "       LEFT JOIN File F      ON PF.id_file = F.id_file " +
        "   WHERE " +
        "   P.id_post > #3 " +
        "   ORDER BY P.id_post DESC";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", _idUser);
    query = query.replace("#3", lastIndex);
    sqlAdm.getQuery(query, onFinish);
}

var onFinish = function(res) {
    if (res)
        _result.render('item', {
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
        loadPosts();
    }else{
        _result.send("");
    }
};


exports.handleRequest = handleRequest;
