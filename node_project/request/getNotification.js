var neo4j = require("./../neo4j/Neo4JAdm.js");

var _result;
var _request;
var _idUser;


var getNotification = function() {

    var query =
        "MATCH (p)-[:ES_DE]->(u:User),(p)-[:ESTA_EN]->(pl:Place) " +
        "WHERE u.id_user = '#1' " +
        "OPTIONAL MATCH (u2:User)-[l:LIKE]->(p:Post),(f:File) " +
        "return p.id_post as id_post, p.date as date,p.content as content, u.id_user as user, u.id_user as id_user, " +
        "COUNT(DISTINCT l) as _likes, " +
        "collect(distinct pl.name) as _place " +
        "ORDER BY p.id_post DESC";


    query = query.replace("#1", _idUser);
    neo4j.getQuery(query, onFinish);
}

var onFinish = function(res) {
    if (res)
        _result.render('notifications', {
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

    if (_idUser){
        getNotification();
    }else{
        _result.send("");
    }
};


exports.handleRequest = handleRequest;
