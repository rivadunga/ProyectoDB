var sqlAdm = require("./../sql/SqlAdm.js")
var sanitizer = require('sanitizer');

var _result;
var _request;

var _user;
var _pass;


var login = function() {
    var query =
        "SELECT " +
        "   (SELECT COUNT(id_user) FROM User WHERE name = '#1') AS _exists, " +
        "   (SELECT COUNT(id_user) AS _login FROM USER WHERE name = '#2' " +
        "       AND password = '#3') AS _login";

    query = query.replace("#1", _user);
    query = query.replace("#2", _user);
    query = query.replace("#3", _pass);
    sqlAdm.getQuery(query, onLogin);
}

var onLogin = function(res) {

    var exist = res[0]._exists > 0 ? true : false;
    var login = res[0]._login > 0 ? true : false;

    if (exist) {
        if (login) {
            startSession();
        } else {
            _result.send("LOCK");
        }
    } else {
        register();
    }
}


var register = function() {
    var query =
        "INSERT INTO User(name,mail,password) VALUES ('#1','','#2')";
    query = query.replace("#1", _user);
    query = query.replace("#2", _pass);
    sqlAdm.getQuery(query, startSession);
}


var startSession = function() {
    var query =
        "SELECT id_user, name FROM User WHERE name = '#1'";
    query = query.replace("#1", _user);
    sqlAdm.getQuery(query, onStartSession);
}

var onStartSession = function(res) {
    var latitude = _request.body.latitude;
    var longitude = _request.body.longitude;
    sess = _request.session;
    sess.userLatitude = latitude;
    sess.userLongitude = longitude;
    sess.userId = res[0].id_user;
    sess.userName = res[0].name;
    _result.send("LOGIN");
}


var handleRequest = function(req, res) {
    _result = res;
    _request = req;
    _user = sanitizer.sanitize(_request.body.user);
    _pass = sanitizer.sanitize(_request.body.pass);
    if (_user && _pass){
        login();
    }else{
        _result.send("");
    }
};

exports.handleRequest = handleRequest;
