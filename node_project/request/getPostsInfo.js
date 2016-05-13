var neo4j = require("./../neo4j/Neo4JAdm.js");

var _result;
var _request;
var _idUser;

var _dataLike;
var _dataILike;
var _dataIFollow;


var loadPostLike = function() {

    var query =
        "MATCH (p)-[:ES_DE]->(u:User),(p)-[:ESTA_EN]->(pl:Place) " +
        "OPTIONAL MATCH (u2:User)-[l:LIKE]->(p:Post),(f:File) " +
        "return p.id_post as id_post, " +
        "COUNT(DISTINCT l) as _likes " +
        "ORDER BY p.id_post DESC";

    neo4j.getQuery(query, function(res) {
        _dataLike = res;
        loadPostILike();
    });
}



var loadPostILike = function() {
    var lastIndex = _request.body.lastIndex;

    var query =
        "MATCH (u2:User),(p:Post) " +
        "WHERE u2.id_user = '#1' " +
        "RETURN p.id_post, " +
        "CASE WHEN EXISTS((u2:User)-[:LIKE]->(p:Post)) THEN 1 ELSE 0 END as _iLike ";

    query = query.replace("#1", _idUser);
    neo4j.getQuery(query, function(res) {
        _dataILike = res;
        loadPostIFollow();
    });
}


var loadPostIFollow = function() {
    var lastIndex = _request.body.lastIndex;

    var query =
        "MATCH (u:User),(u2:User),(p:Post) " +
        "WHERE u.id_user = '#1' AND (p)-[:ES_DE]->(u2) " +
        "RETURN p.id_post , " +
        "CASE WHEN EXISTS((u)-[:FOLLOW]->(u2)) THEN 1 ELSE 0 END as _iFollow ";

    query = query.replace("#1", _idUser);

    neo4j.getQuery(query, function(res) {
        _dataIFollow = res;
        onFinish();
    });
}


var onFinish = function(res) {
    var json = "";
    if (_dataLike && _dataLike.length > 0) {
        json += "[";
        for (var i = 0; i < _dataLike.length; i++) {
            json += "{\"id_post\":#1,\"_likes\":#2,\"_iFollow\":#3}";
            json = json.replace("#1", _dataLike[i].id_post);
            json = json.replace("#2", _dataLike[i]._likes);
            json = json.replace("#3", _dataIFollow[i]._iFollow);
            if (i < _dataLike.length - 1) json += ",";
        }
        json += "]";
    }
    var obj = JSON.parse(json);
    console.log(obj);
    _result.send(obj);
}

var handleRequest = function(req, res) {
    _request = req;
    _result = res;

    var sess = _request.session;
    _idUser = sess.userId;

    if (_idUser) {
        loadPostLike();
    } else {
        _result.send("");
    }
};


exports.handleRequest = handleRequest;
