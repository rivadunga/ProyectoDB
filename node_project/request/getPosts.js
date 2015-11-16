var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;


var loadPosts = function() {
    var lastIndex = _request.body.lastIndex;

    var query =
        "SELECT P.id_post, P.date, P.content, U.name AS _user, U.id_user, Pl.name AS _place, F.name AS _file, " +
        "(SELECT COUNT(L.id_like) FROM Likes L WHERE L.id_post = P.id_post) AS _likes " +
        "   FROM Post P " +
        "       JOIN User U           ON P.id_user  = U.id_user " +
        "       JOIN Place Pl         ON P.id_place = Pl.id_place " +
        "       LEFT JOIN PostFile PF ON P.id_post  = PF.id_post " +
        "       LEFT JOIN File F      ON PF.id_file = F.id_file " +
        "   WHERE " +
        "   P.id_post > #1";

    query = query.replace("#1", lastIndex);
    sqlAdm.getQuery(query, onFinish);
}

var onFinish = function(res) {
    if (res)
        _result.render('item', {
            res: res
        });
    else
        _result.send("");
}

var handleRequest = function(req, res) {
    _request = req;
    _result = res;
    loadPosts();
};


exports.handleRequest = handleRequest;
