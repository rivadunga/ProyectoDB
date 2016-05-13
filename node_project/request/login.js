var neo4j = require("./../neo4j/Neo4JAdm.js");
var sanitizer = require('sanitizer');

var _result;
var _request;

var _user;
var _pass;


var login = function() {

    var query =
        "MATCH (u:User) " +
        "WITH u.id_user as _idUser, u " +
        "WHERE u.id_user = '#1' AND u.password = '#2' " +
        "RETURN _idUser";

    query = query.replace("#1", _user);
    query = query.replace("#2", _pass);
    neo4j.getQuery(query, onLogin);
}

var onLogin = function(res) {
    if (res[0])
        startSession(res[0]._idUser);
    else
        _result.send("LOCK");
}


var startSession = function(idUser) {
    var latitude = _request.body.latitude;
    var longitude = _request.body.longitude;
    sess = _request.session;
    sess.userLatitude = latitude;
    sess.userLongitude = longitude;
    sess.userId = idUser;
    sess.userName = idUser;
    _result.send("LOGIN");
}


var handleRequest = function(req, res) {
    _result = res;
    _request = req;
    _user = sanitizer.sanitize(_request.body.user);
    _pass = sanitizer.sanitize(_request.body.pass);
    if (_user && _pass) {
        login();
    } else {
        _result.send("");
    }
};

exports.handleRequest = handleRequest;
