var neo4j = require("./../neo4j/Neo4JAdm.js");

var _result;
var _request;
var _idUser;

var _following;
var _followers;

var getFollowing = function() {
    var query =
        "MATCH (u:User)-[:FOLLOW]->(u2:User) " +
        "WHERE u.id_user = '#1' " +
        "RETURN u.id_user as name, " +
        "CASE WHEN (u)-[:FOLLOW]->(u2) THEN u2.id_user END AS _following ";

    query = query.replace("#1", _idUser);
    neo4j.getQuery(query, function(res) {
        _following = res;
        getFollowers();
    });
}

var getFollowers = function() {
    var query =
        "MATCH (u2:User)-[:FOLLOW]->(u:User) " +
        "WHERE u.id_user = '#1' " +
        "RETURN u.id_user as name, " +
        "CASE WHEN (u2)-[:FOLLOW]->(u) THEN u2.id_user END AS _follower";

    query = query.replace("#1", _idUser);
    
    neo4j.getQuery(query, function(res) {
        _followers = res;
        onFinish();
    });
}

var onFinish = function() {
    _result.render('friends', {
        following: _following,
        followers: _followers,
        idUs: _idUser
    });

}

var handleRequest = function(req, res) {
    _request = req;
    _result = res;
    var sess = _request.session;
    _idUser = sess.userId;

    if (_idUser) {
        getFollowing();
    } else {
        _result.send("");
    }
};


exports.handleRequest = handleRequest;
