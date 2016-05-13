var sanitizer = require('sanitizer');
var neo4j = require("./../neo4j/Neo4JAdm.js");

var _result;
var _request;

var _idPost;
var _idUser;

var like = function() {

    var query =
        "MATCH (u2:User),(p:Post)" +
        "WHERE u2.id_user = '#1' AND p.id_post = #2 " +
        "RETURN p.id_post, " +
        "CASE WHEN EXISTS((u2:User)-[:LIKE]->(p:Post)) THEN 1 ELSE 0 END as _iLike " +
        "ORDER BY p.id_post";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", _idPost);

    neo4j.getQuery(query, onLikeVer);
}

var onLikeVer = function (res){
    if (res[0]._iLike == 0)
        addlike();
    else
        removeLike();
}

var addlike = function() {
    var query =
        "MATCH (u:User),(p:Post) " +
        "WHERE u.id_user = '#1' AND p.id_post = #2 " +
        "CREATE (u)-[r:LIKE]->(p)";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", _idPost);

    neo4j.getQuery(query, function() {
        _result.send("DONE");
    });
}

var removeLike = function() {
    var query =
        "MATCH (u:User)-[r:LIKE]->(p:Post) " +
        "WHERE u.id_user = '#1' AND p.id_post = #2 " +
        "Delete r";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", _idPost);

    neo4j.getQuery(query, function() {
        _result.send("DONE");
    });
}


var handleRequest = function(req, res) {
    _result = res;
    _request = req;

    var sess = _request.session;

    _idPost = req.body.idPost;
    _idUser = sess.userId;

    if (_idUser && _idPost){
        like();
    }else{
        _result.send("");
    }
};

exports.handleRequest = handleRequest;
