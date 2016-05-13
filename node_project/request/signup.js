var neo4j = require("./../neo4j/Neo4JAdm.js");
var sanitizer = require('sanitizer');

var _result;
var _request;

var _user;
var _email;
var _pass;


var signup = function() {
    var query =
        "MATCH (u:User) " +
        "WITH u.id_user as _idUser, u " +
        "WHERE u.id_user = '#1' " +
        "RETURN _idUser";

    query = query.replace("#1", _user);
    neo4j.getQuery(query, ifExists);
}

var ifExists = function(rows) {

    if (rows[0]) {
      _result.send("ALREDYEXISTS");
    } else {
      register();
    }
}


var register = function() {
    var query =
        "CREATE (u:User { id_user : '#1', password : '#2' })";
    query = query.replace("#1", _user);
    query = query.replace("#2", _pass);
    neo4j.getQuery(query, function(res){
        onStartSession();
    });
}

var onStartSession = function() {
    var latitude = _request.body.latitude;
    var longitude = _request.body.longitude;
    sess = _request.session;
    sess.userLatitude = latitude;
    sess.userLongitude = longitude;
    sess.userId = _user;
    sess.userName = _user;
    _result.send("LOGIN");
}


var handleRequest = function(req, rows) {
    _result = rows;
    _request = req;
    _user = sanitizer.sanitize(_request.body.user);
    _email = sanitizer.sanitize(_request.body.email);
    _pass = sanitizer.sanitize(_request.body.pass);
    if (_user && _pass && _email){
        console.log("Test");
        signup();
    }else{
        _result.send("INCOMPLETEFIELDS");
    }
};

exports.handleRequest = handleRequest;
