var sanitizer = require('sanitizer');
var neo4j = require("./../neo4j/Neo4JAdm.js");

var _result;
var _request;

var _idFollow;
var _idUser;

var follow = function() {
    var query =
        "MATCH (u:User),(u2:User),(p:Post) " +
        "WHERE u.id_user = '#1' AND (p)-[:ES_DE]->(u2) AND u2.id_user = '#2' " +
        "RETURN u.id_user, " +
        "CASE WHEN EXISTS((u)-[:FOLLOW]->(u2)) THEN 1 ELSE 0 END as _iFollow ";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", _idFollow);

    neo4j.getQuery(query, onLikeVer);
}

var onLikeVer = function (res){
    console.log(res);

    if (res[0]._iFollow == 0)
        addFollow();
    else
        removeFollow();
}

var addFollow = function() {
    var query =
        "MATCH (u1:User),(u2:User) " +
        "WHERE u1.id_user = '#1' AND u2.id_user = '#2' " +
        "CREATE (u1)-[r:FOLLOW]->(u2)";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", _idFollow);

    neo4j.getQuery(query, function() {
        _result.send("DONE");
    });
}

var removeFollow = function() {
    var query =
        "MATCH (u1:User)-[r:FOLLOW]->(u2:User) " +
        "WHERE u1.id_user = '#1' AND u2.id_user = '#2' " +
        "Delete r";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", _idFollow);

    neo4j.getQuery(query, function() {
        _result.send("DONE");
    });
}


var handleRequest = function(req, res) {
    _result = res;
    _request = req;
    var sess = _request.session;

    _idFollow = req.body.idUser;
    _idUser = sess.userId;

    if (_idFollow && _idUser){
        follow();
    }else{
        _result.send("");
    }
};

exports.handleRequest = handleRequest;
