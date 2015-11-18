var sqlAdm = require("./../sql/SqlAdm.js")

var _result;
var _request;
var _idUser;


var getFriends = function() {
    var query =
        "SELECT U.id_user, U.name, Fr.id_user_a, Fr.id_user_b, " +
        "      (SELECT U_in.name FROM User U_in WHERE U_in.id_user = Fr.id_user_a) as _nameA, " +
        "      (SELECT U_in.name FROM User U_in WHERE U_in.id_user = Fr.id_user_b) as _nameB, " +
        "      (SELECT COUNT(Fr_in.id_user_b) FROM Friends Fr_in WHERE Fr_in.id_user_a = Fr.id_user_a) AS _followersA," +
        "      (SELECT COUNT(Fr_in.id_user_b) FROM Friends Fr_in WHERE Fr_in.id_user_a = Fr.id_user_b) AS _followersB " +
        "   FROM User U" +
        "	  LEFT JOIN Friends Fr ON (U.id_user = Fr.id_user_a OR U.id_user = Fr.id_user_b) " +
        "   WHERE U.id_user = #1 " +
        "   ORDER BY Fr.id_user_a ";

    query = query.replace("#1", _idUser);
    sqlAdm.getQuery(query, onFinish);
}

var onFinish = function(res) {
    if (res)
        _result.render('friends', {
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

    if (_idUser) {
        getFriends();
    } else {
        _result.send("");
    }
};


exports.handleRequest = handleRequest;
