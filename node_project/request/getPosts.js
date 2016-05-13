var neo4j = require("./../neo4j/Neo4JAdm.js");

var _result;
var _request;
var _idUser;

var _dataPost;
var _dataFiles;
var _dataILike;
var _dataIFollow;


var loadPostData = function() {
    var lastIndex = _request.body.lastIndex;

    var query =
        "MATCH (p)-[:ES_DE]->(u:User),(p)-[:ESTA_EN]->(pl:Place) " +
        "WHERE p.id_post > #1 " +
        "OPTIONAL MATCH (u2:User)-[l:LIKE]->(p:Post),(f:File) " +
        "return p.id_post AS id_post, p.date as date,p.content as content, u.id_user as user, u.id_user as id_user, " +
        "COUNT(DISTINCT l) as _likes, " +
        "collect(distinct pl.name) as _place " +
        "ORDER BY p.id_post DESC";


    query = query.replace("#1", lastIndex);
    neo4j.getQuery(query, function(res) {
        _dataPost = res;
        loadPostFiles();
    });
}

var loadPostFiles = function() {
    var lastIndex = _request.body.lastIndex;

    var query =
        "MATCH (p:Post),(f:File) " +
        "WHERE p.id_post > #1 " +
        "return p.id_post AS id_post, p.content, " +
        "CASE WHEN EXISTS((p)-[:TIENE]->(f)) THEN f.name ELSE NULL END AS _nameFile, " +
        "CASE WHEN EXISTS((p)-[:TIENE]->(f)) THEN f.format ELSE NULL END AS _format, " +
        "CASE WHEN EXISTS((p)-[:TIENE]->(f)) THEN f.url ELSE NULL END AS _url " +
        "ORDER BY p.id_post DESC";

    query = query.replace("#1", lastIndex);
    neo4j.getQuery(query, function(res) {
        _dataFiles = res;
        loadPostILike();
    });
}



var loadPostILike = function() {
    var lastIndex = _request.body.lastIndex;

    var query =
        "MATCH (u2:User),(p:Post) " +
        "WHERE u2.id_user = '#1' AND p.id_post > #2 " +
        "RETURN p.id_post, " +
        "CASE WHEN EXISTS((u2:User)-[:LIKE]->(p:Post)) THEN 1 ELSE 0 END as _iLike " +
        "ORDER BY p.id_post DESC";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", lastIndex);
    neo4j.getQuery(query, function(res) {
        _dataILike = res;
        loadPostIFollow();
    });
}


var loadPostIFollow = function() {
    var lastIndex = _request.body.lastIndex;

    var query =
        "MATCH (u:User),(u2:User),(p:Post) " +
        "WHERE u.id_user = '#1' AND (p)-[:ES_DE]->(u2) AND p.id_post > #2 " +
        "RETURN p.id_post, " +
        "CASE WHEN EXISTS((u)-[:FOLLOW]->(u2)) THEN 1 ELSE 0 END as _iFollow " +
        "ORDER BY p.id_post DESC";

    query = query.replace("#1", _idUser);
    query = query.replace("#2", lastIndex);
    neo4j.getQuery(query, function(res) {
        _dataIFollow = res;
        onFinish();
    });
}



var onFinish = function() {

    if (_dataPost && _dataPost.length > 0) {
        console.log(_dataPost);
        console.log(_dataFiles);

        _result.render('item', {
            dataPost: _dataPost,
            dataILike: _dataILike,
            dataIFollow: _dataIFollow,
            dataFiles: _dataFiles,
            idUs: _idUser
        });
    } else {
        _result.send("");
    }
}

var handleRequest = function(req, res) {
    _request = req;
    _result = res;
    var sess = _request.session;
    _idUser = sess.userId;
    if (_idUser) {
        loadPostData();
    } else {
        _result.send("");
    }
};


exports.handleRequest = handleRequest;
