var neo4j = require("./../neo4j/Neo4JAdm.js");

var _result;
var _request;
var _idUser;

var _userStats;
var _trendingTopics;

var loadUserStats = function() {

    var query =
        "MATCH (p:Post),()-[l:LIKE]->(p),(u:User),()-[f:FOLLOW]->() " +
        "WHERE u.id_user = '#1' AND (p)-[:ES_DE]->(u:User) " +
        "RETURN " +
        "COUNT(distinct l) AS _xLikes, " +
        "COUNT(distinct (p)-[:ES_DE]->(u)) AS _xPosts, " +
        "COUNT(distinct (u)-[f]->()) AS _xFollowing, " +
        "COUNT(distinct ()-[f]->(u)) AS _xFollowers ";

    query = query.replace("#1", _idUser);

    neo4j.getQuery(query, function(res) {
        _userStats = res;
        loadTrendingTopics();
    });
}



var loadTrendingTopics = function() {

    var query =
        "MATCH (p:Post) " +
        "WHERE p.content CONTAINS '#' " +
        "RETURN p.content AS content";
    neo4j.getQuery(query, function(res) {

        _trendingTopics = [];
        var TrendingTopics = []

        for (var j = 0; j < res.length; j++) {
            var content = res[j].content;
            var words = content.split(" ");

            for (var i = 0; i < words.length; i++) {
                if (_trendingTopics.indexOf(words[i]) == -1)
                _trendingTopics.push(words[i]);
            }
        }

        onFinish();
    });
}


var onFinish = function() {
    _result.render('index', {
        userName: _idUser,
        stats: _userStats,
        threndingTopics: _trendingTopics
    });

}

var handleRequest = function(req, res) {
    _request = req;
    _result = res;

    var sess = _request.session;
    _idUser = sess.userId;

    loadUserStats();
};


exports.handleRequest = handleRequest;
